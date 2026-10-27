## (TODO) WebSocket Server binding

> Rust library for Calcit runtime.

### 正式 0.31.0 配对：使用者影响

候选模块 **0.2.38** 要求正式 **Calcit 0.31.0**；下游同步 deps.cirru 的精确工具链声明并
保留 Caps strict。本库仅运行 native，没有 npm runtime / JS/WASM 配对，不部署业务应用。
候选号不等于已发布版本。

Snapshot 与已发布 **0.2.37** 相同，监听地址、消息、发送结果、指标、受检 Unit、背压及
取消清理合同不变。默认地址仍为 `0.0.0.0`，本地验收必须显式传入 loopback。
实现提供普通 `ws://` 监听，不自带 TLS；模块名不代表新增 `wss://` 能力。

消费者原生构建现在从第一步使用 `cargo build --release --locked`，锁文件不匹配时直接失败，
不在安装时自动改锁；需要更新锁时应在源码中审阅提交。原平台产物复制规则保留，不再清空整个
dylibs 目录；CI 直接运行原 build.sh，减少重复构建/复制步骤，关联 [#65](https://github.com/calcit-lang/calcit-wss/issues/65)。
本 PR 不自动删除下游手动构建步骤，消费者仍需独立验收。Cargo crate保持0.2.36，不发布crates.io包。

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

### 选择监听地址

`wss-serve!` 保留原来的两个参数：`Map<Tag,Number>` 选项与 `WssEvent -> Unit`
回调；可在后面增加一个 String IP 地址，不需要扩大 options 的类型：

```cirru.no-check
wss.core/wss-serve!
  {} $ :port 9000
  , on-message! |127.0.0.1
```

显式 `127.0.0.1` 只监听本机 IPv4；IPv6 可使用 `|::1`，由操作系统决定是否可用。
地址仅接受 IP 字面量，不能包含端口、URL 或主机名；端口仍由 `:port` 指定。
地址省略时保持原来的 `0.0.0.0`，端口省略时仍为 `9001`。多余地址及非法地址会被拒绝，
不启动监听器；非 String 地址由类型检查拒绝。异步事件、发送、背压与取消清理顺序不变。
本地测试和验收应显式使用 loopback，不能把默认监听地址当作本机隔离保证。

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
calcit calcit.cirru ffi export --format json --ns wss.core
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

本轮工具链使用正式 Calcit 0.31.0；监听地址能力不依赖本轮升级。连接、发送、背压、
取消顺序和 `wss-each!` 的受检 Unit 启动结果保持不变，不涉及业务部署。

`wss-metrics` 在真实 native 返回处递归检查 `WssMetrics` 及其嵌套字段；原生返回不符合既有契约时立即报错，不只依赖返回类型声明。三个 demo/测试副作用函数在原有操作后实际返回声明的 Unit。

现有 native 协议返回 Struct，而 `decode-map-as` 不接受 Struct。指标边界保留协议，使用 `format-cirru-edn` 与 `parse-cirru-edn-as` 做具名递归解码，因此每次诊断快照增加一次序列化/解析成本；未在消息发送热路径加入这项操作。

本仓库候选配对正式 Calcit 0.31.0、WSS 0.2.38、Caps 0.1.1，使用 stable Rust 和已提交的 Cargo.lock。
Snapshot、Rust、Cargo 依赖/lock 与 ABI/protocol 不变。正式配对保留全部 19 定义、
7 项附带测试、Rust 14 项及原真实回环 WS 集成门禁；验收以本次精确提交的 Linux CI 为准。
消费者发布说明需结合精确模块tag，而非仅凭主线版本声明。
模块自身的验证不代表所有消费者都已完成严格迁移。
先执行 `caps --strict --ci`、`caps verify --toolchain`，再执行两个 native entry
的 `--check-only`；`demo` 只做静态检查，不以启动长期监听器作为构建门禁。
公开门禁覆盖全部四个命名空间（19 个定义），保留默认严格类型检查，
使用当前 weak-types 视图报告类型覆盖和债务。旧 quality 门禁通过后退役；
CI 不再预览 proof/fix 规则，也不通过新增改写规则或放宽 baseline 来迁移。
原有 Rust 生命周期、背压测试与真实连接/发送/取消 smoke 继续由 CI 执行。
`wss-each!` 的 definition `:tests` 覆盖空客户端和 checked Unit 正反例，
CI 在复制真实 dylib 后执行 `calcit test 'wss.core/wss-each!' --require-match`。
真实 WebSocket smoke 另验证非空客户端 id、一次回调及实际启动结果为 Unit，
拒绝参数或返回类型错误的回调，并验证回调抛错后仍报告错误且能取消、关闭连接。
故意抛错场景要求 host 退出 1 并报告对应 callback error；
正常连接场景仍要求退出 0，不把异步失败吞掉。
这是 native 模块，没有前端部署资源，不新增 COS/CDN 配置。

本模块通过自身门禁不表示下游应用已完成迁移或部署；消费者仍需安装明确的正式模块版本，
使用匹配的 CLI/runtime 重跑严格检查与真实业务验收。

CI 的 Actions 使用正式标签；Calcit 工具链从 deps.cirru 选择上述正式版本。标签可移动的供应链
风险仍然存在；只读权限和不保留 checkout 凭据并不等同于不可变版本。

For task lifecycle, backpressure, metrics, and revision-aware resync guidance,
use `calcit docs read "Bounded WebSocket servers" --module calcit-wss` after
the module is installed.

Run buildin demo with:

```bash
calcit calcit.cirru --entry demo
```

### Workflow

https://github.com/calcit-lang/dylib-workflow

### License

MIT
