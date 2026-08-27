mod ffi;

use cirru_edn::Edn;
use ffi::*;
use std::collections::{HashMap, HashSet};
use std::io::ErrorKind;
use std::net::{TcpListener, TcpStream};
use std::panic::{AssertUnwindSafe, catch_unwind};
use std::sync::atomic::{AtomicBool, AtomicU64, Ordering};
use std::sync::mpsc::{Sender, TryRecvError, channel};
use std::sync::{Arc, LazyLock, Mutex, RwLock};
use std::thread::{Builder, JoinHandle};
use std::time::Duration;
use tungstenite::{Error as WebSocketError, Message as SafeMessage, accept};

static CLIENTS: LazyLock<RwLock<HashMap<u64, Sender<SafeMessage>>>> = LazyLock::new(|| RwLock::new(HashMap::new()));
static NEXT_CLIENT_ID: AtomicU64 = AtomicU64::new(1);
static NEXT_SERVER_CONTEXT: AtomicU64 = AtomicU64::new(1);

struct ServerControl {
  cancelled: AtomicBool,
}

static SERVER_CONTROLS: LazyLock<Mutex<HashMap<u64, Arc<ServerControl>>>> = LazyLock::new(|| Mutex::new(HashMap::new()));

enum SafeEvent {
  Connect(u64, Sender<SafeMessage>),
  Disconnect(u64),
  Message(u64, SafeMessage),
}

fn parse_server_port(args: &[Edn]) -> Result<u16, String> {
  if args.len() > 1 {
    return Err(format!("WebSocket server expects at most 1 argument, got {}", args.len()));
  }
  match args.first() {
    Some(Edn::Map(options)) => match options.tag_get("port") {
      Some(Edn::Number(port)) if port.is_finite() && port.fract() == 0.0 && (1.0..=u16::MAX as f64).contains(port) => Ok(*port as u16),
      Some(value) => Err(format!("invalid WebSocket port: {value}")),
      None => Ok(9001),
    },
    Some(Edn::Nil) | None => Ok(9001),
    Some(value) => Err(format!("invalid WebSocket server options: {value}")),
  }
}

fn allocate_client_id() -> Result<u64, String> {
  const MAX_EXACT_CALCIT_INTEGER: u64 = (1_u64 << 53) - 1;
  let client_id = NEXT_CLIENT_ID.fetch_add(1, Ordering::Relaxed);
  if client_id == 0 || client_id > MAX_EXACT_CALCIT_INTEGER {
    return Err("WebSocket client ID space is exhausted".to_owned());
  }
  Ok(client_id)
}

fn register_server_control() -> Result<(u64, Arc<ServerControl>), String> {
  let control = Arc::new(ServerControl {
    cancelled: AtomicBool::new(false),
  });
  let mut controls = SERVER_CONTROLS
    .lock()
    .map_err(|_| "WebSocket server control registry is poisoned".to_owned())?;
  loop {
    let context = NEXT_SERVER_CONTEXT.fetch_add(1, Ordering::Relaxed);
    if context != 0 && !controls.contains_key(&context) {
      controls.insert(context, Arc::clone(&control));
      return Ok((context, control));
    }
  }
}

fn remove_server_control(context: u64) {
  if let Ok(mut controls) = SERVER_CONTROLS.lock() {
    controls.remove(&context);
  }
}

unsafe extern "C" fn cancel_wss_server(task_context: u64, _task_handle: u64, reason_ptr: *const u8, reason_len: usize) -> i32 {
  catch_unwind(AssertUnwindSafe(|| {
    if reason_ptr.is_null() && reason_len != 0 {
      return ASYNC_STATUS_INVALID_PAYLOAD;
    }
    let control = match SERVER_CONTROLS.lock() {
      Ok(controls) => controls.get(&task_context).cloned(),
      Err(_) => return ASYNC_STATUS_INTERNAL_ERROR,
    };
    let Some(control) = control else {
      return ASYNC_STATUS_HANDLE_FINISHED;
    };
    control.cancelled.store(true, Ordering::Release);
    ASYNC_STATUS_OK
  }))
  .unwrap_or(ASYNC_STATUS_INTERNAL_ERROR)
}

fn websocket_error_is_retryable(error: &WebSocketError) -> bool {
  matches!(error, WebSocketError::Io(io_error) if matches!(io_error.kind(), ErrorKind::WouldBlock | ErrorKind::TimedOut | ErrorKind::Interrupted))
}

