use cirru_edn::Edn;
use std::net::TcpListener;
// use std::thread::spawn;
use tungstenite::accept;

#[no_mangle]
pub fn serve_wss(args: Vec<Edn>, handler: Box<dyn Fn(Edn) -> Edn>) -> Result<Edn, String> {
  println!("args: {:?}", args);
  let server = TcpListener::bind("127.0.0.1:9001").unwrap();
  for stream in server.incoming() {
    // spawn(move || {
    let mut websocket = accept(stream.unwrap()).unwrap();
    loop {
        let msg = websocket.read_message().unwrap();

        // We do not want to send back ping/pong messages.
        if msg.is_binary() || msg.is_text() {
          let result = handler(Edn::Str( msg.into_text().unwrap().to_string()));

          websocket
            .write_message(tungstenite::Message::from(format!("{}", result)))
            .unwrap();
        }
      }
    // })
    ;
  }

  Ok(Edn::Nil)
}
