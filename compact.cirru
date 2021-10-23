
{} (:package |wss)
  :configs $ {} (:init-fn |wss.test/main!) (:reload-fn |wss.test/reload!)
    :modules $ []
    :version |0.0.3
  :files $ {}
    |wss.core $ {}
      :ns $ quote
        ns wss.core $ :require
          wss.$meta :refer $ calcit-dirname
          wss.util :refer $ get-dylib-path
      :defs $ {}
        |serve-wss! $ quote
          defn serve-wss! (options cb)
            &call-dylib-edn-fn (get-dylib-path "\"/dylibs/libcalcit_wss") "\"serve_wss" options cb
    |wss.test $ {}
      :ns $ quote
        ns wss.test $ :require
          wss.core :refer $ serve-wss!
          wss.$meta :refer $ calcit-dirname calcit-filename
      :defs $ {}
        |run-tests $ quote
          defn run-tests () (println "\"%%%% test for lib") (println calcit-filename calcit-dirname)
        |demo! $ quote
          defn demo! () $ serve-wss!
            {} $ :port 0
            fn (income) (println income)
              {} $ :data "\"TODO"
        |main! $ quote
          defn main! () $ run-tests
        |reload! $ quote
          defn reload! $
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
