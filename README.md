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

`wss-serve!` returns an opaque native task capability. Stop the listener and
all connection workers with `&ffi-task-cancel`; terminal completion is emitted
only after native resources are released. `wss-send!` accepts a non-negative
safe-integer client id and a string message. `wss-each!` iterates over a stable
snapshot of currently connected client ids.

Maintainers can run `bash scripts/check-wss-ffi.sh` after copying the release
dylib into `dylibs/`; it requires connect, inbound message, buffer-v1 send,
task cancellation, and clean host exit to all succeed.

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