fn run_safe_client(stream: TcpStream, client_id: u64, events: Sender<SafeEvent>, control: Arc<ServerControl>) -> Result<(), String> {
  stream
    .set_read_timeout(Some(Duration::from_secs(5)))
    .map_err(|error| format!("failed to set WebSocket handshake timeout: {error}"))?;
  let mut socket = accept(stream).map_err(|error| format!("WebSocket handshake failed: {error}"))?;
  if control.cancelled.load(Ordering::Acquire) {
    let _ = socket.close(None);
    return Ok(());
  }
  socket
    .get_mut()
    .set_read_timeout(Some(Duration::from_millis(50)))
    .map_err(|error| format!("failed to set WebSocket read timeout: {error}"))?;
  let (outgoing, commands) = channel();
  events
    .send(SafeEvent::Connect(client_id, outgoing))
    .map_err(|_| "WebSocket server stopped during client connect".to_owned())?;

  let result = (|| -> Result<(), String> {
    loop {
      loop {
        match commands.try_recv() {
          Ok(SafeMessage::Close(frame)) => {
            let _ = socket.close(frame);
            return Ok(());
          }
          Ok(message) => socket
            .write_message(message)
            .map_err(|error| format!("failed to write WebSocket message: {error}"))?,
          Err(TryRecvError::Empty) => break,
          Err(TryRecvError::Disconnected) => {
            let _ = socket.close(None);
            return Ok(());
          }
        }
      }
      match socket.read_message() {
        Ok(SafeMessage::Text(text)) => events
          .send(SafeEvent::Message(client_id, SafeMessage::Text(text)))
          .map_err(|_| "WebSocket server stopped while publishing text".to_owned())?,
        Ok(SafeMessage::Binary(bytes)) => events
          .send(SafeEvent::Message(client_id, SafeMessage::Binary(bytes)))
          .map_err(|_| "WebSocket server stopped while publishing binary data".to_owned())?,
        Ok(SafeMessage::Close(_)) => return Ok(()),
        Ok(SafeMessage::Ping(_) | SafeMessage::Pong(_) | SafeMessage::Frame(_)) => {}
        Err(WebSocketError::ConnectionClosed | WebSocketError::AlreadyClosed) => return Ok(()),
        Err(error) if websocket_error_is_retryable(&error) => {}
        Err(error) => return Err(format!("WebSocket read failed: {error}")),
      }
    }
  })();

  let _ = events.send(SafeEvent::Disconnect(client_id));
  result
}

fn publish_server_event(
  host: CalcitFfiAsyncHostV1,
  task: CalcitFfiAsyncTaskV1,
  control: &ServerControl,
  event: Edn,
) -> Result<(), String> {
  let payload = encode_callback_args(vec![event])?;
  let status = enqueue_with_backpressure(host, task, ASYNC_EVENT_EMIT, &payload);
  if status == ASYNC_STATUS_OK
    || (control.cancelled.load(Ordering::Acquire) && matches!(status, ASYNC_STATUS_HANDLE_CLOSING | ASYNC_STATUS_HANDLE_FINISHED))
  {
    Ok(())
  } else {
    Err(format!("Calcit host rejected WebSocket event with status {status}"))
  }
}

fn handle_safe_event(
  event: SafeEvent,
  host: CalcitFfiAsyncHostV1,
  task: CalcitFfiAsyncTaskV1,
  control: &ServerControl,
  owned_clients: &mut HashSet<u64>,
) -> Result<(), String> {
  match event {
    SafeEvent::Connect(client_id, responder) => {
      CLIENTS
        .write()
        .map_err(|_| "wss clients lock poisoned".to_owned())?
        .insert(client_id, responder);
      owned_clients.insert(client_id);
      publish_server_event(host, task, control, Edn::enum_value("connect", vec![Edn::Number(client_id as f64)]))
    }
    SafeEvent::Disconnect(client_id) => {
      CLIENTS
        .write()
        .map_err(|_| "wss clients lock poisoned".to_owned())?
        .remove(&client_id);
      owned_clients.remove(&client_id);
      publish_server_event(
        host,
        task,
        control,
        Edn::enum_value("disconnect", vec![Edn::Number(client_id as f64)]),
      )
    }
    SafeEvent::Message(client_id, SafeMessage::Text(text)) => publish_server_event(
      host,
      task,
      control,
      Edn::enum_value("message", vec![Edn::Number(client_id as f64), Edn::str(text)]),
    ),
    SafeEvent::Message(client_id, SafeMessage::Binary(bytes)) => publish_server_event(
      host,
      task,
      control,
      Edn::enum_value("blob", vec![Edn::Number(client_id as f64), Edn::Buffer(bytes)]),
    ),
    SafeEvent::Message(_, SafeMessage::Close(_) | SafeMessage::Ping(_) | SafeMessage::Pong(_) | SafeMessage::Frame(_)) => Ok(()),
  }
}

