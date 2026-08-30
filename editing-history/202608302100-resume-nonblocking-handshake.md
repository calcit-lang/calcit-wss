# Resume nonblocking WebSocket handshakes

- `tungstenite::accept` returns an `Interrupted(MidHandshake)` value when a
  nonblocking peer has not supplied the full HTTP upgrade request. Preserve and
  resume that state instead of treating it as a failed connection.
- Bound incomplete handshakes with a five-second deadline and a short retry
  delay. Check the server cancellation flag between retries so shutdown does
  not wait for the deadline or leave pending workers behind.
- Restore blocking transport mode after a successful upgrade, retaining the
  existing read and write timeout behavior for the established connection.
- Add real loopback regressions for a fragmented upgrade request and
  cancellation while the upgrade request is still pending.
