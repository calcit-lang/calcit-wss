
{} (:package |wss)
  :configs $ {} (:init-fn |wss.test/main!) (:reload-fn |wss.test/reload!)
    :modules $ []
    :version |0.0.2
  :files $ {}
    |wss.core $ {}
      :ns $ quote
        ns wss.core $ :require
          wss.$meta :refer $ calcit-dirname
          wss.util :refer $ get-dylib-path
      :defs $ {}
        |wss-each! $ quote
          defn wss-each! (cb)
            &call-dylib-edn-fn (get-dylib-path "\"/dylibs/libcalcit_wss") "\"wss_each" cb
        |wss-send! $ quote
          defn wss-send! (client message)
            &call-dylib-edn (get-dylib-path "\"/dylibs/libcalcit_wss") "\"wss_send" client message
        |wss-serve! $ quote
          defn wss-serve! (options cb)
            &call-dylib-edn-fn (get-dylib-path "\"/dylibs/libcalcit_wss") "\"wss_serve" options cb
    |wss.test $ {}
      :ns $ quote
        ns wss.test $ :require
          wss.core :refer $ wss-serve! wss-each! wss-send!
          wss.$meta :refer $ calcit-dirname calcit-filename
      :defs $ {}
        |run-tests $ quote
          defn run-tests () (println "\"%%%% test for lib") (println calcit-filename calcit-dirname)
        |demo! $ quote
          defn demo! ()
            wss-serve!
              {} $ :port 9001
              fn (income) (println income)
                wss-each! $ fn (id)
                  wss-send! id $ str "\"hello from: " income
            println "\"demo started"
        |main! $ quote
          defn main! () $ run-tests
        |reload! $ quote
          defn reload! () $ println "\"did nothing on reload"
    |wss.util $ {}
      :ns $ quote
        ns wss.util $ :require
          wss.$meta :refer $ calcit-dirname calcit-filename
      :defs $ {}
        |get-dylib-ext $ quote
          defmacro get-dylib-ext () $ case-default (&get-os) "\".so" (:macos "\".dylib") (:windows "\".dll")
        |get-dylib-path $ quote
          defn get-dylib-path (p)
            str (or-current-path calcit-dirname) p $ get-dylib-ext
        |or-current-path $ quote
          defn or-current-path (p)
            if (blank? p) "\"." p
