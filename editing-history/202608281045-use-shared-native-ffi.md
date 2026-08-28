# 使用共享 native FFI crate / Adopt the shared native FFI crate

## 中文

- 用 `calcit_native_ffi 0.1.0` 替换本地复制的 C ABI descriptors、buffer、EDN 与 transport 模板。
- 保留 WebSocket registry、workers、cancel handler、terminal ordering 与公开 symbols。
- 补充共享层和模块业务层的职责边界。

## English

- Replace local C ABI descriptor, buffer, EDN, and transport templates with `calcit_native_ffi 0.1.0`.
- Preserve WebSocket registries, workers, cancellation handlers, terminal ordering, and public symbols.
- Document the responsibility boundary between the shared and module-specific layers.
