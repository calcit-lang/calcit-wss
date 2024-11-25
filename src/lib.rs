use cirru_edn::{Edn, EdnTupleView};
use simple_websockets::{Event, Message, Responder};
use std::collections::HashMap;
use std::sync::{Arc, LazyLock, RwLock};
use std::thread::spawn;

static CLIENTS: LazyLock<RwLock<HashMap<u64, Responder>>> = LazyLock::new(|| RwLock::new(HashMap::new()));

#[no_mangle]
pub fn abi_version() -> String {
  String::from("0.0.9")
}

#[no_mangle]
pub fn wss_serve(
  args: Vec<Edn>,
  handler: Arc<dyn Fn(Vec<Edn>) -> Result<Edn, String> + Send + Sync + 'static>,
  _finish: Box<dyn FnOnce()>,
) -> Result<Edn, String> {
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
          if let Err(e) = handler(vec![Edn::Tuple(EdnTupleView {
            tag: Arc::new(Edn::tag("connect")),
            extra: vec![Edn::Number(client_id as f64)],
          })]) {
            println!("Failed to handle connect: {}", e)
          }
        }
        Event::Disconnect(client_id) => {
          {
            // remove the disconnected client from the clients map:
            let mut clients = CLIENTS.write().unwrap();
            clients.remove(&client_id);
          }
          if let Err(e) = handler(vec![Edn::Tuple(EdnTupleView {
            tag: Arc::new(Edn::tag("disconnect")),
            extra: vec![Edn::Number(client_id as f64)],
          })]) {
            println!("Failed to handle disconnect: {}", e)
          }
        }
        Event::Message(client_id, message) => match message {
          Message::Text(s) => {
            if let Err(e) = handler(vec![Edn::Tuple(EdnTupleView {
              tag: Arc::new(Edn::tag("message")),
              extra: vec![Edn::Number(client_id as f64), Edn::Str(s.into())],
            })]) {
              println!("Failed to handle text message: {}", e)
            }
          }
          Message::Binary(buf) => {
            if let Err(e) = handler(vec![Edn::Tuple(EdnTupleView {
              tag: Arc::new(Edn::tag("blob")),
              extra: vec![Edn::Number(client_id as f64), Edn::Buffer(buf)],
            })]) {
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

#[no_mangle]
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

#[no_mangle]
pub fn wss_each(
  _args: Vec<Edn>,
  handler: Arc<dyn Fn(Vec<Edn>) -> Result<Edn, String> + Send + Sync + 'static>,
  finish: Box<dyn FnOnce()>,
) -> Result<Edn, String> {
  let mut ids: Vec<u64> = vec![];
  {
    let clients = CLIENTS.write().unwrap();

    // TODO remove clone
    for client_id in clients.clone().into_keys().collect::<Vec<u64>>() {
      ids.push(client_id)
    }
  }

  for id in ids {
    handler(vec![Edn::Number(id as f64)])?;
  }

  finish();
  Ok(Edn::Nil)
}