fn cleanup_safe_clients(owned_clients: &HashSet<u64>) {
  if let Ok(mut clients) = CLIENTS.write() {
    for client_id in owned_clients {
      if let Some(sender) = clients.remove(client_id) {
        let _ = sender.send(SafeMessage::Close(None));
      }
    }
  }
}

fn run_safe_server(
  port: u16,
  host: CalcitFfiAsyncHostV1,
  task: CalcitFfiAsyncTaskV1,
  control: Arc<ServerControl>,
) -> Result<(), String> {
  let listener = TcpListener::bind(("0.0.0.0", port)).map_err(|error| format!("failed to listen on WebSocket port {port}: {error}"))?;
  listener
    .set_nonblocking(true)
    .map_err(|error| format!("failed to configure WebSocket listener: {error}"))?;
  let (event_tx, event_rx) = channel();
  let mut client_threads: Vec<JoinHandle<()>> = vec![];
  let mut owned_clients = HashSet::new();
  println!("WebSocket server started at port {port}");

  let server_result = (|| -> Result<(), String> {
    while !control.cancelled.load(Ordering::Acquire) {
      loop {
        match listener.accept() {
          Ok((stream, _)) => {
            let client_id = allocate_client_id()?;
            let events = event_tx.clone();
            let client_control = Arc::clone(&control);
            let thread = Builder::new()
              .name(format!("calcit-wss-client-{client_id}"))
              .spawn(move || {
                if let Err(error) = run_safe_client(stream, client_id, events, client_control) {
                  eprintln!("WebSocket client {client_id} failed: {error}");
                }
              })
              .map_err(|error| format!("failed to start WebSocket client worker: {error}"))?;
            client_threads.push(thread);
          }
          Err(error) if error.kind() == ErrorKind::WouldBlock => break,
          Err(error) => return Err(format!("WebSocket accept failed: {error}")),
        }
      }

      match event_rx.recv_timeout(Duration::from_millis(10)) {
        Ok(event) if !control.cancelled.load(Ordering::Acquire) => {
          handle_safe_event(event, host, task, control.as_ref(), &mut owned_clients)?
        }
        Ok(_) => {}
        Err(std::sync::mpsc::RecvTimeoutError::Timeout) => {}
        Err(std::sync::mpsc::RecvTimeoutError::Disconnected) => {
          return Err("WebSocket event channel disconnected".to_owned());
        }
      }
    }
    Ok(())
  })();

  cleanup_safe_clients(&owned_clients);
  drop(event_tx);
  for thread in client_threads {
    if thread.join().is_err() && server_result.is_ok() {
      return Err("WebSocket client worker panicked".to_owned());
    }
  }
  server_result
}

unsafe fn start_wss_server_async_v1(
  request_ptr: *const u8,
  request_len: usize,
  task: *const CalcitFfiAsyncTaskV1,
  host: *const CalcitFfiAsyncHostV1,
) -> i32 {
  let task = match unsafe { copy_task_descriptor(task) } {
    Ok(task) => task,
    Err(status) => return status,
  };
  let host = match unsafe { copy_host_descriptor(host) } {
    Ok(host) => host,
    Err(status) => return status,
  };
  let (Some(_enqueue), Some(configure)) = (host.enqueue, host.configure_task) else {
    return ASYNC_STATUS_INVALID_PAYLOAD;
  };
  let args = match unsafe { decode_request(request_ptr, request_len) } {
    Ok(args) => args,
    Err(_) => return ASYNC_STATUS_INVALID_PAYLOAD,
  };
  let port = match parse_server_port(&args) {
    Ok(port) => port,
    Err(_) => return ASYNC_STATUS_INVALID_PAYLOAD,
  };
  let (task_context, control) = match register_server_control() {
    Ok(value) => value,
    Err(_) => return ASYNC_STATUS_INTERNAL_ERROR,
  };
  let status = unsafe {
    configure(
      host.context,
      task.handle,
      ASYNC_TASK_SERVER,
      ASYNC_TASK_SERIAL_EVENTS,
      task_context,
      Some(cancel_wss_server),
    )
  };
  if status != ASYNC_STATUS_OK {
    remove_server_control(task_context);
    return status;
  }
  let spawn_result = Builder::new().name("calcit-wss-server".to_owned()).spawn(move || {
    let outcome = catch_unwind(AssertUnwindSafe(|| run_safe_server(port, host, task, control)));
    let (kind, payload) = match outcome {
      Ok(Ok(())) => (ASYNC_EVENT_COMPLETE, b"&unit".to_vec()),
      Ok(Err(error)) => (ASYNC_EVENT_FAIL, encode_failure(error)),
      Err(_) => (ASYNC_EVENT_FAIL, encode_failure("WebSocket server worker panicked")),
    };
    let status = enqueue_with_backpressure(host, task, kind, &payload);
    if status != ASYNC_STATUS_OK {
      eprintln!("WebSocket server task {} failed to terminate with status {status}", task.handle);
    }
    remove_server_control(task_context);
  });
  if spawn_result.is_err() {
    remove_server_control(task_context);
    return ASYNC_STATUS_INTERNAL_ERROR;
  }
  ASYNC_STATUS_OK
}

