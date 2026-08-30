# Typed WebSocket FFI contract / 类型化 WebSocket FFI 契约

- Upgrade the project toolchain declaration to Calcit 0.13.69.
- Declare `wss-serve!` as an async stream over async-task-v1 with a nominal
  event type, owned task capability, and cooperative cancellation.
- Declare typed synchronous send and metrics calls, plus the blocking callback
  iteration boundary.
- Preserve callback and map limitations as explicit Interface IR v1
  diagnostics instead of generating an untyped adapter.
- Document deterministic `calcit ffi export` auditing.

- 将项目工具链声明升级到 Calcit 0.13.69。
- 将 `wss-serve!` 声明为基于 async-task-v1 的异步 stream，记录 nominal
  event、owned task capability 与 cooperative cancellation。
- 声明类型化同步 send/metrics 调用及 blocking callback iteration 边界。
- callback 与 map 限制继续作为 Interface IR v1 显式诊断，不生成无类型适配器。
- 记录维护者使用 `calcit ffi export` 进行确定性审计的方法。
