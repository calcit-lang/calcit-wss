# Simplify typed FFI metadata / 精简 typed FFI 元数据

- Upgrade the declared Calcit toolchain to 0.13.76 so maintainers audit the
  current Interface IR v2 contract.
- Keep only the stable backend, symbol, invocation, and transport fields in the
  public WebSocket FFI metadata.
- Remove speculative callback-position, ownership, cancellation, and lowering
  kind declarations; those lifecycle details remain inside the handwritten
  async adapter.
- Update the module guide to describe the real v2 diagnostics and adapter
  boundary.
- Make the README callback example explicitly return Unit after consuming the
  typed send outcome, as required by the stricter current checker.

- 将声明的 Calcit 工具链升级到 0.13.76，以当前 Interface IR v2 审计契约。
- WebSocket 的公开 FFI 元数据只保留稳定的 backend、symbol、invoke 与 transport。
- 删除 callback 下标、ownership、cancel 与 lowering kind 等推测性声明；这些生命
  周期细节继续由手写 async adapter 内部管理。
- 更新模块文档，准确说明 v2 诊断与 adapter 边界。
- README 回调示例在消费类型化 send outcome 后显式返回 Unit，满足当前更严格的
  类型检查。

## Validation / 验证

- `calcit ffi export --json --ns wss.core`
- `calcit --check-only`
- `calcit analyze check-types --summary-only`
- `calcit analyze quality`
- `calcit docs check-md README.md --entry calcit.cirru --failures-only`
- `calcit docs check-md docs/realtime-websocket.md --entry calcit.cirru --failures-only`
- `cargo fmt --check`
- `cargo test`
- `cargo clippy --all-targets -- -D warnings`
- `cargo build --release`
- `bash scripts/check-wss-ffi.sh`
