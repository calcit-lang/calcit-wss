
{} (:about "|file is generated - never edit directly; learn cr edit/tree workflows before changing") (:package |wss)
  :configs $ {} (:init-fn |wss.test/main!) (:reload-fn |wss.test/reload!) (:version |0.2.7)
    :modules $ []
  :entries $ {}
    :demo $ {} (:init-fn |wss.test/demo!) (:reload-fn |wss.test/reload!) (:version |0.0.0)
      :modules $ []
  :files $ {}
    |wss.core $ %{} :FileEntry
      :defs $ {}
        |wss-each! $ %{} :CodeEntry (:doc "|Iterate over connected clients. Args: callback (fn (client-id)). Example: (wss-each! (fn (id) (wss-send! id \"Hello!\")))") (:schema nil)
          :code $ quote
            defn wss-each! (cb)
              &call-dylib-edn-fn (get-dylib-path "\"/dylibs/libcalcit_wss") "\"wss_each" cb
          :examples $ []
        |wss-send! $ %{} :CodeEntry (:doc "|Send a message to a WebSocket client. Args: id (string/number), message (any). Example: (wss-send! 123 \"Hello!\")") (:schema nil)
          :code $ quote
            defn wss-send! (client message)
              &call-dylib-edn (get-dylib-path "\"/dylibs/libcalcit_wss") "\"wss_send" client message
          :examples $ []
        |wss-serve! $ %{} :CodeEntry (:doc "|Start a WebSocket server. Args: options (map), callback function (fn (income-data)). Example: (wss-serve! {:port 9001} (fn (income) (println income)))") (:schema nil)
          :code $ quote
            defn wss-serve! (options cb)
              &call-dylib-edn-fn (get-dylib-path "\"/dylibs/libcalcit_wss") "\"wss_serve" options cb
          :examples $ []
      :ns $ %{} :NsEntry (:doc |)
        :code $ quote
          ns wss.core $ :require
            wss.$meta :refer $ calcit-dirname
            wss.util :refer $ get-dylib-path
    |wss.test $ %{} :FileEntry
      :defs $ {}
        |demo! $ %{} :CodeEntry (:doc |) (:schema nil)
          :code $ quote
            defn demo! ()
              wss-serve!
                {} $ :port 9001
                fn (income) (println income)
                  wss-each! $ fn (id)
                    wss-send! id $ str "\"hello from: " income
              println "\"demo started"
          :examples $ []
        |main! $ %{} :CodeEntry (:doc |) (:schema nil)
          :code $ quote
            defn main! () $ run-tests
          :examples $ []
        |reload! $ %{} :CodeEntry (:doc |) (:schema nil)
          :code $ quote
            defn reload! () $ println "\"did nothing on reload"
          :examples $ []
        |run-tests $ %{} :CodeEntry (:doc |) (:schema nil)
          :code $ quote
            defn run-tests () (println "\"%%%% test for lib") (println calcit-filename calcit-dirname)
          :examples $ []
      :ns $ %{} :NsEntry (:doc |)
        :code $ quote
          ns wss.test $ :require
            wss.core :refer $ wss-serve! wss-each! wss-send!
            wss.$meta :refer $ calcit-dirname calcit-filename
    |wss.util $ %{} :FileEntry
      :defs $ {}
        |get-dylib-ext $ %{} :CodeEntry (:doc |) (:schema nil)
          :code $ quote
            defmacro get-dylib-ext () $ case-default (&get-os) "\".so" (:macos "\".dylib") (:windows "\".dll")
          :examples $ []
        |get-dylib-path $ %{} :CodeEntry (:doc |) (:schema nil)
          :code $ quote
            defn get-dylib-path (p)
              str (or-current-path calcit-dirname) p $ get-dylib-ext
          :examples $ []
        |or-current-path $ %{} :CodeEntry (:doc |) (:schema nil)
          :code $ quote
            defn or-current-path (p)
              if (blank? p) "\"." p
          :examples $ []
      :ns $ %{} :NsEntry (:doc |)
        :code $ quote
          ns wss.util $ :require
            wss.$meta :refer $ calcit-dirname calcit-filename
