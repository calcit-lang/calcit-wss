#!/usr/bin/env bash

set -euo pipefail

smoke_dir="$(mktemp -d)"
smoke_log="$smoke_dir/calcit-wss-server.log"
server_pid=""

cleanup() {
  if [[ -n "$server_pid" ]] && kill -0 "$server_pid" 2>/dev/null; then
    kill "$server_pid" 2>/dev/null || true
    wait "$server_pid" 2>/dev/null || true
  fi
  rm -rf "$smoke_dir"
}
trap cleanup EXIT

calcit calcit.cirru eval --dep ./ -- 'ns app.main $ :require
  wss.core :refer $ wss-serve! wss-each! wss-send!

let
    task-ref $ atom &unit
    task $ wss-serve!
      {} (:port 19001)
      fn (event)
        tag-match event
          (:message client-id text)
            wss-each! $ fn (connected-id)
              tag-match (wss-send! connected-id |from-calcit)
                (:accepted) (.cancel-with (deref task-ref) :smoke-complete)
                _ $ raise |unexpected-send-outcome
          _ &unit
  reset! task-ref task
  , task' >"$smoke_log" 2>&1 &
server_pid="$!"

server_ready=""
for _ in {1..100}; do
  if grep -q 'WebSocket server started at port 19001' "$smoke_log"; then
    server_ready=1
    break
  fi
  if ! kill -0 "$server_pid" 2>/dev/null; then
    cat "$smoke_log"
    echo "Calcit WebSocket server exited before listening" >&2
    exit 1
  fi
  sleep 0.05
done

if [[ -z "$server_ready" ]]; then
  cat "$smoke_log"
  echo "Calcit WebSocket server did not start listening in time" >&2
  exit 1
fi

cargo run --quiet --example smoke_client -- 19001

for _ in {1..100}; do
  if ! kill -0 "$server_pid" 2>/dev/null; then
    break
  fi
  sleep 0.05
done

if kill -0 "$server_pid" 2>/dev/null; then
  cat "$smoke_log"
  echo "Calcit host did not exit after WebSocket cancellation" >&2
  exit 1
fi

if ! wait "$server_pid"; then
  cat "$smoke_log"
  echo "Calcit WebSocket smoke exited unsuccessfully" >&2
  exit 1
fi
server_pid=""

if grep -q '\[Error\]' "$smoke_log"; then
  cat "$smoke_log"
  echo "Calcit WebSocket smoke reported an async FFI error" >&2
  exit 1
fi

cat "$smoke_log"
