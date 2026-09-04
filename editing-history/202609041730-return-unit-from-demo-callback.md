# Return Unit from demo callback / demo 回调返回 Unit

- Make the bundled `wss-each!` demo callback consume the typed
  `WssSendOutcome` and explicitly return `Unit`.
- Preserve the send behavior while matching the callback's declared contract.
- Address the valid review finding without changing the already-correct README
  Cirru form.

- 让内置 `wss-each!` demo 回调消费类型化的 `WssSendOutcome` 并显式返回
  `Unit`。
- 保持发送行为不变，同时满足回调声明的类型契约。
- 处理有效 review finding，不改动已经通过编译的 README Cirru 写法。

## Validation / 验证

- `calcit query type-at wss.test/demo! --path code@3.2.3.1.2 --format json`
  reports exact inferred type `Unit` with no diagnostics.
- `calcit --check-only`
- `calcit analyze quality`
- `calcit calcit.cirru`
