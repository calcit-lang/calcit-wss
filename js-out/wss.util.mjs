
import * as $clt from "./calcit.core.mjs";
import { calcit_dirname } from "./wss.$meta.mjs";
const _t_ = $clt.init_tags([]);

export function or_current_path(p) {
  if (arguments.length !== 1) throw $clt._args_throw('or-current-path', 1, arguments.length);

  if ($clt.blank_$q_(p)) { return "." } else { return p }
}

export function get_dylib_path(p) {
  if (arguments.length !== 1) throw $clt._args_throw('get-dylib-path', 1, arguments.length);
  let tmp_AUTO_1 = or_current_path(calcit_dirname);
  return $clt.str(tmp_AUTO_1, p, ".dylib")
}



