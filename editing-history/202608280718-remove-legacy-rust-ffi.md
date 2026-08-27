# Remove legacy Rust FFI exports / 删除遗留 Rust FFI 导出

## 中文

- 删除 version probes 和旧 Rust callback serve/each entry points，`wss_send` 只作为 buffer adapter 内部 handler。
- 删除 `simple-websockets` legacy server 路径，只保留可取消的 C-safe async server 与安全 sender registry。
- 改用 `cdylib`，升级 Calcit 要求到 0.13.57。
- CI 审计 serve/each/send 的版本化 C 导出，并拒绝旧裸符号。

## English

- Remove version probes and legacy Rust callback serve/each entry points; keep `wss_send` only as an internal buffer-adapter handler.
- Remove the `simple-websockets` legacy server path, retaining only the cancellable C-safe async server and safe sender registry.
- Switch to `cdylib` and upgrade the Calcit requirement to 0.13.57.
- Audit versioned serve/each/send C exports in CI and reject legacy bare symbols.
