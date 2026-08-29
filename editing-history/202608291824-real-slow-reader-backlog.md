# Real slow-reader and cancellation-backlog regression

## Context

The bounded outbound queue and typed metrics had deterministic channel-level coverage, but the remaining realtime acceptance gap required a real TCP/WebSocket peer that completed the handshake and then stopped reading.

## Change

- Added a test-only `socket2` dependency to constrain the server-side socket send buffer.
- Added a real slow-reader test that fills the outbound queue, observes `Backpressured`, cancels with a measurable backlog, and proves cancellation dequeues at most one additional accepted message.
- Normalized close/read/write races after cancellation to `ServerCancelled` so disconnect metrics reflect the lifecycle owner instead of incidental socket timing.
- Documented the system regression and its guarantees.

## Verification

- `cargo fmt --check`
- `cargo test -- --test-threads=1` (10/10)
- `cargo clippy --all-targets -- -D warnings`
- Calcit 0.13.60 format/check-only/strict-zero quality/runtime checks
- Release dylib `scripts/check-wss-ffi.sh` connect/message/send/metrics/cancel smoke
