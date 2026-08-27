use std::env;
use std::thread::sleep;
use std::time::{Duration, Instant};
use tungstenite::Message;

fn main() -> Result<(), String> {
  let port = env::args()
    .nth(1)
    .ok_or_else(|| "expected WebSocket smoke port".to_owned())?
    .parse::<u16>()
    .map_err(|error| format!("invalid WebSocket smoke port: {error}"))?;
  let url = format!("ws://127.0.0.1:{port}");
  let deadline = Instant::now() + Duration::from_secs(5);
  let (mut socket, _) = loop {
    match tungstenite::connect(url.as_str()) {
      Ok(connection) => break connection,
      Err(_) if Instant::now() < deadline => sleep(Duration::from_millis(20)),
      Err(error) => return Err(format!("failed to connect WebSocket smoke client: {error}")),
    }
  };
  socket
    .write_message(Message::Text("from-client".to_owned()))
    .map_err(|error| format!("failed to send WebSocket smoke message: {error}"))?;
  let response = socket
    .read_message()
    .map_err(|error| format!("failed to read WebSocket smoke response: {error}"))?;
  if response != Message::Text("from-calcit".to_owned()) {
    return Err(format!("unexpected WebSocket smoke response: {response:?}"));
  }
  Ok(())
}
