## (TODO) WebSocket Server binding

> Rust library for Calcit runtime.

### Usages

currently 3 APIs are provided:

```cirru
wss.core/wss-serve!
  {} $ :port 9000
  fn (income) (println income)
    wss.core/wss-each! $ fn (id)
      do
        wss.core/wss-send! id $ str "\"hello from: " income
        , &unit
```

`wss-serve!` returns a typed `FfiTask`. Stop the listener and all connection
workers with `.cancel!` or `.cancel-with!`; terminal completion is emitted
only after native resources are released. `wss-send!` accepts a non-negative
safe-integer client id and a string message, then returns `(:accepted)`,
`(:backpressured)`, `(:too-large)`, or `(:closed)`. These outcomes are normal
flow control rather than exceptions. `wss-each!` iterates over a stable snapshot
of currently connected client ids. `wss-metrics` returns a typed `WssMetrics`
snapshot containing live per-client queue depth/bytes/oldest age plus cumulative
process-lifetime send outcomes and disconnect reasons.

`wss-metrics` 返回类型化的 `WssMetrics` 快照：其中包含当前每个连接的队列深度、
累计字节数和最老消息等待时间，以及进程生命周期内累计的 send outcome 与断开原因。
该接口用于诊断和模板层策略，不会改变、合并或消费业务队列。

`wss-each!` 接收 `Number -> Unit` 回调，遍历调用时的稳定客户端快照。
它使用不可取消的 one-shot `async-task-v1` ABI；返回的 Unit 只表示原生启动成功，
不表示回调已经完成。模块用 `decode-map-as` 检查真实 host 返回值，保留 Unit，
并拒绝 nil、Number 等错误结果，而不是丢弃返回值后补一个 Unit。
回调随后通过 host 队列执行，每个快照 id 一次；异常仍由原异步错误路径报告。
不要依赖回调在 `wss-each!` 返回前执行，也不要把其返回值当作可取消 Task。

每个连接的 outbound 业务队列按消息数和累计字节数双重限制（当前分别为 64 条、
1 MiB，单消息上限 256 KiB）。队列满时模块不会丢弃或合并 patch，而是返回
`(:backpressured)`，供上层基于 acknowledged revision 重新计算；取消和 close
使用独立控制路径，不会被业务队列占满所阻塞。取消时 worker 最多发送一条已
accepted 的队首消息后关闭，不会任意 drain backlog。

Each connection has an outbound business queue bounded by both message count and
total bytes (currently 64 messages and 1 MiB, with a 256 KiB per-message limit).
The module never drops or merges patches when full; it returns
`(:backpressured)` so the workflow can recompute from an acknowledged revision.
Cancellation and close use an independent control path that remains available
when the business queue is full. On cancellation, a worker flushes at most one
already accepted head message before closing; it does not drain an arbitrary
backlog.

Maintainers can run `bash scripts/check-wss-ffi.sh` after copying the release
dylib into `dylibs/`; it requires connect, inbound message, buffer-v1 send,
typed metrics decoding, task cancellation, and clean host exit to all succeed.
The Rust test suite additionally uses a real WebSocket whose peer completes the
handshake but stops reading. It verifies queue-full backpressure, cancellation
with a pending backlog, bounded post-cancel dequeue, and a `server-cancelled`
disconnect reason even when cancellation races a socket error.

Rust 测试还会建立一个完成握手后停止读取的真实 WebSocket，验证队列满时返回背压、
存在 backlog 时取消不会继续 drain，并且取消与 socket error 竞态时仍统一记录为
`server-cancelled`。操作系统用 `WouldBlock` / `TimedOut` 暂停 socket 写入时，worker
会继续 flush tungstenite 已保留的 frame；不会重复入队，也不会把慢读端误判为断线。

The writer also resumes tungstenite's retained frame after an operating-system
`WouldBlock` or `TimedOut` result. It neither enqueues that message twice nor
misclassifies an ordinary slow reader as a disconnected client.

