# 2026-08-31：恢复慢读端的待写 frame / Resume pending frames for slow readers

- Calcium Workflow 的真实慢读端回归在 macOS 上复现了 `Resource temporarily unavailable (os error 35)`；此前 worker 将这个可重试写入结果错误地记为 `write-failed` 并断开连接。
- `tungstenite::WebSocket::write_message` 返回 `WouldBlock` / `TimedOut` / `Interrupted` 时，frame 已保留在内部队列。后续必须调用 `write_pending`，不能再次提交原消息，否则可能重复发送。
- 写入重试期间持续检查 server cancel 与 local close，使慢读端维持连接，同时保持取消路径有界。
- 扩充真实 socket 测试：在取消前跨过 write timeout，证明 worker 不会提前终止或增加 `write-failed`。

---

- A real Calcium Workflow slow-reader regression reproduced `Resource temporarily unavailable (os error 35)` on macOS; the worker previously misclassified this retryable write result as `write-failed` and disconnected the client.
- When `tungstenite::WebSocket::write_message` returns `WouldBlock`, `TimedOut`, or `Interrupted`, tungstenite has retained the frame internally. The worker must call `write_pending` rather than resubmit the original message, which could duplicate delivery.
- The retry loop continues checking server cancellation and local close, preserving the connection while keeping cancellation bounded.
- The real-socket test now waits past the write timeout before cancellation and proves that the worker remains alive without incrementing `write-failed`.
