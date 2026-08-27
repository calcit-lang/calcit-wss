# C-safe WebSocket FFI migration

- Added C-safe buffer v1 for `wss-send!` and async v1 for `wss-serve!` / `wss-each!`, while retaining the legacy Rust ABI as a per-method fallback.
- Replaced the non-cancellable safe server path with an owned listener/client-worker runtime, ID-based cancellation registry, serial events, backpressure handling, and cleanup-before-terminal semantics.
- Added size-safe descriptor reads, panic containment, strict port/client-id validation, a typed `WssEvent`, and zero-debt Calcit quality schemas.
- Added Rust boundary tests and a real Calcit WebSocket connect/message/send/cancel smoke test to CI.
- Preserved FIFO delivery during cancellation by routing established-client shutdown through the same outbound command queue; the cancellation flag is checked directly only before a client is registered.
- Upgraded the repository to Calcit 0.13.52 and `setup-calcit@v1.3.0`, and made `calcit.cirru` reviewable as the canonical source snapshot.