### 共享 FFI 基础层 / Shared FFI foundation

本模块使用 [`calcit_native_ffi`](https://github.com/calcit-lang/calcit-native-ffi)
维护 C-safe descriptors、buffer ownership、Cirru EDN adapter 与 backpressure
transport。WebSocket client registry、连接 worker 和取消/terminal 顺序仍由本仓库维护。

This module uses
[`calcit_native_ffi`](https://github.com/calcit-lang/calcit-native-ffi) for
C-safe descriptors, buffer ownership, Cirru EDN adapters, and backpressure
transport. The WebSocket client registry, connection workers, and
cancellation/terminal ordering remain owned by this repository.

Audit the versioned typed FFI contract without opening a socket:

```bash
calcit calcit.cirru ffi export --json --ns wss.core
```

该只读 inventory 会展示同步 send/metrics 边界，并把 `wss-serve!` 标记为
`async + async-task-v1`；`wss-each!` 同样使用这个异步协议，但没有取消句柄。
连接 worker、task ownership 和 cooperative cancellation
都由本模块的手写 adapter 管理，不再要求 Calcit 调用方声明生命周期状态。
Interface IR v3 对 callback、Map options 和 `FfiTask` 仍给出显式 unsupported
diagnostic，生成器不得把这些类型静默擦除。

普通 WebSocket 业务事件使用可取消背压：server 取消后最长 10ms 停止等待 host
队列。队列持续饱和时默认最多等待 5 秒。清理 listener、连接 worker 与 client
registry 后的 terminal 事件不应用业务取消 predicate，继续利用 host 预留容量收尾。

Ordinary WebSocket business events use cancellable backpressure: after server
cancellation they stop waiting on host queue capacity within 10ms, while a
persistently saturated queue has a default five-second deadline. The terminal
event after listener, connection-worker, and client-registry cleanup does not
use the business cancellation predicate and relies on host-reserved capacity.

Install to `~/.config/calcit/modules/`, compile and provide `*.{dylib,so}` file with `./build.sh`.

### Develop

本仓库固定已发布 Calcit 0.29.0-alpha.15、Caps 0.1.1，使用 stable Rust 和已提交的 Cargo.lock。
Calcit 是预发布版，不宣称本次迁移已经完成所有消费者的严格验证。
先执行 `caps --strict --ci`、`caps verify --toolchain`，再执行两个 native entry
的 `--check-only`；`demo` 只做静态检查，不以启动长期监听器作为构建门禁。
公开门禁覆盖全部四个命名空间（19 个定义），保留零债务 quality 门禁，
不通过新增编译器改写规则或放宽 baseline 来迁移。
原有 Rust 生命周期、背压测试与真实连接/发送/取消 smoke 继续由 CI 执行。
`wss-each!` 的 definition `:tests` 覆盖空客户端和 checked Unit 正反例，
CI 在复制真实 dylib 后执行 `calcit test 'wss.core/wss-each!' --require-match`。
真实 WebSocket smoke 另验证非空客户端 id、一次回调及实际启动结果为 Unit，
拒绝参数或返回类型错误的回调，并验证回调抛错后仍报告错误且能取消、关闭连接。
这是 native 模块，没有前端部署资源，不新增 COS/CDN 配置。

CI 的 Actions 使用正式标签；Calcit 工具链独立固定上述 alpha 版本。标签可移动的供应链
风险仍然存在；只读权限和不保留 checkout 凭据并不等同于不可变版本。

For task lifecycle, backpressure, metrics, and revision-aware resync guidance,
use `calcit docs read "Bounded WebSocket servers" --module calcit-wss` after
the module is installed.

Run buildin demo with:

```bash
calcit calcit.cirru --init-fn wss.test/demo!
```

### Workflow

https://github.com/calcit-lang/dylib-workflow

### License

MIT
