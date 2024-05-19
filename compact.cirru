
{} (:package |wss)
  :configs $ {} (:init-fn |wss.test/main!) (:reload-fn |wss.test/reload!) (:version |0.2.5)
    :modules $ []
  :entries $ {}
    :demo $ {} (:init-fn |wss.test/demo!) (:port 6001) (:reload-fn |wss.test/reload!)
  :files $ {}
    |wss.core $ %{} :FileEntry
      :defs $ {}
        |wss-each! $ %{} :CodeEntry (:doc |)
          :code $ quote
            defn wss-each! (cb)
              &call-dylib-edn-fn (get-dylib-path "\"/dylibs/libcalcit_wss") "\"wss_each" cb
        |wss-send! $ %{} :CodeEntry (:doc |)
          :code $ quote
            defn wss-send! (client message)
              &call-dylib-edn (get-dylib-path "\"/dylibs/libcalcit_wss") "\"wss_send" client message
        |wss-serve! $ %{} :CodeEntry (:doc |)
          :code $ quote
            defn wss-serve! (options cb)
              &call-dylib-edn-fn (get-dylib-path "\"/dylibs/libcalcit_wss") "\"wss_serve" options cb
      :ns $ %{} :CodeEntry (:doc |)
        :code $ quote
          ns wss.core $ :require
            wss.$meta :refer $ calcit-dirname
            wss.util :refer $ get-dylib-path
    |wss.test $ %{} :FileEntry
      :defs $ {}
        |demo! $ %{} :CodeEntry (:doc |)
          :code $ quote
            defn demo! ()
              wss-serve!
                {} $ :port 9001
                fn (income) (println income)
                  wss-each! $ fn (id)
                    wss-send! id $ str "\"hello from: " income
              println "\"demo started"
        |main! $ %{} :CodeEntry (:doc |)
          :code $ quote
            defn main! () $ run-tests
        |reload! $ %{} :CodeEntry (:doc |)
          :code $ quote
            defn reload! () $ println "\"did nothing on reload"
        |run-tests $ %{} :CodeEntry (:doc |)
          :code $ quote
            defn run-tests () (println "\"%%%% test for lib") (println calcit-filename calcit-dirname)
      :ns $ %{} :CodeEntry (:doc |)
        :code $ quote
          ns wss.test $ :require
            wss.core :refer $ wss-serve! wss-each! wss-send!
            wss.$meta :refer $ calcit-dirname calcit-filename
    |wss.util $ %{} :FileEntry
      :defs $ {}
        |get-dylib-ext $ %{} :CodeEntry (:doc |)
          :code $ quote
            defmacro get-dylib-ext () $ case-default (&get-os) "\".so" (:macos "\".dylib") (:windows "\".dll")
        |get-dylib-path $ %{} :CodeEntry (:doc |)
          :code $ quote
            defn get-dylib-path (p)
              str (or-current-path calcit-dirname) p $ get-dylib-ext
        |or-current-path $ %{} :CodeEntry (:doc |)
          :code $ quote
            defn or-current-path (p)
              if (blank? p) "\"." p
      :ns $ %{} :CodeEntry (:doc |)
        :code $ quote
          ns wss.util $ :require
            wss.$meta :refer $ calcit-dirname calcit-filename