/// Start a cancellable WebSocket server through async protocol v1.
///
/// # Safety
///
/// Request bytes and descriptors must remain readable for this call.
#[unsafe(no_mangle)]
pub unsafe extern "C" fn wss_serve_calcit_ffi_async_v1(
  request_ptr: *const u8,
  request_len: usize,
  task: *const CalcitFfiAsyncTaskV1,
  host: *const CalcitFfiAsyncHostV1,
) -> i32 {
  catch_unwind(AssertUnwindSafe(|| {
    // SAFETY: forwarded from the exported C contract above.
    unsafe { start_wss_server_async_v1(request_ptr, request_len, task, host) }
  }))
  .unwrap_or(ASYNC_STATUS_INTERNAL_ERROR)
}

fn wss_send(args: Vec<Edn>) -> Result<Edn, String> {
  if args.len() == 2 {
    match (&args[0], &args[1]) {
      (Edn::Number(id), Edn::Str(s)) if id.is_finite() && id.fract() == 0.0 && (0.0..=9_007_199_254_740_991.0).contains(id) => {
        // retrieve this client's `Responder`:
        let clients = CLIENTS.read().map_err(|_| "wss clients lock poisoned".to_owned())?;
        let responder = clients
          .get(&(*id as u64))
          .ok_or_else(|| format!("wss-send cannot find connected client {id}"))?;
        // echo the message back:
        let sent = responder.send(SafeMessage::Text(s.to_string())).is_ok();
        if !sent {
          return Err(format!("wss-send failed for disconnected client {id}"));
        }
        Ok(Edn::Nil)
      }
      (a, b) => Err(format!(
        "wss-send expected a non-negative safe integer id and string message, got {a} {b}"
      )),
    }
  } else {
    Err(format!("wss_send expected 2 argument, got {:?}", args))
  }
}

/// Send one WebSocket message through buffer protocol v1.
///
/// # Safety
///
/// Request bytes must remain readable and `output` writable for this call.
#[unsafe(no_mangle)]
pub unsafe extern "C" fn wss_send_calcit_ffi_v1(request_ptr: *const u8, request_len: usize, output: *mut CalcitFfiBuffer) -> i32 {
  // SAFETY: the shared adapter validates, copies, and contains all inputs.
  unsafe { run_buffer_adapter(request_ptr, request_len, output, wss_send) }
}

