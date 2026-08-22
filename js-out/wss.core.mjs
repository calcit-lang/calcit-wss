
import * as $clt from "./calcit.core.mjs";
import { get_dylib_path } from "./wss.util.mjs";
const _t_ = $clt.init_tags([]);

export function wss_each_$x_(cb) {
  if (arguments.length !== 1) throw $clt._args_throw('wss-each!', 1, arguments.length);
  let tmp_AUTO_1 = get_dylib_path("/dylibs/libcalcit_wss");
  return $clt._$n_call_dylib_edn_fn(tmp_AUTO_1, "wss_each", cb)
}

export function wss_send_$x_(client, message) {
  if (arguments.length !== 2) throw $clt._args_throw('wss-send!', 2, arguments.length);
  let tmp_AUTO_2 = get_dylib_path("/dylibs/libcalcit_wss");
  return $clt._$n_call_dylib_edn(tmp_AUTO_2, "wss_send", client, message)
}

export function wss_serve_$x_(options, cb) {
  if (arguments.length !== 2) throw $clt._args_throw('wss-serve!', 2, arguments.length);
  let tmp_AUTO_3 = get_dylib_path("/dylibs/libcalcit_wss");
  return $clt._$n_call_dylib_edn_fn(tmp_AUTO_3, "wss_serve", options, cb)
}



