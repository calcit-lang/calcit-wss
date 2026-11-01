
{}
  :about "|Machine-generated snapshot. Do not edit directly — changes will be overwritten. Use `calcit query` to inspect and `calcit edit`/`calcit tree` to modify. Run `calcit docs agents --contract` before mutations; use `--full` for first orientation or changed contract digest. Manual edits must follow format and schema conventions, then run `calcit edit format`."
  :package |wss
  :entries $ {}
    :default $ {} (:description |) (:init-fn 'wss.test/main!) (:mode :native) (:reload-fn 'wss.test/reload!) (:target :native)
      :feature-policy $ {}
      :modules $ []
      :type-slots $ {}
    :demo $ {} (:description |) (:init-fn 'wss.test/demo!) (:mode :native) (:reload-fn 'wss.test/reload!) (:target :native)
      :feature-policy $ {}
      :modules $ []
      :type-slots $ {}
  :files $ {}
    'wss.core $ %{} 'FileEntry
      :defs $ {}
        'WssClientMetrics $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defstruct WssClientMetrics (:client-id Number) (:queue-depth Number) (:queue-bytes Number) (:oldest-age-ms Number)
          :examples $ []
          :schema $ quote StructDef
        'WssDisconnectMetrics $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defstruct WssDisconnectMetrics (:peer-closed Number) (:server-cancelled Number) (:local-close Number) (:command-channel-closed Number) (:read-failed Number) (:write-failed Number)
          :examples $ []
          :schema $ quote StructDef
        'WssEvent $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defenum WssEvent (:connect Number) (:disconnect Number) (:message Number String) (:blob Number Buffer)
          :examples $ []
          :schema $ quote EnumDef
        'WssMetrics $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defstruct WssMetrics
            :clients $ quote $ List WssClientMetrics
            :send-outcomes WssSendMetrics
            :disconnect-reasons WssDisconnectMetrics
          :examples $ []
          :schema $ quote StructDef
        'WssSendMetrics $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defstruct WssSendMetrics (:accepted Number) (:backpressured Number) (:too-large Number) (:closed Number)
          :examples $ []
          :schema $ quote StructDef
        'WssSendOutcome $ %{} 'CodeEntry
          :doc "|Outbound send result: accepted, backpressured, too-large, or closed."
          :code $ quote $ defenum WssSendOutcome (:accepted) (:backpressured) (:too-large) (:closed)
          :examples $ []
          :schema $ quote EnumDef
        'wss-each! $ %{} 'CodeEntry
          :doc "|遍历调用时已连接客户端的稳定快照。callback: Number -> Unit。实际 host 启动结果经运行时检查为 Unit 后返回；Unit 表示 one-shot 排队已启动，不表示回调已执行完成。回调随后通过 async-task-v1 host 队列执行，每个快照 id 一次；本迭代不提供取消句柄。"
          :code $ quote $ defn wss-each! (cb)
            decode-map-as
              &call-dylib-edn-fn (get-dylib-path |/dylibs/libcalcit_wss) |wss_each cb
              , 'Unit
          :examples $ []
          :ffi $ {} (:backend :native) (:invoke :async) (:symbol |wss_each) (:transport :async-task-v1)
          :schema $ quote $ Fn
            Fn Number $ -> Unit
            -> Unit
          :tests $ []
            %{} 'TestEntry (:name |empty-client-unit)
              :code $ quote $ assert= &unit
                wss-each! $ fn (client-id)
                  hint-fn $ Fn Number $ -> Unit
                  raise |unexpected-client-in-empty-snapshot
              :tags $ #{} :ffi :native
            %{} 'TestEntry (:name |checked-unit-preserves-value)
              :code $ quote $ assert= &unit (decode-map-as &unit 'Unit)
              :tags $ #{} :ffi :native
            %{} 'TestEntry (:name |checked-unit-rejects-nil)
              :code $ quote $ assert= true
                try
                  do (decode-map-as nil 'Unit) false
                  fn (message)
                    hint-fn $ Fn String $ -> Bool
                    .includes? message "|decode-map-as failed at $: expected &unit, got nil"
              :tags $ #{} :ffi :native
            %{} 'TestEntry (:name |checked-unit-rejects-number)
              :code $ quote $ assert= true
                try
                  do (decode-map-as 1 'Unit) false
                  fn (message)
                    hint-fn $ Fn String $ -> Bool
                    .includes? message "|decode-map-as failed at $: expected &unit, got number"
              :tags $ #{} :ffi :native
            %{} 'TestEntry (:name |checked-unit-rejects-string)
              :code $ quote $ assert= true
                try
                  do (decode-map-as |wrong 'Unit) false
                  fn (message)
                    hint-fn $ Fn String $ -> Bool
                    .includes? message "|decode-map-as failed at $: expected &unit"
              :tags $ #{} :ffi :native
        'wss-metrics $ %{} 'CodeEntry
          :doc "|Return a typed process-lifetime metrics snapshot with live per-client queue depth, bytes, oldest age, send outcomes, and disconnect reasons."
          :code $ quote $ defn wss-metrics ()
            parse-cirru-edn-as
              format-cirru-edn $ &call-dylib-edn (get-dylib-path |/dylibs/libcalcit_wss) |wss_metrics
              , 'WssMetrics
          :examples $ []
          :ffi $ {} (:backend :native) (:invoke :sync) (:symbol |wss_metrics) (:transport :edn-buffer-v1)
          :schema $ quote $ Fn (-> wss.core/WssMetrics)
        'wss-send! $ %{} 'CodeEntry
          :doc "|Try to enqueue a text message for one WebSocket client. Returns WssSendOutcome; backpressured and too-large are normal flow-control results."
          :code $ quote $ defn wss-send! (client message)
            let
                outcome $ &call-dylib-edn (get-dylib-path |/dylibs/libcalcit_wss) |wss_send client message
              match outcome
                (:accepted) (WssSendOutcome :accepted)
                (:backpressured) (WssSendOutcome :backpressured)
                (:too-large) (WssSendOutcome :too-large)
                (:closed) (WssSendOutcome :closed)
                _ $ raise $ str |unexpected-wss-send-outcome: outcome
          :examples $ []
          :ffi $ {} (:backend :native) (:invoke :sync) (:symbol |wss_send) (:transport :edn-buffer-v1)
          :schema $ quote $ Fn Number String (-> wss.core/WssSendOutcome)
        'wss-serve! $ %{} 'CodeEntry
          :doc "|启动可取消的原生 WebSocket 服务；参数为 Map<Tag,Number> 选项、WssEvent -> Unit 回调，以及可省略的一个 String IP 地址。省略地址仍监听 0.0.0.0，端口默认 9001；显式使用 127.0.0.1 可限制为本机。仅接受 IPv4/IPv6 字面量，不解析域名、URL 或带端口文本。返回 FfiTask；通过 .cancel! / .cancel-with! 停止并清理连接。"
          :code $ quote $ defn wss-serve! (options cb & bind-addresses)
            if
              > (.len bind-addresses) 1
              raise |Expected-at-most-one-WebSocket-bind-address
              , &unit
            match (first bind-addresses)
              (:none)
                ffi:task $ &call-dylib-edn-fn (get-dylib-path |/dylibs/libcalcit_wss) |wss_serve options cb
              (:some address)
                ffi:task $ &call-dylib-edn-fn (get-dylib-path |/dylibs/libcalcit_wss) |wss_serve options address cb
          :examples $ []
          :ffi $ {} (:backend :native) (:invoke :async) (:symbol |wss_serve) (:transport :async-task-v1)
          :schema $ quote $ Fn (Map Tag Number)
            Fn wss.core/WssEvent $ -> Unit
            , & String (-> calcit.core/FfiTask)
          :tests $ []
            %{} 'TestEntry (:name |rejects-extra-bind-addresses)
              :code $ quote $ assert= true
                try
                  do
                    wss-serve! ({})
                      fn (event) &unit
                      , |127.0.0.1 |::1
                    , false
                  fn (message) (= message |Expected-at-most-one-WebSocket-bind-address)
              :tags $ #{} :bind-address :native
            %{} 'TestEntry (:name |rejects-non-ip-bind-address-before-listening)
              :code $ quote $ let
                  rejects? $ fn (address)
                    try
                      do
                        wss-serve! ({})
                          fn (event) &unit
                          , address
                        , false
                      fn (message)
                        and (.includes? message |wss_serve_calcit_ffi_async_v1) (ends-with? message "|failed to start with status 8")
                assert= true $ rejects? |localhost
                assert= true $ rejects? |127.0.0.1:9001
              :tags $ #{} :bind-address :native
      :ns $ %{} 'NsEntry (:doc |)
        :code $ quote $ ns wss.core
          :require
            wss.$meta :refer $ calcit-dirname
            wss.util :refer $ get-dylib-path
    'wss.test $ %{} 'FileEntry
      :defs $ {}
        'demo! $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defn demo! ()
            wss-serve!
              {} $ :port 9001
              fn (income) (println income)
                wss-each! $ fn (id)
                  wss-send! id $ str "|hello from: " income
                  , &unit
            println "|demo started"
            , &unit
          :examples $ []
          :schema $ quote $ Fn (-> Unit)
        'main! $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defn main! () (run-tests)
          :examples $ []
          :schema $ quote $ Fn (-> Unit)
        'reload! $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defn reload! () (println "|did nothing on reload") &unit
          :examples $ []
          :schema $ quote $ Fn (-> Unit)
        'run-tests $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defn run-tests () (println "|%%%% test for lib") (println calcit-filename calcit-dirname) &unit
          :examples $ []
          :schema $ quote $ Fn (-> Unit)
      :ns $ %{} 'NsEntry (:doc |)
        :code $ quote $ ns wss.test
          :require
            wss.core :refer $ wss-serve! wss-each! wss-send!
            wss.$meta :refer $ calcit-dirname calcit-filename
    'wss.util $ %{} 'FileEntry
      :defs $ {}
        'get-dylib-ext $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defmacro get-dylib-ext ()
            match (&get-os) (:macos |.dylib) (:windows |.dll) (_ |.so)
          :examples $ []
          :schema $ quote $ Macro
            -> $ Expr String
            :capabilities :platform-read
        'get-dylib-path $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defn get-dylib-path (p)
            str (or-current-path calcit-dirname) p $ get-dylib-ext
          :examples $ []
          :schema $ quote $ Fn String (-> String)
        'or-current-path $ %{} 'CodeEntry (:doc |)
          :code $ quote $ defn or-current-path (p)
            if (blank? p) |. p
          :examples $ []
          :schema $ quote $ Fn String (-> String)
      :ns $ %{} 'NsEntry (:doc |)
        :code $ quote $ ns wss.util
          :require $ wss.$meta :refer $ calcit-dirname calcit-filename
