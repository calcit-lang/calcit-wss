
{} (:package |lib)
  :configs $ {} (:init-fn |lib.test/main!) (:reload-fn |lib.test/reload!)
    :modules $ []
    :version |0.0.3
  :files $ {}
    |lib.core $ {}
      :ns $ quote
        ns lib.core $ :require
          lib.$meta :refer $ calcit-dirname
          lib.util :refer $ get-dylib-path
      :defs $ {}
        |path-exists? $ quote
          defn path-exists? (name)
            &call-dylib-edn (get-dylib-path "\"/dylibs/libcalcit_std") "\"path_exists" name
    |lib.test $ {}
      :ns $ quote
        ns lib.test $ :require
          lib.core :refer $ path-exists?
          lib.$meta :refer $ calcit-dirname calcit-filename
      :defs $ {}
        |run-tests $ quote
          defn run-tests () (println "\"%%%% test for lib") (println calcit-filename calcit-dirname)
            println (path-exists? "\"README.md") (path-exists? "\"build.js")
        |main! $ quote
          defn main! () $ run-tests
        |reload! $ quote
          defn reload! $
    |lib.util $ {}
      :ns $ quote
        ns lib.util $ :require
          lib.$meta :refer $ calcit-dirname calcit-filename
      :defs $ {}
        |get-dylib-ext $ quote
          defmacro get-dylib-ext () $ case-default (&get-os) "\".so" (:macos "\".dylib") (:windows "\".dll")
        |get-dylib-path $ quote
          defn get-dylib-path (p)
            str (or-current-path calcit-dirname) p $ get-dylib-ext
        |or-current-path $ quote
          defn or-current-path (p)
            if (blank? p) "\"." p
