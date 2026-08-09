
{} (:about "|Machine-generated snapshot. Do not edit directly — changes will be overwritten. Use `cr query` to inspect and `cr edit`/`cr tree` to modify. Run `cr docs agents --full` first. Manual edits must follow format and schema conventions, then run `cr edit format`.") (:package |wss) (:version |0.2.7)
  :entries $ {}
    :default $ {} (:description |) (:init-fn 'wss.test/main!) (:mode :native) (:reload-fn 'wss.test/reload!)
      :modules $ []
      :type-slots $ {}
    :demo $ {} (:description |) (:init-fn 'wss.test/demo!) (:mode :native) (:reload-fn 'wss.test/reload!)
      :modules $ []
      :type-slots $ {}
  :files $ {}
    |wss.core $ %{} 'FileEntry
      :defs $ {}
        |wss-each! $ %{} 'CodeEntry (:doc "|Iterate over connected clients. Args: callback (fn (client-id)). Example: (wss-each! (fn (id) (wss-send! id \"Hello!\")))")
          :code $ quote
            defn wss-each! (cb)
              &call-dylib-edn-fn (get-dylib-path |/dylibs/libcalcit_wss) |wss_each cb
          :examples $ []
          :schema $ :: 'Dynamic
        |wss-send! $ %{} 'CodeEntry (:doc "|Send a message to a WebSocket client. Args: id (string/number), message (any). Example: (wss-send! 123 \"Hello!\")")
          :code $ quote
            defn wss-send! (client message)
              &call-dylib-edn (get-dylib-path |/dylibs/libcalcit_wss) |wss_send client message
          :examples $ []
          :schema $ :: 'Dynamic
        |wss-serve! $ %{} 'CodeEntry (:doc "|Start a WebSocket server. Args: options (map), callback function (fn (income-data)). Example: (wss-serve! {:port 9001} (fn (income) (println income)))")
          :code $ quote
            defn wss-serve! (options cb)
              &call-dylib-edn-fn (get-dylib-path |/dylibs/libcalcit_wss) |wss_serve options cb
          :examples $ []
          :schema $ :: 'Dynamic
      :ns $ %{} 'NsEntry (:doc |)
        :code $ quote
          ns wss.core $ :require
            wss.$meta :refer $ calcit-dirname
            wss.util :refer $ get-dylib-path
    |wss.test $ %{} 'FileEntry
      :defs $ {}
        |demo! $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn demo! ()
              wss-serve!
                {} $ :port 9001
                fn (income) (println income)
                  wss-each! $ fn (id)
                    wss-send! id $ str "|hello from: " income
              println "|demo started"
          :examples $ []
          :schema $ :: 'Dynamic
        |main! $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn main! () $ run-tests
          :examples $ []
          :schema $ :: 'Dynamic
        |reload! $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn reload! () $ println "|did nothing on reload"
          :examples $ []
          :schema $ :: 'Dynamic
        |run-tests $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn run-tests () (println "|%%%% test for lib") (println calcit-filename calcit-dirname)
          :examples $ []
          :schema $ :: 'Dynamic
      :ns $ %{} 'NsEntry (:doc |)
        :code $ quote
          ns wss.test $ :require
            wss.core :refer $ wss-serve! wss-each! wss-send!
            wss.$meta :refer $ calcit-dirname calcit-filename
    |wss.util $ %{} 'FileEntry
      :defs $ {}
        |get-dylib-ext $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defmacro get-dylib-ext () $ case-default (&get-os) |.so (:macos |.dylib) (:windows |.dll)
          :examples $ []
          :schema $ :: 'Dynamic
        |get-dylib-path $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn get-dylib-path (p)
              str (or-current-path calcit-dirname) p $ get-dylib-ext
          :examples $ []
          :schema $ :: 'Dynamic
        |or-current-path $ %{} 'CodeEntry (:doc |)
          :code $ quote
            defn or-current-path (p)
              if (blank? p) |. p
          :examples $ []
          :schema $ :: 'Dynamic
      :ns $ %{} 'NsEntry (:doc |)
        :code $ quote
          ns wss.util $ :require
            wss.$meta :refer $ calcit-dirname calcit-filename
