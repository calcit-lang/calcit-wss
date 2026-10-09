#!/usr/bin/env bash

set -euo pipefail

smoke_dir="$(mktemp -d)"
smoke_log="$smoke_dir/calcit-wss-server.log"
server_pid=""
calcit_bin="${CALCIT_BIN:-calcit}"

cleanup() {
  if [[ -n "$server_pid" ]] && kill -0 "$server_pid" 2>/dev/null; then
    kill "$server_pid" 2>/dev/null || true
    wait "$server_pid" 2>/dev/null || true
  fi
  rm -rf "$smoke_dir"
}
trap cleanup EXIT

for callback_type in String Number; do
  if [[ "$callback_type" == String ]]; then
    callback='fn (id)
  hint-fn $ {} (:args $ [] '"'"'String) (:return '"'"'Unit)
  , &unit'
  else
    callback='fn (id)
  hint-fn $ {} (:args $ [] '"'"'Number) (:return '"'"'Number)
  , 1'
  fi
  if "$calcit_bin" calcit.cirru eval --dep ./ -- "ns app.main \$ :require
  wss.core :refer \$ wss-each!
wss-each! \$ $callback" >"$smoke_dir/wrong-$callback_type.log" 2>&1; then
    echo "Calcit accepted an invalid iteration callback: $callback_type" >&2
    exit 1
  fi
  grep -q 'W_FN_ARG_TYPE_MISMATCH' "$smoke_dir/wrong-$callback_type.log"
done

if "$calcit_bin" calcit.cirru eval --dep ./ -- 'ns app.main $ :require
  wss.util :refer $ get-dylib-path
&call-dylib-edn (get-dylib-path |/dylibs/libcalcit_wss) |wss_each' >"$smoke_dir/wrong-abi.log" 2>&1; then
  echo "Calcit accepted the callback export as a synchronous buffer method" >&2
  exit 1
fi
grep -q 'wss_each_calcit_ffi_v1' "$smoke_dir/wrong-abi.log"

"$calcit_bin" calcit.cirru eval --dep ./ -- 'ns app.main $ :require
  wss.core :refer $ wss-serve! wss-each! wss-send! wss-metrics

let
    task-ref $ ref $ assert-type (Option :none) $ :: '"'"'Option '"'"'FfiTask
    each-count $ ref 0
    task $ wss-serve!
      {} (:port 19001)
      fn (event)
        match event
          (:message client-id text)
            do
              assert= &unit $ wss-each! $ fn (connected-id)
                assert= client-id connected-id
                assert= 0 $ deref each-count
                reset! each-count 1
                match (wss-send! connected-id |from-calcit)
                  (:accepted)
                    do
                      println $ wss-metrics
                      println |checked-each-callback-once
                      let
                          task-option $ deref task-ref
                        if (task-option .some?)
                          .cancel-with! (task-option .unwrap) :smoke-complete
                          raise |missing-wss-task
                  _ $ raise |unexpected-send-outcome
              assert= 0 $ deref each-count
              println |checked-each-start-before-callback
              , &unit
          _ &unit
  reset! task-ref $ Option :some task
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

cargo run --locked --quiet --example smoke_client -- 19001

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

if ! grep -q 'WssMetrics' "$smoke_log" || ! grep -q 'checked-each-callback-once' "$smoke_log" || ! grep -q 'checked-each-start-before-callback' "$smoke_log"; then
  cat "$smoke_log"
  echo "Calcit WebSocket smoke did not complete metrics and checked iteration" >&2
  exit 1
fi

cat "$smoke_log"

smoke_log="$smoke_dir/calcit-wss-callback-error.log"
"$calcit_bin" calcit.cirru eval --dep ./ -- 'ns app.main $ :require
  wss.core :refer $ wss-serve! wss-each!
let
    task-ref $ ref $ assert-type (Option :none) $ :: '"'"'Option '"'"'FfiTask
    task $ wss-serve!
      {} (:port 19002)
      fn (event)
        match event
          (:message client-id text)
            wss-each! $ fn (connected-id)
              assert= client-id connected-id
              .cancel-with! ((deref task-ref) .unwrap) :callback-error-smoke
              raise |checked-each-callback-error
          _ &unit
  reset! task-ref $ Option :some task
  , task' >"$smoke_log" 2>&1 &
server_pid="$!"

server_ready=""
for _ in {1..100}; do
  if grep -q 'WebSocket server started at port 19002' "$smoke_log"; then
    server_ready=1
    break
  fi
  if ! kill -0 "$server_pid" 2>/dev/null; then
    cat "$smoke_log"
    echo "Callback error smoke exited before listening" >&2
    exit 1
  fi
  sleep 0.05
done
if [[ -z "$server_ready" ]]; then
  cat "$smoke_log"
  echo "Callback error smoke did not start listening in time" >&2
  exit 1
fi

cargo run --locked --quiet --example smoke_client -- 19002 --expect-close
for _ in {1..100}; do
  if ! kill -0 "$server_pid" 2>/dev/null; then
    break
  fi
  sleep 0.05
done
if kill -0 "$server_pid" 2>/dev/null; then
  cat "$smoke_log"
  echo "Callback error smoke did not release the server" >&2
  exit 1
fi
if ! wait "$server_pid"; then
  cat "$smoke_log"
  echo "Callback error smoke host exited unsuccessfully" >&2
  exit 1
fi
server_pid=""
grep -q '\[Error\].*checked-each-callback-error' "$smoke_log"
cat "$smoke_log"
