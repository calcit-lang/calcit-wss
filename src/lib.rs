use cirru_edn::Edn;
use simple_websockets::{Event, Message, Responder};
use std::collections::HashMap;
use std::sync::{Arc, LazyLock, RwLock};
use std::thread::spawn;

static CLIENTS: LazyLock<RwLock<HashMap<u64, Responder>>> = LazyLock::new(|| RwLock::new(HashMap::new()));

type Callback = dyn Fn(Vec<Edn>) -> Result<Edn, String> + Send + Sync + 'static;

/// Invoke a Calcit callback for each client without propagating callback errors
/// through the Rust dylib boundary.
///
/// The host runner has already reported a callback failure with its Calcit stack.
/// Returning that `Err` through the dynamic-library callback ABI can corrupt the
/// EDN return value during destruction, so stop this batch and keep the server
/// alive instead.
fn notify_clients(ids: impl IntoIterator<Item = u64>, handler: &Callback) {
  for id in ids {
    if let Err(e) = handler(vec![Edn::Number(id as f64)]) {
      eprintln!("wss_each callback failed for client {id}: {e}");
      break;
    }
  }
}

#[unsafe(no_mangle)]
pub fn abi_version() -> String {
  String::from("0.0.9")
}

#[unsafe(no_mangle)]
pub fn edn_version() -> String {
  cirru_edn::version().to_string()
}

#[unsafe(no_mangle)]
pub fn wss_serve(args: Vec<Edn>, handler: Arc<Callback>, _finish: Box<dyn FnOnce()>) -> Result<Edn, String> {
  let port = match args.first() {
    Some(Edn::Map(m)) => match m.tag_get("port") {
      Some(Edn::Number(n)) => n.floor().round() as u16,
      Some(a) => return Err(format!("Unknown port: {}", a)),
      None => 9001,
    },
    Some(Edn::Nil) => 9001,
    Some(a) => return Err(format!("Unknown option: {}", a)),
    None => 9001,
  };

  // listen for WebSockets on port, defaults to 9001:
  let event_hub = simple_websockets::launch(port).expect("failed to listen on port 9001");
  println!("WebSocket server started at port {}", port);

  let task = spawn(move || {
    loop {
      match event_hub.poll_event() {
        Event::Connect(client_id, responder) => {
          {
            // add their Responder to our `clients` map:
            let mut clients = CLIENTS.write().unwrap();
            clients.insert(client_id, responder);
          }
          if let Err(e) = handler(vec![Edn::enum_value("connect", vec![Edn::Number(client_id as f64)])]) {
            println!("Failed to handle connect: {}", e)
          }
        }
        Event::Disconnect(client_id) => {
          {
            // remove the disconnected client from the clients map:
            let mut clients = CLIENTS.write().unwrap();
            clients.remove(&client_id);
          }
          if let Err(e) = handler(vec![Edn::enum_value("disconnect", vec![Edn::Number(client_id as f64)])]) {
            println!("Failed to handle disconnect: {}", e)
          }
        }
        Event::Message(client_id, message) => match message {
          Message::Text(s) => {
            if let Err(e) = handler(vec![Edn::enum_value(
              "message",
              vec![Edn::Number(client_id as f64), Edn::Str(s.into())],
            )]) {
              println!("Failed to handle text message: {}", e)
            }
          }
          Message::Binary(buf) => {
            if let Err(e) = handler(vec![Edn::enum_value("blob", vec![Edn::Number(client_id as f64), Edn::Buffer(buf)])]) {
              println!("Failed to handle binary message: {}", e)
            }
          }
        },
      }
    }
  });

  task.join().expect("running WebSocket server");

  Ok(Edn::Nil)
}

#[unsafe(no_mangle)]
pub fn wss_send(args: Vec<Edn>) -> Result<Edn, String> {
  if args.len() == 2 {
    match (&args[0], &args[1]) {
      (Edn::Number(id), Edn::Str(s)) => {
        // retrieve this client's `Responder`:
        let clients = CLIENTS.read().unwrap();
        let responder = clients.get(&(*id as u64)).unwrap();
        // echo the message back:
        responder.send(Message::Text(s.to_string()));
        Ok(Edn::Nil)
      }
      (a, b) => Err(format!("wss-send expected id and message, got {} {}", a, b)),
    }
  } else {
    Err(format!("wss_send expected 2 argument, got {:?}", args))
  }
}

#[unsafe(no_mangle)]
pub fn wss_each(_args: Vec<Edn>, handler: Arc<Callback>, finish: Box<dyn FnOnce()>) -> Result<Edn, String> {
  let mut ids: Vec<u64> = vec![];
  {
    let clients = CLIENTS.write().unwrap();

    // TODO remove clone
    for client_id in clients.clone().into_keys().collect::<Vec<u64>>() {
      ids.push(client_id)
    }
  }

  notify_clients(ids, handler.as_ref());
  finish();
  Ok(Edn::Nil)
}

#[cfg(test)]
mod tests {
  use super::*;
  use std::sync::atomic::{AtomicUsize, Ordering};

  #[test]
  fn callback_error_stops_this_batch_without_crossing_the_ffi_boundary() {
    let calls = Arc::new(AtomicUsize::new(0));
    let calls_for_callback = calls.clone();
    let handler: Arc<Callback> = Arc::new(move |_| {
      let call = calls_for_callback.fetch_add(1, Ordering::SeqCst);
      if call == 0 {
        Err("expected callback failure".to_owned())
      } else {
        Ok(Edn::Nil)
      }
    });

    notify_clients([7, 8], handler.as_ref());

    assert_eq!(calls.load(Ordering::SeqCst), 1);
  }
}
