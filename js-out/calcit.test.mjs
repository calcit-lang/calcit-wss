
import * as $clt from "./calcit.core.mjs";
const _t_ = $clt.init_tags([]);

export function fail(message) {
  if (arguments.length !== 1) throw $clt._args_throw('fail', 1, arguments.length);
  let err_AUTO_1 = new Error(message);
  err_AUTO_1.data = null;
  throw err_AUTO_1;
}



