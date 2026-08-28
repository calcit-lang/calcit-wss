## (TODO) WebSocket Server binding

> Rust library for Calcit runtime.

### Usages

currently 3 APIs are provided:

```cirru
wss.core/wss-serve!
  {} (:port 9000)
  fn (income)
    println income

    wss.core/wss-each! $ fn (id)
      wss.core/wss-send! id $ str "\"hello from: " income
```

`wss-serve!` returns a typed `FfiTask`. Stop the listener and all connection
workers with `.cancel` or `.cancel-with`; terminal completion is emitted
only after native resources are released. `wss-send!` accepts a non-negative
safe-integer client id and a string message. `wss-each!` iterates over a stable
snapshot of currently connected client ids.

Maintainers can run `bash scripts/check-wss-ffi.sh` after copying the release
dylib into `dylibs/`; it requires connect, inbound message, buffer-v1 send,
task cancellation, and clean host exit to all succeed.

### 共享 FFI 基础层 / Shared FFI foundation

本模块使用 [`calcit_native_ffi`](https://github.com/calcit-lang/calcit-native-ffi)
维护 C-safe descriptors、buffer ownership、Cirru EDN adapter 与 backpressure
transport。WebSocket client registry、连接 worker 和取消/terminal 顺序仍由本仓库维护。

This module uses
[`calcit_native_ffi`](https://github.com/calcit-lang/calcit-native-ffi) for
C-safe descriptors, buffer ownership, Cirru EDN adapters, and backpressure
transport. The WebSocket client registry, connection workers, and
cancellation/terminal ordering remain owned by this repository.

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

Run buildin demo with:

```bash
calcit calcit.cirru --init-fn wss.test/demo!
```

### Workflow

https://github.com/calcit-lang/dylib-workflow

### License

MIT
