
import * as $clt from "./calcit.core.mjs";
import { calcit_dirname } from "./wss.$meta.mjs";
import { calcit_filename } from "./wss.$meta.mjs";
import { wss_each_$x_ } from "./wss.core.mjs";
import { wss_send_$x_ } from "./wss.core.mjs";
import { wss_serve_$x_ } from "./wss.core.mjs";
const _t_ = $clt.init_tags(["port",]);

export function demo_$x_() {
  if (arguments.length !== 0) throw $clt._args_throw('demo!', 0, arguments.length);
  {
    let tmp_AUTO_1 = $clt._$n__$M_(_t_.port, 9001);
    let tmp_AUTO_2 = function f_PCT_(income) {
      if (arguments.length !== 1) throw $clt._args_throw('f%', 1, arguments.length);
      {
        console.log($clt.printable(income));
      }
      let tmp_AUTO_3 = function f_PCT_(id) {
        if (arguments.length !== 1) throw $clt._args_throw('f%', 1, arguments.length);
        let tmp_AUTO_4 = $clt.str("hello from: ", income);
        return wss_send_$x_(id, tmp_AUTO_4)
      }
      ;
      return wss_each_$x_(tmp_AUTO_3)
    }
    ;
    wss_serve_$x_(tmp_AUTO_1, tmp_AUTO_2);
  }
  console.log($clt.printable("demo started"))
}

export function run_tests() {
  if (arguments.length !== 0) throw $clt._args_throw('run-tests', 0, arguments.length);
  {
    console.log($clt.printable("%%%% test for lib"));
  }
  console.log($clt.printable(calcit_filename, calcit_dirname))
}

export function main_$x_() {
  if (arguments.length !== 0) throw $clt._args_throw('main!', 0, arguments.length);
  return run_tests()
}

export function reload_$x_() {
  if (arguments.length !== 0) throw $clt._args_throw('reload!', 0, arguments.length);
  console.log($clt.printable("did nothing on reload"))
}



