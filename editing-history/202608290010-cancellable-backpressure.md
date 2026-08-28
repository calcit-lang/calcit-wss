# WebSocket 可取消背压 / Cancellable WebSocket backpressure

## 中文

- 升级已发布的 `calcit_native_ffi 0.1.3`，server 业务事件等待队列时读取取消状态。
- 取消后不再调用 host enqueue；连接清理后的 terminal 继续独立可靠发布。

## English

- Upgrade to the published `calcit_native_ffi 0.1.3` and observe server cancellation while business events wait for queue capacity.
- Skip host enqueue after cancellation while preserving independent, reliable terminal publication after connection cleanup.
