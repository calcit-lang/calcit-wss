# 可选监听地址与类型边界

Timegrass 的正式工具链验收需要启动本机 WebSocket 服务。原实现固定绑定
`0.0.0.0`，维护者选择新增可选地址后发版，不授权用全网卡监听代替本机验收。

沿用 `wss-serve!`，原 `Map<Tag,Number>` 与 callback 两参数调用保持不变。
新增第三个 String IP 字面量。Calcit 使用 String rest 并在函数入口限制最多一个，
避免把异构 options 放宽成 Dynamic，也不增加平行 server 入口或新语言能力。
没有地址时仍走原一项 options 的 native 请求；显式地址才使用两项请求。
native 将 IP 与原端口解析为 `SocketAddr`，不进行 DNS 解析；省略端口仍为 9001，
省略地址仍为 IPv4 wildcard。事件、背压、任务所有权和取消/terminal 顺序不变。

地址文本的解析是 host 边界，Rust 验证 IPv4/IPv6、默认值、非法文本、类型及端口；
用户可见的额外地址拒绝及原生启动失败用 Calcit `:tests` 断言。
原真实 FFI smoke 改为显式 loopback，保留 connect/message/send/metrics/cancel 与
故意 callback 抛错的全部断言；另以静态负例验证非 String 地址被拒。
默认 wildcard 仅做纯解析断言，不为测试打开非 loopback 监听。
