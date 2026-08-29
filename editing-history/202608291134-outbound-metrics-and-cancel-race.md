# Outbound metrics and cancellation regression

The per-client outbound queue now keeps message count, bytes, and enqueue
timestamps in one mutex-protected state. This makes `WssMetrics` snapshots
internally consistent while the existing per-client enqueue lock preserves
send order under concurrent callers. Process-lifetime counters record send
outcomes and classified disconnect reasons.

The real dylib smoke was extended to decode typed metrics and perform a clean
WebSocket close handshake. That regression exposed a Calcit host drain-batch
cancellation race, fixed separately in calcit-lang/calcit#513; WSS does not
hide the host issue with a module-local workaround.

每连接 outbound queue 现在用同一个 Mutex 状态维护消息数、字节数与入队时间，
保证 `WssMetrics` snapshot 内部一致；进程级指标累计 send outcome 与断开原因。
真实 dylib smoke 同时验证类型化 metrics 和正常 close handshake，并依赖
calcit-lang/calcit#513 修复 host drain batch 中取消后旧 Emit 的竞态。