unsafe fn start_wss_each_async_v1(
  request_ptr: *const u8,
  request_len: usize,
  task: *const CalcitFfiAsyncTaskV1,
  host: *const CalcitFfiAsyncHostV1,
) -> i32 {
  let task = match unsafe { copy_task_descriptor(task) } {
    Ok(task) => task,
    Err(status) => return status,
  };
  let host = match unsafe { copy_host_descriptor(host) } {
    Ok(host) => host,
    Err(status) => return status,
  };
  let (Some(_enqueue), Some(configure)) = (host.enqueue, host.configure_task) else {
    return ASYNC_STATUS_INVALID_PAYLOAD;
  };
  let args = match unsafe { decode_request(request_ptr, request_len) } {
    Ok(args) => args,
    Err(_) => return ASYNC_STATUS_INVALID_PAYLOAD,
  };
  if !args.is_empty() {
    return ASYNC_STATUS_INVALID_PAYLOAD;
  }
  let ids = match CLIENTS.read() {
    Ok(clients) => clients.keys().copied().collect::<Vec<_>>(),
    Err(_) => return ASYNC_STATUS_INTERNAL_ERROR,
  };
  let status = unsafe { configure(host.context, task.handle, ASYNC_TASK_ONE_SHOT, ASYNC_TASK_SERIAL_EVENTS, 0, None) };
  if status != ASYNC_STATUS_OK {
    return status;
  }
  if Builder::new()
    .name("calcit-wss-each".to_owned())
    .spawn(move || {
      let mut failure = None;
      for client_id in ids {
        let payload = match encode_callback_args(vec![Edn::Number(client_id as f64)]) {
          Ok(payload) => payload,
          Err(error) => {
            failure = Some(error);
            break;
          }
        };
        let status = enqueue_with_backpressure(host, task, ASYNC_EVENT_EMIT, &payload);
        if status != ASYNC_STATUS_OK {
          failure = Some(format!("Calcit host rejected wss_each event with status {status}"));
          break;
        }
      }
      let (kind, payload) = match failure {
        Some(error) => (ASYNC_EVENT_FAIL, encode_failure(error)),
        None => (ASYNC_EVENT_COMPLETE, b"&unit".to_vec()),
      };
      let status = enqueue_with_backpressure(host, task, kind, &payload);
      if status != ASYNC_STATUS_OK {
        eprintln!("wss_each task {} failed to terminate with status {status}", task.handle);
      }
    })
    .is_err()
  {
    return ASYNC_STATUS_INTERNAL_ERROR;
  }
  ASYNC_STATUS_OK
}

/// Iterate over the current client snapshot through async protocol v1.
///
/// # Safety
///
/// Request bytes and descriptors must remain readable for this call.
#[unsafe(no_mangle)]
pub unsafe extern "C" fn wss_each_calcit_ffi_async_v1(
  request_ptr: *const u8,
  request_len: usize,
  task: *const CalcitFfiAsyncTaskV1,
  host: *const CalcitFfiAsyncHostV1,
) -> i32 {
  catch_unwind(AssertUnwindSafe(|| {
    // SAFETY: forwarded from the exported C contract above.
    unsafe { start_wss_each_async_v1(request_ptr, request_len, task, host) }
  }))
  .unwrap_or(ASYNC_STATUS_INTERNAL_ERROR)
}

#[cfg(test)]
mod tests {
  use super::*;
  use std::net::TcpListener;
  use std::ptr;
  use std::sync::atomic::Ordering;
  use std::thread::spawn;
  use std::time::Instant;

  type RecordedEvent = (u32, Vec<u8>);
  static RECORDED_EVENTS: LazyLock<Mutex<Vec<RecordedEvent>>> = LazyLock::new(|| Mutex::new(vec![]));

  unsafe extern "C" fn record_enqueue(
    _context: u64,
    _task_handle: u64,
    kind: u32,
    _response_handle: u64,
    payload_ptr: *const u8,
    payload_len: usize,
  ) -> i32 {
    let payload = if payload_len == 0 {
      vec![]
    } else {
      // SAFETY: the test producer keeps bytes readable for this call.
      unsafe { std::slice::from_raw_parts(payload_ptr, payload_len) }.to_vec()
    };
    RECORDED_EVENTS.lock().expect("recorded events lock").push((kind, payload));
    ASYNC_STATUS_OK
  }

  fn test_task() -> CalcitFfiAsyncTaskV1 {
    CalcitFfiAsyncTaskV1 {
      protocol_version: ASYNC_PROTOCOL_VERSION,
      struct_size: std::mem::size_of::<CalcitFfiAsyncTaskV1>() as u32,
      handle: 17,
      kind: ASYNC_TASK_SERVER,
      flags: ASYNC_TASK_SERIAL_EVENTS,
    }
  }

  fn test_host() -> CalcitFfiAsyncHostV1 {
    CalcitFfiAsyncHostV1 {
      protocol_version: ASYNC_PROTOCOL_VERSION,
      struct_size: std::mem::size_of::<CalcitFfiAsyncHostV1>() as u32,
      context: 17,
      enqueue: Some(record_enqueue),
      configure_task: None,
      open_response: None,
    }
  }

  fn wait_until(timeout: Duration, predicate: impl Fn() -> bool) {
    let deadline = Instant::now() + timeout;
    while !predicate() {
      assert!(Instant::now() < deadline, "condition did not become true before timeout");
      std::thread::sleep(Duration::from_millis(10));
    }
  }

