
{}
  :configs $ {} (:init-fn |wss.test/main!) (:port 6001) (:reload-fn |wss.test/reload!) (:version |0.0.7)
    :modules $ []
  :entries $ {}
  :ir $ {} (:package |wss)
    :files $ {}
      |wss.core $ {}
        :configs $ {}
        :defs $ {}
          |wss-each! $ {} (:at 1635145806315) (:by |u0) (:type :expr)
            :data $ {}
              |T $ {} (:at 1635145806315) (:by |u0) (:text |defn) (:type :leaf)
              |j $ {} (:at 1635145806315) (:by |u0) (:text |wss-each!) (:type :leaf)
              |r $ {} (:at 1635145808354) (:by |u0) (:type :expr)
                :data $ {}
                  |j $ {} (:at 1635145808354) (:by |u0) (:text |cb) (:type :leaf)
              |v $ {} (:at 1635145808354) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1635145808354) (:by |u0) (:text |&call-dylib-edn-fn) (:type :leaf)
                  |j $ {} (:at 1635145808354) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1635145808354) (:by |u0) (:text |get-dylib-path) (:type :leaf)
                      |j $ {} (:at 1635145808354) (:by |u0) (:text "|\"/dylibs/libcalcit_wss") (:type :leaf)
                  |r $ {} (:at 1635145988143) (:by |u0) (:text "|\"wss_each") (:type :leaf)
                  |x $ {} (:at 1635145808354) (:by |u0) (:text |cb) (:type :leaf)
          |wss-send! $ {} (:at 1635145854895) (:by |u0) (:type :expr)
            :data $ {}
              |T $ {} (:at 1635145854895) (:by |u0) (:text |defn) (:type :leaf)
              |j $ {} (:at 1635145854895) (:by |u0) (:text |wss-send!) (:type :leaf)
              |n $ {} (:at 1635145859497) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1635145861294) (:by |u0) (:text |client) (:type :leaf)
                  |j $ {} (:at 1635145863780) (:by |u0) (:text |message) (:type :leaf)
              |r $ {} (:at 1635145857543) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1635146242318) (:by |u0) (:text |&call-dylib-edn) (:type :leaf)
                  |j $ {} (:at 1635145857543) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1635145857543) (:by |u0) (:text |get-dylib-path) (:type :leaf)
                      |j $ {} (:at 1635145857543) (:by |u0) (:text "|\"/dylibs/libcalcit_wss") (:type :leaf)
                  |r $ {} (:at 1635145992351) (:by |u0) (:text "|\"wss_send") (:type :leaf)
                  |v $ {} (:at 1635145872332) (:by |u0) (:text |client) (:type :leaf)
                  |x $ {} (:at 1635145874433) (:by |u0) (:text |message) (:type :leaf)
          |wss-serve! $ {} (:at 1630219258753) (:by |u0) (:type :expr)
            :data $ {}
              |T $ {} (:at 1630219258753) (:by |u0) (:text |defn) (:type :leaf)
              |j $ {} (:at 1635145798810) (:by |u0) (:text |wss-serve!) (:type :leaf)
              |r $ {} (:at 1630219268038) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1634969697896) (:by |u0) (:text |options) (:type :leaf)
                  |j $ {} (:at 1634969695249) (:by |u0) (:text |cb) (:type :leaf)
              |v $ {} (:at 1630219268038) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1634969799070) (:by |u0) (:text |&call-dylib-edn-fn) (:type :leaf)
                  |b $ {} (:at 1634804189975) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1634804196083) (:by |u0) (:text |get-dylib-path) (:type :leaf)
                      |j $ {} (:at 1634969809435) (:by |u0) (:text "|\"/dylibs/libcalcit_wss") (:type :leaf)
                  |r $ {} (:at 1635145980817) (:by |u0) (:text "|\"wss_serve") (:type :leaf)
                  |v $ {} (:at 1634969706450) (:by |u0) (:text |options) (:type :leaf)
                  |x $ {} (:at 1634969708441) (:by |u0) (:text |cb) (:type :leaf)
        :ns $ {} (:at 1630171366222) (:by |u0) (:type :expr)
          :data $ {}
            |T $ {} (:at 1630171366222) (:by |u0) (:text |ns) (:type :leaf)
            |j $ {} (:at 1630171366222) (:by |u0) (:text |wss.core) (:type :leaf)
            |r $ {} (:at 1630175118985) (:by |u0) (:type :expr)
              :data $ {}
                |T $ {} (:at 1630175119637) (:by |u0) (:text |:require) (:type :leaf)
                |j $ {} (:at 1630175120856) (:by |u0) (:type :expr)
                  :data $ {}
                    |T $ {} (:at 1634969654589) (:by |u0) (:text |wss.$meta) (:type :leaf)
                    |j $ {} (:at 1630175127717) (:by |u0) (:text |:refer) (:type :leaf)
                    |r $ {} (:at 1630175128076) (:by |u0) (:type :expr)
                      :data $ {}
                        |T $ {} (:at 1630175130627) (:by |u0) (:text |calcit-dirname) (:type :leaf)
                |r $ {} (:at 1633181140100) (:by |u0) (:type :expr)
                  :data $ {}
                    |T $ {} (:at 1634969655909) (:by |u0) (:text |wss.util) (:type :leaf)
                    |j $ {} (:at 1633181140100) (:by |u0) (:text |:refer) (:type :leaf)
                    |r $ {} (:at 1633181140100) (:by |u0) (:type :expr)
                      :data $ {}
                        |T $ {} (:at 1634804181370) (:by |u0) (:text |get-dylib-path) (:type :leaf)
        :proc $ {} (:at 1630171366222) (:by |u0) (:type :expr)
          :data $ {}
      |wss.test $ {}
        :configs $ {}
        :defs $ {}
          |demo! $ {} (:at 1634969729308) (:by |u0) (:type :expr)
            :data $ {}
              |T $ {} (:at 1634969729308) (:by |u0) (:text |defn) (:type :leaf)
              |j $ {} (:at 1634969729308) (:by |u0) (:text |demo!) (:type :leaf)
              |r $ {} (:at 1634969729308) (:by |u0) (:type :expr)
                :data $ {}
              |v $ {} (:at 1634969739109) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1635145933820) (:by |u0) (:text |wss-serve!) (:type :leaf)
                  |j $ {} (:at 1634969740172) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1634969740910) (:by |u0) (:text |{}) (:type :leaf)
                      |j $ {} (:at 1634969741701) (:by |u0) (:type :expr)
                        :data $ {}
                          |T $ {} (:at 1634969743184) (:by |u0) (:text |:port) (:type :leaf)
                          |j $ {} (:at 1635317855022) (:by |u0) (:text |9001) (:type :leaf)
                  |r $ {} (:at 1634969749769) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1634969750160) (:by |u0) (:text |fn) (:type :leaf)
                      |j $ {} (:at 1634969750447) (:by |u0) (:type :expr)
                        :data $ {}
                          |T $ {} (:at 1634969755354) (:by |u0) (:text |income) (:type :leaf)
                      |r $ {} (:at 1634969756589) (:by |u0) (:type :expr)
                        :data $ {}
                          |T $ {} (:at 1634969758942) (:by |u0) (:text |println) (:type :leaf)
                          |j $ {} (:at 1634969764526) (:by |u0) (:text |income) (:type :leaf)
                      |x $ {} (:at 1635146115524) (:by |u0) (:type :expr)
                        :data $ {}
                          |T $ {} (:at 1635146119614) (:by |u0) (:text |wss-each!) (:type :leaf)
                          |j $ {} (:at 1635146127525) (:by |u0) (:type :expr)
                            :data $ {}
                              |T $ {} (:at 1635146127885) (:by |u0) (:text |fn) (:type :leaf)
                              |j $ {} (:at 1635146128099) (:by |u0) (:type :expr)
                                :data $ {}
                                  |T $ {} (:at 1635146128922) (:by |u0) (:text |id) (:type :leaf)
                              |r $ {} (:at 1635146130191) (:by |u0) (:type :expr)
                                :data $ {}
                                  |T $ {} (:at 1635146133822) (:by |u0) (:text |wss-send!) (:type :leaf)
                                  |j $ {} (:at 1635146134807) (:by |u0) (:text |id) (:type :leaf)
                                  |r $ {} (:at 1635146138910) (:by |u0) (:type :expr)
                                    :data $ {}
                                      |D $ {} (:at 1635146140983) (:by |u0) (:text |str) (:type :leaf)
                                      |T $ {} (:at 1635146153808) (:by |u0) (:text "|\"hello from: ") (:type :leaf)
                                      |j $ {} (:at 1635146157404) (:by |u0) (:text |income) (:type :leaf)
              |x $ {} (:at 1635145934793) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1635145935765) (:by |u0) (:text |println) (:type :leaf)
                  |j $ {} (:at 1635317967071) (:by |u0) (:text "|\"demo started") (:type :leaf)
          |main! $ {} (:at 1633149996242) (:by |u0) (:type :expr)
            :data $ {}
              |T $ {} (:at 1633149996242) (:by |u0) (:text |defn) (:type :leaf)
              |j $ {} (:at 1633149996242) (:by |u0) (:text |main!) (:type :leaf)
              |r $ {} (:at 1633149996242) (:by |u0) (:type :expr)
                :data $ {}
              |v $ {} (:at 1633150002066) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1633150004371) (:by |u0) (:text |run-tests) (:type :leaf)
          |reload! $ {} (:at 1633149998862) (:by |u0) (:type :expr)
            :data $ {}
              |T $ {} (:at 1633149998862) (:by |u0) (:text |defn) (:type :leaf)
              |j $ {} (:at 1633149998862) (:by |u0) (:text |reload!) (:type :leaf)
              |r $ {} (:at 1633149998862) (:by |u0) (:type :expr)
                :data $ {}
              |v $ {} (:at 1635317973495) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1635317976841) (:by |u0) (:text |println) (:type :leaf)
                  |j $ {} (:at 1635317981752) (:by |u0) (:text "|\"did nothing on reload") (:type :leaf)
          |run-tests $ {} (:at 1633150008092) (:by |u0) (:type :expr)
            :data $ {}
              |T $ {} (:at 1633150011172) (:by |u0) (:text |defn) (:type :leaf)
              |j $ {} (:at 1633150008092) (:by |u0) (:text |run-tests) (:type :leaf)
              |r $ {} (:at 1633150008092) (:by |u0) (:type :expr)
                :data $ {}
              |v $ {} (:at 1634703837934) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1634703837934) (:by |u0) (:text |println) (:type :leaf)
                  |j $ {} (:at 1634703847178) (:by |u0) (:text "|\"%%%% test for lib") (:type :leaf)
              |x $ {} (:at 1634703837934) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1634703837934) (:by |u0) (:text |println) (:type :leaf)
                  |j $ {} (:at 1634703837934) (:by |u0) (:text |calcit-filename) (:type :leaf)
                  |r $ {} (:at 1634703837934) (:by |u0) (:text |calcit-dirname) (:type :leaf)
        :ns $ {} (:at 1633149625774) (:by |u0) (:type :expr)
          :data $ {}
            |T $ {} (:at 1633149625774) (:by |u0) (:text |ns) (:type :leaf)
            |j $ {} (:at 1633149625774) (:by |u0) (:text |wss.test) (:type :leaf)
            |r $ {} (:at 1633149974572) (:by |u0) (:type :expr)
              :data $ {}
                |T $ {} (:at 1633149975596) (:by |u0) (:text |:require) (:type :leaf)
                |j $ {} (:at 1634703855566) (:by |u0) (:type :expr)
                  :data $ {}
                    |T $ {} (:at 1634969676975) (:by |u0) (:text |wss.core) (:type :leaf)
                    |j $ {} (:at 1634703859915) (:by |u0) (:text |:refer) (:type :leaf)
                    |r $ {} (:at 1634703860100) (:by |u0) (:type :expr)
                      :data $ {}
                        |T $ {} (:at 1635145928417) (:by |u0) (:text |wss-serve!) (:type :leaf)
                        |j $ {} (:at 1635146122501) (:by |u0) (:text |wss-each!) (:type :leaf)
                        |r $ {} (:at 1635146125177) (:by |u0) (:text |wss-send!) (:type :leaf)
                |r $ {} (:at 1634703941759) (:by |u0) (:type :expr)
                  :data $ {}
                    |T $ {} (:at 1634969678173) (:by |u0) (:text |wss.$meta) (:type :leaf)
                    |j $ {} (:at 1634703941759) (:by |u0) (:text |:refer) (:type :leaf)
                    |r $ {} (:at 1634703941759) (:by |u0) (:type :expr)
                      :data $ {}
                        |T $ {} (:at 1634703941759) (:by |u0) (:text |calcit-dirname) (:type :leaf)
                        |j $ {} (:at 1634703953240) (:by |u0) (:text |calcit-filename) (:type :leaf)
        :proc $ {} (:at 1633149625774) (:by |u0) (:type :expr)
          :data $ {}
      |wss.util $ {}
        :configs $ {}
        :defs $ {}
          |get-dylib-ext $ {} (:at 1630231398718) (:by |u0) (:type :expr)
            :data $ {}
              |T $ {} (:at 1630231418304) (:by |u0) (:text |defmacro) (:type :leaf)
              |j $ {} (:at 1633181058353) (:by |u0) (:text |get-dylib-ext) (:type :leaf)
              |r $ {} (:at 1630231398718) (:by |u0) (:type :expr)
                :data $ {}
              |v $ {} (:at 1630231403270) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1630231423910) (:by |u0) (:text |case-default) (:type :leaf)
                  |b $ {} (:at 1630231429893) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1630231433951) (:by |u0) (:text |&get-os) (:type :leaf)
                  |j $ {} (:at 1630231427453) (:by |u0) (:text "|\".so") (:type :leaf)
                  |r $ {} (:at 1630231437150) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1630231439152) (:by |u0) (:text |:macos) (:type :leaf)
                      |j $ {} (:at 1630231447585) (:by |u0) (:text "|\".dylib") (:type :leaf)
                  |v $ {} (:at 1630231448478) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1630231449901) (:by |u0) (:text |:windows) (:type :leaf)
                      |j $ {} (:at 1630231461388) (:by |u0) (:text "|\".dll") (:type :leaf)
          |get-dylib-path $ {} (:at 1634804142034) (:by |u0) (:type :expr)
            :data $ {}
              |T $ {} (:at 1634804142034) (:by |u0) (:text |defn) (:type :leaf)
              |j $ {} (:at 1634804142034) (:by |u0) (:text |get-dylib-path) (:type :leaf)
              |n $ {} (:at 1634804146574) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1634804230294) (:by |u0) (:text |p) (:type :leaf)
              |r $ {} (:at 1634804145483) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1634804145483) (:by |u0) (:text |str) (:type :leaf)
                  |j $ {} (:at 1634804145483) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1634804145483) (:by |u0) (:text |or-current-path) (:type :leaf)
                      |j $ {} (:at 1634804145483) (:by |u0) (:text |calcit-dirname) (:type :leaf)
                  |r $ {} (:at 1634804157377) (:by |u0) (:text |p) (:type :leaf)
                  |v $ {} (:at 1634804145483) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1634804145483) (:by |u0) (:text |get-dylib-ext) (:type :leaf)
          |or-current-path $ {} (:at 1630245582276) (:by |u0) (:type :expr)
            :data $ {}
              |T $ {} (:at 1630245583936) (:by |u0) (:text |defn) (:type :leaf)
              |j $ {} (:at 1633181131099) (:by |u0) (:text |or-current-path) (:type :leaf)
              |r $ {} (:at 1630245582276) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1630245585364) (:by |u0) (:text |p) (:type :leaf)
              |v $ {} (:at 1630245585942) (:by |u0) (:type :expr)
                :data $ {}
                  |T $ {} (:at 1630245586336) (:by |u0) (:text |if) (:type :leaf)
                  |j $ {} (:at 1630245586894) (:by |u0) (:type :expr)
                    :data $ {}
                      |T $ {} (:at 1630245614560) (:by |u0) (:text |blank?) (:type :leaf)
                      |j $ {} (:at 1630245615061) (:by |u0) (:text |p) (:type :leaf)
                  |r $ {} (:at 1630245616843) (:by |u0) (:text "|\".") (:type :leaf)
                  |v $ {} (:at 1630245618366) (:by |u0) (:text |p) (:type :leaf)
        :ns $ {} (:at 1633181044360) (:by |u0) (:type :expr)
          :data $ {}
            |T $ {} (:at 1633181044360) (:by |u0) (:text |ns) (:type :leaf)
            |j $ {} (:at 1633181044360) (:by |u0) (:text |wss.util) (:type :leaf)
            |r $ {} (:at 1634804160546) (:by |u0) (:type :expr)
              :data $ {}
                |T $ {} (:at 1634804161330) (:by |u0) (:text |:require) (:type :leaf)
                |j $ {} (:at 1634804162771) (:by |u0) (:type :expr)
                  :data $ {}
                    |T $ {} (:at 1634969666576) (:by |u0) (:text |wss.$meta) (:type :leaf)
                    |j $ {} (:at 1634804168120) (:by |u0) (:text |:refer) (:type :leaf)
                    |r $ {} (:at 1634804168421) (:by |u0) (:type :expr)
                      :data $ {}
                        |T $ {} (:at 1634804171748) (:by |u0) (:text |calcit-dirname) (:type :leaf)
                        |j $ {} (:at 1634804175462) (:by |u0) (:text |calcit-filename) (:type :leaf)
        :proc $ {} (:at 1633181044360) (:by |u0) (:type :expr)
          :data $ {}
  :users $ {}
    |u0 $ {} (:avatar nil) (:id |u0) (:name |chen) (:nickname |chen) (:password |d41d8cd98f00b204e9800998ecf8427e) (:theme :star-trail)
