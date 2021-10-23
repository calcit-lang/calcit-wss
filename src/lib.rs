use cirru_edn::Edn;
use std::net::TcpListener;
use std::sync::Arc;
use std::thread::spawn;
use tungstenite::accept;

#[no_mangle]
pub fn serve_wss(
  args: Vec<Edn>,
  handler: Arc<dyn Fn(Edn) -> Edn + Send + Sync + 'static>,
) -> Result<Edn, String> {
  println!("args: {:?}", args);
  let server = TcpListener::bind("127.0.0.1:9001").unwrap();

  // let h1 = Arc::new(handler);

  for stream in server.incoming() {
    let h_clone = Arc::clone(&handler);

    spawn(move || {
      let mut websocket = accept(stream.unwrap()).unwrap();
      loop {
        let msg = websocket.read_message().unwrap();

        // We do not want to send back ping/pong messages.
        if msg.is_binary() || msg.is_text() {
          let result = h_clone(Edn::Str(msg.into_text().unwrap().to_string()));

          websocket
            .write_message(tungstenite::Message::from(format!("{}", result)))
            .unwrap();
        }
      }
    });
  }

  Ok(Edn::Nil)
}
