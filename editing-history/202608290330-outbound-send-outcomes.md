# Outbound send outcomes / Outbound 发送结果

## 中文

- 将每连接无界 outbound channel 改为同时限制消息数和累计字节数的队列。
- `wss-send!` 返回 accepted/backpressured/too-large/closed，供协同 workflow 明确处理背压。
- close/cancel 使用独立原子控制路径，并为 socket 写入设置超时，避免 slow client 阻塞 shutdown。
- cancel 时最多发送一条已 accepted 的队首消息后关闭，不会无界 drain backlog。

## English

- Replaced each connection's unbounded outbound channel with a queue bounded by message count and total bytes.
- `wss-send!` returns accepted/backpressured/too-large/closed so collaboration workflows can handle pressure explicitly.
- Close/cancel uses an independent atomic control path, and socket writes have a timeout to keep slow clients from blocking shutdown.
- Cancellation flushes at most one already accepted head message before closing and never drains an unbounded backlog.
