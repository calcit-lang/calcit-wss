
{}
  :users $ {}
    |u0 $ {} (:theme :star-trail) (:id |u0) (:name |chen) (:nickname |chen) (:avatar nil) (:password |d41d8cd98f00b204e9800998ecf8427e)
  :ir $ {} (:package |wss)
    :files $ {}
      |wss.core $ {}
        :ns $ {} (:type :expr) (:by |u0) (:at 1630171366222)
          :data $ {}
            |T $ {} (:type :leaf) (:by |u0) (:at 1630171366222) (:text |ns)
            |j $ {} (:type :leaf) (:by |u0) (:at 1630171366222) (:text |wss.core)
            |r $ {} (:type :expr) (:by |u0) (:at 1630175118985)
              :data $ {}
                |T $ {} (:type :leaf) (:by |u0) (:at 1630175119637) (:text |:require)
                |j $ {} (:type :expr) (:by |u0) (:at 1630175120856)
                  :data $ {}
                    |T $ {} (:type :leaf) (:by |u0) (:at 1634969654589) (:text |wss.$meta)
                    |j $ {} (:type :leaf) (:by |u0) (:at 1630175127717) (:text |:refer)
                    |r $ {} (:type :expr) (:by |u0) (:at 1630175128076)
                      :data $ {}
                        |T $ {} (:type :leaf) (:by |u0) (:at 1630175130627) (:text |calcit-dirname)
                |r $ {} (:type :expr) (:by |u0) (:at 1633181140100)
                  :data $ {}
                    |T $ {} (:type :leaf) (:by |u0) (:at 1634969655909) (:text |wss.util)
                    |j $ {} (:type :leaf) (:by |u0) (:at 1633181140100) (:text |:refer)
                    |r $ {} (:type :expr) (:by |u0) (:at 1633181140100)
                      :data $ {}
                        |T $ {} (:type :leaf) (:by |u0) (:at 1634804181370) (:text |get-dylib-path)
        :configs $ {}
        :defs $ {}
          |wss-each! $ {} (:type :expr) (:by |u0) (:at 1635145806315)
            :data $ {}
              |T $ {} (:type :leaf) (:by |u0) (:at 1635145806315) (:text |defn)
              |j $ {} (:type :leaf) (:by |u0) (:at 1635145806315) (:text |wss-each!)
              |r $ {} (:type :expr) (:by |u0) (:at 1635145808354)
                :data $ {}
                  |j $ {} (:type :leaf) (:by |u0) (:at 1635145808354) (:text |cb)
              |v $ {} (:type :expr) (:by |u0) (:at 1635145808354)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1635145808354) (:text |&call-dylib-edn-fn)
                  |j $ {} (:type :expr) (:by |u0) (:at 1635145808354)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1635145808354) (:text |get-dylib-path)
                      |j $ {} (:type :leaf) (:by |u0) (:at 1635145808354) (:text "|\"/dylibs/libcalcit_wss")
                  |r $ {} (:type :leaf) (:by |u0) (:at 1635145988143) (:text "|\"wss_each")
                  |x $ {} (:type :leaf) (:by |u0) (:at 1635145808354) (:text |cb)
          |wss-send! $ {} (:type :expr) (:by |u0) (:at 1635145854895)
            :data $ {}
              |T $ {} (:type :leaf) (:by |u0) (:at 1635145854895) (:text |defn)
              |j $ {} (:type :leaf) (:by |u0) (:at 1635145854895) (:text |wss-send!)
              |n $ {} (:type :expr) (:by |u0) (:at 1635145859497)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1635145861294) (:text |client)
                  |j $ {} (:type :leaf) (:by |u0) (:at 1635145863780) (:text |message)
              |r $ {} (:type :expr) (:by |u0) (:at 1635145857543)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1635146242318) (:text |&call-dylib-edn)
                  |j $ {} (:type :expr) (:by |u0) (:at 1635145857543)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1635145857543) (:text |get-dylib-path)
                      |j $ {} (:type :leaf) (:by |u0) (:at 1635145857543) (:text "|\"/dylibs/libcalcit_wss")
                  |r $ {} (:type :leaf) (:by |u0) (:at 1635145992351) (:text "|\"wss_send")
                  |v $ {} (:type :leaf) (:by |u0) (:at 1635145872332) (:text |client)
                  |x $ {} (:type :leaf) (:by |u0) (:at 1635145874433) (:text |message)
          |wss-serve! $ {} (:type :expr) (:by |u0) (:at 1630219258753)
            :data $ {}
              |T $ {} (:type :leaf) (:by |u0) (:at 1630219258753) (:text |defn)
              |j $ {} (:type :leaf) (:by |u0) (:at 1635145798810) (:text |wss-serve!)
              |r $ {} (:type :expr) (:by |u0) (:at 1630219268038)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1634969697896) (:text |options)
                  |j $ {} (:type :leaf) (:by |u0) (:at 1634969695249) (:text |cb)
              |v $ {} (:type :expr) (:by |u0) (:at 1630219268038)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1634969799070) (:text |&call-dylib-edn-fn)
                  |b $ {} (:type :expr) (:by |u0) (:at 1634804189975)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1634804196083) (:text |get-dylib-path)
                      |j $ {} (:type :leaf) (:by |u0) (:at 1634969809435) (:text "|\"/dylibs/libcalcit_wss")
                  |r $ {} (:type :leaf) (:by |u0) (:at 1635145980817) (:text "|\"wss_serve")
                  |v $ {} (:type :leaf) (:by |u0) (:at 1634969706450) (:text |options)
                  |x $ {} (:type :leaf) (:by |u0) (:at 1634969708441) (:text |cb)
        :proc $ {} (:type :expr) (:by |u0) (:at 1630171366222)
          :data $ {}
      |wss.test $ {}
        :ns $ {} (:type :expr) (:by |u0) (:at 1633149625774)
          :data $ {}
            |T $ {} (:type :leaf) (:by |u0) (:at 1633149625774) (:text |ns)
            |j $ {} (:type :leaf) (:by |u0) (:at 1633149625774) (:text |wss.test)
            |r $ {} (:type :expr) (:by |u0) (:at 1633149974572)
              :data $ {}
                |T $ {} (:type :leaf) (:by |u0) (:at 1633149975596) (:text |:require)
                |j $ {} (:type :expr) (:by |u0) (:at 1634703855566)
                  :data $ {}
                    |T $ {} (:type :leaf) (:by |u0) (:at 1634969676975) (:text |wss.core)
                    |j $ {} (:type :leaf) (:by |u0) (:at 1634703859915) (:text |:refer)
                    |r $ {} (:type :expr) (:by |u0) (:at 1634703860100)
                      :data $ {}
                        |T $ {} (:type :leaf) (:by |u0) (:at 1635145928417) (:text |wss-serve!)
                        |j $ {} (:type :leaf) (:by |u0) (:at 1635146122501) (:text |wss-each!)
                        |r $ {} (:type :leaf) (:by |u0) (:at 1635146125177) (:text |wss-send!)
                |r $ {} (:type :expr) (:by |u0) (:at 1634703941759)
                  :data $ {}
                    |T $ {} (:type :leaf) (:by |u0) (:at 1634969678173) (:text |wss.$meta)
                    |j $ {} (:type :leaf) (:by |u0) (:at 1634703941759) (:text |:refer)
                    |r $ {} (:type :expr) (:by |u0) (:at 1634703941759)
                      :data $ {}
                        |T $ {} (:type :leaf) (:by |u0) (:at 1634703941759) (:text |calcit-dirname)
                        |j $ {} (:type :leaf) (:by |u0) (:at 1634703953240) (:text |calcit-filename)
        :configs $ {}
        :defs $ {}
          |run-tests $ {} (:type :expr) (:by |u0) (:at 1633150008092)
            :data $ {}
              |T $ {} (:type :leaf) (:by |u0) (:at 1633150011172) (:text |defn)
              |j $ {} (:type :leaf) (:by |u0) (:at 1633150008092) (:text |run-tests)
              |r $ {} (:type :expr) (:by |u0) (:at 1633150008092)
                :data $ {}
              |v $ {} (:type :expr) (:by |u0) (:at 1634703837934)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1634703837934) (:text |println)
                  |j $ {} (:type :leaf) (:by |u0) (:at 1634703847178) (:text "|\"%%%% test for lib")
              |x $ {} (:type :expr) (:by |u0) (:at 1634703837934)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1634703837934) (:text |println)
                  |j $ {} (:type :leaf) (:by |u0) (:at 1634703837934) (:text |calcit-filename)
                  |r $ {} (:type :leaf) (:by |u0) (:at 1634703837934) (:text |calcit-dirname)
          |demo! $ {} (:type :expr) (:by |u0) (:at 1634969729308)
            :data $ {}
              |T $ {} (:type :leaf) (:by |u0) (:at 1634969729308) (:text |defn)
              |j $ {} (:type :leaf) (:by |u0) (:at 1634969729308) (:text |demo!)
              |r $ {} (:type :expr) (:by |u0) (:at 1634969729308)
                :data $ {}
              |v $ {} (:type :expr) (:by |u0) (:at 1634969739109)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1635145933820) (:text |wss-serve!)
                  |j $ {} (:type :expr) (:by |u0) (:at 1634969740172)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1634969740910) (:text |{})
                      |j $ {} (:type :expr) (:by |u0) (:at 1634969741701)
                        :data $ {}
                          |T $ {} (:type :leaf) (:by |u0) (:at 1634969743184) (:text |:port)
                          |j $ {} (:type :leaf) (:by |u0) (:at 1635317855022) (:text |9001)
                  |r $ {} (:type :expr) (:by |u0) (:at 1634969749769)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1634969750160) (:text |fn)
                      |j $ {} (:type :expr) (:by |u0) (:at 1634969750447)
                        :data $ {}
                          |T $ {} (:type :leaf) (:by |u0) (:at 1634969755354) (:text |income)
                      |r $ {} (:type :expr) (:by |u0) (:at 1634969756589)
                        :data $ {}
                          |T $ {} (:type :leaf) (:by |u0) (:at 1634969758942) (:text |println)
                          |j $ {} (:type :leaf) (:by |u0) (:at 1634969764526) (:text |income)
                      |x $ {} (:type :expr) (:by |u0) (:at 1635146115524)
                        :data $ {}
                          |T $ {} (:type :leaf) (:by |u0) (:at 1635146119614) (:text |wss-each!)
                          |j $ {} (:type :expr) (:by |u0) (:at 1635146127525)
                            :data $ {}
                              |T $ {} (:type :leaf) (:by |u0) (:at 1635146127885) (:text |fn)
                              |j $ {} (:type :expr) (:by |u0) (:at 1635146128099)
                                :data $ {}
                                  |T $ {} (:type :leaf) (:by |u0) (:at 1635146128922) (:text |id)
                              |r $ {} (:type :expr) (:by |u0) (:at 1635146130191)
                                :data $ {}
                                  |T $ {} (:type :leaf) (:by |u0) (:at 1635146133822) (:text |wss-send!)
                                  |j $ {} (:type :leaf) (:by |u0) (:at 1635146134807) (:text |id)
                                  |r $ {} (:type :expr) (:by |u0) (:at 1635146138910)
                                    :data $ {}
                                      |D $ {} (:type :leaf) (:by |u0) (:at 1635146140983) (:text |str)
                                      |T $ {} (:type :leaf) (:by |u0) (:at 1635146153808) (:text "|\"hello from: ")
                                      |j $ {} (:type :leaf) (:by |u0) (:at 1635146157404) (:text |income)
              |x $ {} (:type :expr) (:by |u0) (:at 1635145934793)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1635145935765) (:text |println)
                  |j $ {} (:type :leaf) (:by |u0) (:at 1635317967071) (:text "|\"demo started")
          |main! $ {} (:type :expr) (:by |u0) (:at 1633149996242)
            :data $ {}
              |T $ {} (:type :leaf) (:by |u0) (:at 1633149996242) (:text |defn)
              |j $ {} (:type :leaf) (:by |u0) (:at 1633149996242) (:text |main!)
              |r $ {} (:type :expr) (:by |u0) (:at 1633149996242)
                :data $ {}
              |v $ {} (:type :expr) (:by |u0) (:at 1633150002066)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1633150004371) (:text |run-tests)
          |reload! $ {} (:type :expr) (:by |u0) (:at 1633149998862)
            :data $ {}
              |T $ {} (:type :leaf) (:by |u0) (:at 1633149998862) (:text |defn)
              |j $ {} (:type :leaf) (:by |u0) (:at 1633149998862) (:text |reload!)
              |r $ {} (:type :expr) (:by |u0) (:at 1633149998862)
                :data $ {}
              |v $ {} (:type :expr) (:by |u0) (:at 1635317973495)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1635317976841) (:text |println)
                  |j $ {} (:type :leaf) (:by |u0) (:at 1635317981752) (:text "|\"did nothing on reload")
        :proc $ {} (:type :expr) (:by |u0) (:at 1633149625774)
          :data $ {}
      |wss.util $ {}
        :ns $ {} (:type :expr) (:by |u0) (:at 1633181044360)
          :data $ {}
            |T $ {} (:type :leaf) (:by |u0) (:at 1633181044360) (:text |ns)
            |j $ {} (:type :leaf) (:by |u0) (:at 1633181044360) (:text |wss.util)
            |r $ {} (:type :expr) (:by |u0) (:at 1634804160546)
              :data $ {}
                |T $ {} (:type :leaf) (:by |u0) (:at 1634804161330) (:text |:require)
                |j $ {} (:type :expr) (:by |u0) (:at 1634804162771)
                  :data $ {}
                    |T $ {} (:type :leaf) (:by |u0) (:at 1634969666576) (:text |wss.$meta)
                    |j $ {} (:type :leaf) (:by |u0) (:at 1634804168120) (:text |:refer)
                    |r $ {} (:type :expr) (:by |u0) (:at 1634804168421)
                      :data $ {}
                        |T $ {} (:type :leaf) (:by |u0) (:at 1634804171748) (:text |calcit-dirname)
                        |j $ {} (:type :leaf) (:by |u0) (:at 1634804175462) (:text |calcit-filename)
        :configs $ {}
        :defs $ {}
          |get-dylib-ext $ {} (:type :expr) (:by |u0) (:at 1630231398718)
            :data $ {}
              |T $ {} (:type :leaf) (:by |u0) (:at 1630231418304) (:text |defmacro)
              |j $ {} (:type :leaf) (:by |u0) (:at 1633181058353) (:text |get-dylib-ext)
              |r $ {} (:type :expr) (:by |u0) (:at 1630231398718)
                :data $ {}
              |v $ {} (:type :expr) (:by |u0) (:at 1630231403270)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1630231423910) (:text |case-default)
                  |b $ {} (:type :expr) (:by |u0) (:at 1630231429893)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1630231433951) (:text |&get-os)
                  |j $ {} (:type :leaf) (:by |u0) (:at 1630231427453) (:text "|\".so")
                  |r $ {} (:type :expr) (:by |u0) (:at 1630231437150)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1630231439152) (:text |:macos)
                      |j $ {} (:type :leaf) (:by |u0) (:at 1630231447585) (:text "|\".dylib")
                  |v $ {} (:type :expr) (:by |u0) (:at 1630231448478)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1630231449901) (:text |:windows)
                      |j $ {} (:type :leaf) (:by |u0) (:at 1630231461388) (:text "|\".dll")
          |get-dylib-path $ {} (:type :expr) (:by |u0) (:at 1634804142034)
            :data $ {}
              |T $ {} (:type :leaf) (:by |u0) (:at 1634804142034) (:text |defn)
              |j $ {} (:type :leaf) (:by |u0) (:at 1634804142034) (:text |get-dylib-path)
              |n $ {} (:type :expr) (:by |u0) (:at 1634804146574)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1634804230294) (:text |p)
              |r $ {} (:type :expr) (:by |u0) (:at 1634804145483)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1634804145483) (:text |str)
                  |j $ {} (:type :expr) (:by |u0) (:at 1634804145483)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1634804145483) (:text |or-current-path)
                      |j $ {} (:type :leaf) (:by |u0) (:at 1634804145483) (:text |calcit-dirname)
                  |r $ {} (:type :leaf) (:by |u0) (:at 1634804157377) (:text |p)
                  |v $ {} (:type :expr) (:by |u0) (:at 1634804145483)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1634804145483) (:text |get-dylib-ext)
          |or-current-path $ {} (:type :expr) (:by |u0) (:at 1630245582276)
            :data $ {}
              |T $ {} (:type :leaf) (:by |u0) (:at 1630245583936) (:text |defn)
              |j $ {} (:type :leaf) (:by |u0) (:at 1633181131099) (:text |or-current-path)
              |r $ {} (:type :expr) (:by |u0) (:at 1630245582276)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1630245585364) (:text |p)
              |v $ {} (:type :expr) (:by |u0) (:at 1630245585942)
                :data $ {}
                  |T $ {} (:type :leaf) (:by |u0) (:at 1630245586336) (:text |if)
                  |j $ {} (:type :expr) (:by |u0) (:at 1630245586894)
                    :data $ {}
                      |T $ {} (:type :leaf) (:by |u0) (:at 1630245614560) (:text |blank?)
                      |j $ {} (:type :leaf) (:by |u0) (:at 1630245615061) (:text |p)
                  |r $ {} (:type :leaf) (:by |u0) (:at 1630245616843) (:text "|\".")
                  |v $ {} (:type :leaf) (:by |u0) (:at 1630245618366) (:text |p)
        :proc $ {} (:type :expr) (:by |u0) (:at 1633181044360)
          :data $ {}
  :configs $ {} (:port 6001) (:init-fn |wss.test/main!) (:reload-fn |wss.test/reload!)
    :modules $ []
    :version |0.0.2
