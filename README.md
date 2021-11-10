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

Install to `~/.config/calcit/modules/`, compile and provide `*.{dylib,so}` file with `./build.sh`.

### Develop

Run buildin demo with:

```bash
cr -1 --init-fn wss.test/demo!
```

### Workflow

https://github.com/calcit-lang/dylib-workflow

### License

MIT
