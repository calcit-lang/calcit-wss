查看 Calcit 命令行工具的用法:

```bash
calcit docs agents --full
```

`calcit.cirru` 是唯一源码 Snapshot；使用 `calcit edit` / `calcit tree`
修改。新 native 方法优先实现 C-safe buffer/async ABI，legacy Rust ABI
只作为逐方法 fallback。长生命周期 WebSocket server 必须提供 cancel hook，
且只有在 listener、连接 worker 和 client registry 都清理后才发送 terminal。

提交前运行 `cargo fmt --check`、`cargo test`、
`cargo clippy --all-targets -- -D warnings`、Calcit 0.13.52 的 check/quality
门禁，以及 `bash scripts/check-wss-ffi.sh` 的真实
WebSocket connect/message/send/cancel smoke。
