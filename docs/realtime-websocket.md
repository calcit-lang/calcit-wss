---
title: "Bounded WebSocket servers"
summary: "Use Calcit WSS tasks, send outcomes, metrics, cancellation, and revision-aware resync for realtime applications"
scope: "module"
kind: "guide"
category: "ecosystem"
aliases:
  - "WebSocket"
  - "wss-serve"
  - "backpressured"
  - "send outcome"
  - "wss metrics"
  - "cancel websocket"
  - "revision ack resync"
entry_for:
  - "wss.core/wss-serve!"
  - "wss.core/wss-send!"
  - "wss.core/wss-metrics"
---

# Bounded WebSocket servers

`calcit-wss` provides a native WebSocket listener as a cancellable `FfiTask`. It transports messages and reports bounded send outcomes; application state, projections, revisions, acknowledgements, and resync policy remain in the workflow layer.

## Start and stop a listener

```cirru.no-check
def server-task $ wss.core/wss-serve!
  {} (:port 9000)
  fn (message)
    handle-message! message

server-task.cancel-with :shutdown
```

Cancel only when the application can stop accepting work. Terminal completion means the listener, connection workers, and registry have been cleaned up.

## Send outcomes are flow control

`wss-send!` returns `(:accepted)`, `(:backpressured)`, `(:too-large)`, or `(:closed)`. These are normal outcomes, not exceptions. Do not retry an arbitrary stale patch queue when a client is backpressured; retain the client acknowledgement and recompute a patch or send a snapshot from the authoritative projection.

Use `wss-metrics` for observability: queue depth, queued bytes, oldest message age, and cumulative outcomes help distinguish slow peers from application-level convergence bugs.

## Realtime protocol boundary

- Send typed operation/message envelopes from the application.
- Advance a peer's acknowledged revision only after its acknowledgement arrives.
- On a missing revision chain or `:backpressured`, schedule a bounded resync snapshot.
- Keep outbound payloads derived from the latest session-filtered projection.
- Never use queue depth as proof that a peer applied a patch.

Use `calcit docs search backpressured --module calcit-wss` or `calcit docs read "Bounded WebSocket servers" --module calcit-wss` after installation.
