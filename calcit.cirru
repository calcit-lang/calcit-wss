
{} (:about "|Machine-generated snapshot. Do not edit directly — changes will be overwritten. Use `calcit query` to inspect and `calcit edit`/`calcit tree` to modify. Run `calcit docs agents --full` first. Manual edits must follow format and schema conventions, then run `calcit edit format`.") (:package |wss)
  :entries $ {}
    :default $ {} (:description |) (:init-fn 'wss.test/main!) (:mode :native) (:reload-fn 'wss.test/reload!)
      :feature-policy $ {}
      :modules $ []
      :type-slots $ {}
    :demo $ {} (:description |) (:init-fn 'wss.test/demo!) (:mode :native) (:reload-fn 'wss.test/reload!)
      :feature-policy $ {}
      :modules $ []
      :type-slots $ {}
  :files $ {}
    'wss.core $ %{} 'FileEntry
      :defs $ {}
        'WssClientMetrics $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defstruct WssClientMetrics (:client-id 'Number) (:queue-depth 'Number) (:queue-bytes 'Number) (:oldest-age-ms 'Number)
          :examples $ []
          :schema $ :: 'StructDef
        'WssDisconnectMetrics $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defstruct WssDisconnectMetrics (:peer-closed 'Number) (:server-cancelled 'Number) (:local-close 'Number) (:command-channel-closed 'Number) (:read-failed 'Number) (:write-failed 'Number)
          :examples $ []
          :schema $ :: 'StructDef
        'WssEvent $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defenum WssEvent (:connect 'Number) (:disconnect 'Number) (:message 'Number 'String) (:blob 'Number 'Buffer)
          :examples $ []
          :schema $ :: 'EnumDef
        'WssMetrics $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defstruct WssMetrics
              :clients $ :: 'List 'WssClientMetrics
              :send-outcomes 'WssSendMetrics
              :disconnect-reasons 'WssDisconnectMetrics
          :examples $ []
          :schema $ :: 'StructDef
        'WssSendMetrics $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defstruct WssSendMetrics (:accepted 'Number) (:backpressured 'Number) (:too-large 'Number) (:closed 'Number)
          :examples $ []
          :schema $ :: 'StructDef
        'WssSendOutcome $ %{} 'CodeEntry (:doc "|Outbound send result: accepted, backpressured, too-large, or closed.")
          :code $ quote
            defenum WssSendOutcome (:accepted) (:backpressured) (:too-large) (:closed)
          :examples $ []
          :schema $ :: 'EnumDef
        'wss-each! $ %{} 'CodeEntry (:doc "|Iterate over a stable snapshot of connected clients. Args: callback (fn (client-id) -> Unit). Returns Unit after all queued callbacks complete.")
          :code $ quote
            defn wss-each! (cb)
              &call-dylib-edn-fn (get-dylib-path |/dylibs/libcalcit_wss) |wss_each cb
          :examples $ []
          :ffi $ {} (:backend :native) (:invoke :blocking-callback) (:kind :callback-iteration) (:symbol |wss_each) (:transport :blocking-host-v1)
          :schema $ :: 'Fn
            {} (:return 'Unit)
              :args $ []
                :: 'Fn $ {} (:return 'Unit)
                  :args $ [] 'Number
        'wss-metrics $ %{} 'CodeEntry (:doc "|Return a typed process-lifetime metrics snapshot with live per-client queue depth, bytes, oldest age, send outcomes, and disconnect reasons.")
          :code $ quote
            defn wss-metrics () $ &call-dylib-edn (get-dylib-path |/dylibs/libcalcit_wss) |wss_metrics
          :examples $ []
          :ffi $ {} (:backend :native) (:invoke :sync) (:kind :dylib-method) (:symbol |wss_metrics) (:transport :edn-buffer-v1)
          :schema $ :: 'Fn
            {} (:return 'wss.core/WssMetrics)
              :args $ []
        'wss-send! $ %{} 'CodeEntry (:doc "|Try to enqueue a text message for one WebSocket client. Returns WssSendOutcome; backpressured and too-large are normal flow-control results.")
          :code $ quote
            defn wss-send! (client message)
              let
                  outcome $ &call-dylib-edn (get-dylib-path |/dylibs/libcalcit_wss) |wss_send client message
                match outcome
                  (:accepted) (%:: WssSendOutcome :accepted)
                  (:backpressured) (%:: WssSendOutcome :backpressured)
                  (:too-large) (%:: WssSendOutcome :too-large)
                  (:closed) (%:: WssSendOutcome :closed)
                  _ $ raise (str |unexpected-wss-send-outcome: outcome)
          :examples $ []
          :ffi $ {} (:backend :native) (:invoke :sync) (:kind :dylib-method) (:symbol |wss_send) (:transport :edn-buffer-v1)
          :schema $ :: 'Fn
            {} (:return 'wss.core/WssSendOutcome)
              :args $ [] 'Number 'String
        'wss-serve! $ %{} 'CodeEntry (:doc "|Start a cancellable native WebSocket server. Args: options map and callback receiving connect/disconnect/message/blob events. Returns FfiTask; cancel it with .cancel or .cancel-with.")
          :code $ quote
            defn wss-serve! (options cb)
              ffi:task $ &call-dylib-edn-fn (get-dylib-path |/dylibs/libcalcit_wss) |wss_serve options cb
          :examples $ []
          :ffi $ {} (:backend :native) (:invoke :async) (:kind :async-stream) (:symbol |wss_serve) (:transport :async-task-v1)
            :stream $ {} (:callback-parameter 1) (:cancel :cooperative) (:event 'wss.core/WssEvent) (:task-result :own)
          :schema $ :: 'Fn
            {} (:return 'FfiTask)
              :args $ [] (:: 'Map 'Tag 'Number)
                :: 'Fn $ {} (:return 'Unit)
                  :args $ [] 'wss.core/WssEvent
      :ns $ %{} 'NsEntry (:doc |)
        :code $ quote
          ns wss.core $ :require
            wss.$meta :refer $ calcit-dirname
            wss.util :refer $ get-dylib-path
    'wss.test $ %{} 'FileEntry
      :defs $ {}
        'demo! $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn demo! ()
              wss-serve!
                {} $ :port 9001
                fn (income) (println income)
                  wss-each! $ fn (id)
                    wss-send! id $ str "|hello from: " income
              println "|demo started"
          :examples $ []
          :schema $ :: 'Fn
            {} (:return 'Unit)
              :args $ []
        'main! $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn main! () $ run-tests
          :examples $ []
          :schema $ :: 'Fn
            {} (:return 'Unit)
              :args $ []
        'reload! $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn reload! () $ println "|did nothing on reload"
          :examples $ []
          :schema $ :: 'Fn
            {} (:return 'Unit)
              :args $ []
        'run-tests $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn run-tests () (println "|%%%% test for lib") (println calcit-filename calcit-dirname)
          :examples $ []
          :schema $ :: 'Fn
            {} (:return 'Unit)
              :args $ []
      :ns $ %{} 'NsEntry (:doc |)
        :code $ quote
          ns wss.test $ :require
            wss.core :refer $ wss-serve! wss-each! wss-send!
            wss.$meta :refer $ calcit-dirname calcit-filename
    'wss.util $ %{} 'FileEntry
      :defs $ {}
        'get-dylib-ext $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defmacro get-dylib-ext () $ case-default (&get-os) |.so (:macos |.dylib) (:windows |.dll)
          :examples $ []
          :schema $ :: 'Macro
            {}
              :capabilities $ #{} :platform-read
              :expansion $ :: 'Expr 'String
              :required $ []
        'get-dylib-path $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn get-dylib-path (p)
              str (or-current-path calcit-dirname) p $ get-dylib-ext
          :examples $ []
          :schema $ :: 'Fn
            {} (:return 'String)
              :args $ [] 'String
        'or-current-path $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn or-current-path (p)
              if (blank? p) |. p
          :examples $ []
          :schema $ :: 'Fn
            {} (:return 'String)
              :args $ [] 'String
      :ns $ %{} 'NsEntry (:doc |)
        :code $ quote
          ns wss.util $ :require
            wss.$meta :refer $ calcit-dirname calcit-filename
