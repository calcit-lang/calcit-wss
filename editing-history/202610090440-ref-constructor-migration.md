# Ref 构造器迁移

- `scripts/check-wss-ffi.sh` 中内联的 Calcit 片段由 `atom` 改为 `ref`（`task-ref` 两处、`each-count` 一处）。
- `ref` 从 Calcit 0.29.0-alpha.18 起才提供，因此 `deps.cirru` 的 Calcit 版本由 0.29.0-alpha.15 升级到 0.29.0-alpha.19，CI job 名称同步更新；模块版本不变。
- `calcit fix --rule core-ref-constructor-v1 --include-attached` 预览为 `:changed false`，`calcit.cirru` 本身没有 atom/defatom。
- 本地按 `.github/workflows/check.yaml` 全部步骤验证通过，包括 WebSocket 连接、发送、取消与回调错误冒烟测试。