  #[test]
  fn listener_start_failure_is_returned_without_panicking() {
    let listener = TcpListener::bind("0.0.0.0:0").unwrap();
    let port = listener.local_addr().unwrap().port();
    let control = Arc::new(ServerControl {
      cancelled: AtomicBool::new(false),
    });
    let error = run_safe_server(port, test_host(), test_task(), control).expect_err("occupied port must fail");

    assert!(error.contains("failed to listen on WebSocket port"), "error: {error}");
  }

  #[test]
  fn ffi_layouts_versions_and_short_descriptor_rejection_are_stable() {
    assert_eq!(calcit_ffi_async_version(), 1);
    assert_eq!(calcit_ffi_buffer_version(), 1);
    assert_eq!(std::mem::size_of::<CalcitFfiAsyncTaskV1>(), 24);
    assert_eq!(std::mem::size_of::<CalcitFfiAsyncHostV1>(), 40);
    let mut short_task = test_task();
    short_task.struct_size = 8;
    assert!(matches!(
      unsafe { copy_task_descriptor(&short_task) },
      Err(ASYNC_STATUS_INVALID_PAYLOAD)
    ));
  }

  #[test]
  fn server_port_rejects_lossy_or_out_of_range_numbers() {
    for port in [-1.0, 0.0, 80.5, 65_536.0] {
      let options = Edn::map_from_iter([(Edn::tag("port"), Edn::Number(port))]);
      assert!(parse_server_port(&[options]).is_err(), "port {port} must be rejected");
    }
    assert!(
      parse_server_port(&[Edn::Nil, Edn::Nil]).is_err(),
      "extra arguments must be rejected"
    );
  }

  #[test]
  fn safe_server_connects_exchanges_messages_and_cancels_cleanly() {
    RECORDED_EVENTS.lock().expect("recorded events lock").clear();
    CLIENTS.write().expect("clients lock").clear();
    let probe = TcpListener::bind("127.0.0.1:0").expect("reserve test port");
    let port = probe.local_addr().expect("test address").port();
    drop(probe);

    let control = Arc::new(ServerControl {
      cancelled: AtomicBool::new(false),
    });
    let server_control = Arc::clone(&control);
    let server = spawn(move || run_safe_server(port, test_host(), test_task(), server_control));

    let url = format!("ws://127.0.0.1:{port}");
    let deadline = Instant::now() + Duration::from_secs(2);
    let (mut socket, _) = loop {
      match tungstenite::connect(url.as_str()) {
        Ok(connection) => break connection,
        Err(_) if Instant::now() < deadline => std::thread::sleep(Duration::from_millis(10)),
        Err(error) => panic!("failed to connect test WebSocket: {error}"),
      }
    };

    wait_until(Duration::from_secs(2), || CLIENTS.read().is_ok_and(|clients| !clients.is_empty()));
    let client_id = *CLIENTS.read().expect("clients lock").keys().next().expect("connected client id");

    socket
      .write_message(SafeMessage::Text("from-client".to_owned()))
      .expect("send client message");
    wait_until(Duration::from_secs(2), || {
      RECORDED_EVENTS.lock().is_ok_and(|events| events.len() >= 2)
    });

    let request = encode_edn(&Edn::List(cirru_edn::EdnListView(vec![
      Edn::Number(client_id as f64),
      Edn::str("from-calcit"),
    ])))
    .expect("encode send request");
    let mut output = CalcitFfiBuffer {
      ptr: ptr::null_mut(),
      len: 0,
      cap: 0,
    };
    assert_eq!(unsafe { wss_send_calcit_ffi_v1(request.as_ptr(), request.len(), &mut output) }, 0);
    unsafe { calcit_ffi_buffer_free(output) };
    control.cancelled.store(true, Ordering::Release);
    assert_eq!(
      socket.read_message().expect("receive server message"),
      SafeMessage::Text("from-calcit".to_owned())
    );

    server.join().expect("server worker join").expect("server shutdown");
    assert!(!CLIENTS.read().expect("clients lock").contains_key(&client_id));

    let payloads = RECORDED_EVENTS
      .lock()
      .expect("recorded events lock")
      .iter()
      .map(|(_, payload)| String::from_utf8_lossy(payload).into_owned())
      .collect::<Vec<_>>();
    assert!(
      payloads.iter().any(|payload| payload.contains("'connect")),
      "recorded payloads: {payloads:?}"
    );
    assert!(
      payloads
        .iter()
        .any(|payload| payload.contains("'message") && payload.contains("from-client")),
      "recorded payloads: {payloads:?}"
    );
  }
}
