
import {init_tags, arrayToList, listToArray, CalcitSliceList, CalcitSymbol, CalcitRecur} from "@calcit/procs";
import * as $procs from "@calcit/procs";
export * from "@calcit/procs";

import * as $calcit_DOT_internal from "./calcit.internal.mjs";
const _t_ = init_tags(["&core-enum-methods","&core-fn-methods","&core-list-methods","&core-map-methods","&core-number-methods","&core-set-methods","&core-string-methods","&core-struct-methods","Add","Compare","Contains","Countable","Debug","Deserialize","Eq","Len","ListDestruct","MapDestruct","Mappable","Multiply","Option","OptionMethods","Result","ResultMethods","RuntimeMapMeta","RuntimeMapResponse","Serialize","SetDestruct","Show","StringDestruct","add","any?","append","apply","args","assoc","assoc-after","assoc-before","bind","blank?","body","bool","buffer","butlast","call","call-args","ceil","cirru-quote","code","common-keys","compare","concat","contains?","count","debug","deserialize","destruct","diff-keys","diff-new","diff-triple","difference","display-by","dissoc","drop","each","empty","empty?","ends-with?","enum","enum-def","eq?","err","escape","exclude","filter","filter-kv","filter-not","filter-pair","find","find-index","find-last","find-last-index","first","flatten","floor","fn","foldl","format","fract","generics","get","get-char-code","get-in","group-by","impl","inc","include","includes?","index-of","intersection","join","join-str","js","keys","kind","last-index-of","len","list","macro","map","map-indexed","map-kv","map-list","map-pair","mappend","max","merge","message","meta","method","min","multiply","negate","none","nth","number","ok","pad-left","pad-right","pairs-map","parse-float","pow","prepend","reduce","rem","replace","rest","return","reverse","round","round?","scalar","serialize","set","show","slice","some","sort","sort-by","split","split-lines","sqrt","starts-with?","string","strip-prefix","strip-suffix","struct","struct-def","syntax","take","take-last","to-list","to-map","to-pairs","to-set","trim","union","values",]);

export function reverse(x) {
  if (arguments.length !== 1) throw $procs._args_throw('reverse', 1, arguments.length);
  return $procs._$n_list_$o_reverse(x)
}

export let foldl_compare = function foldl_compare(xs, acc, f) {
  if (arguments.length !== 3) throw $procs._args_throw('foldl-compare', 3, arguments.length);
  
  let times_AUTO_5 = 0;
  while(true) { /* Tail Recursion */
    let ret_AUTO_4 = null;
    if (((times_AUTO_5 & 1023) === 0) && times_AUTO_5 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
    
if ($procs._$n_list_$o_empty_$q_(xs)) { ret_AUTO_4 =true }
 else if (f(acc, $procs._$n_list_$o_nth(xs, 0))) { let tmp_AUTO_2 = $procs._$n_list_$o_rest(xs);
let tmp_AUTO_3 = $procs._$n_list_$o_nth(xs, 0);
ret_AUTO_4 =$procs.recur(tmp_AUTO_2, tmp_AUTO_3, f) } else { ret_AUTO_4 =false }

    if (ret_AUTO_4 instanceof CalcitRecur) {
      if (ret_AUTO_4.args.length !== 3) throw $procs._args_throw('foldl-compare', 3, ret_AUTO_4.args.length);
      xs = ret_AUTO_4.args[0];
acc = ret_AUTO_4.args[1];
f = ret_AUTO_4.args[2];
      
      times_AUTO_5 += 1;
      continue;
    } else {
      return ret_AUTO_4;
    }
  }
}


export function _$e_(x, ...ys) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('=', 1, arguments.length);
  ys = arrayToList(ys);

  if ($procs._$n__$e_(1, $procs._$n_list_$o_count(ys))) { let tmp_AUTO_6 = $procs._$n_list_$o_first(ys);
  return $procs._$n__$e_(x, tmp_AUTO_6) } else { return foldl_compare(ys, x, $procs._$n__$e_) }
}

export function some_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('some?', 1, arguments.length);
  let tmp_AUTO_7 = $procs.nil_$q_(x);
  return $procs.not(tmp_AUTO_7)
}

export function str(x0, ...xs) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('str', 1, arguments.length);
  xs = arrayToList(xs);

  if ($procs._$n_list_$o_empty_$q_(xs)) { return $procs._$n_str(x0) } else { let tmp_AUTO_8 = str(...listToArray(xs));
  return $procs._$n_str_$o_concat(x0, tmp_AUTO_8) }
}

export function str_spaced(...xs) {
  xs = arrayToList(xs);
  return _$n_str_spaced(true, ...listToArray(xs))
}

export function result_$o_map(res, f) {
  if (arguments.length !== 2) throw $procs._args_throw('result:map', 2, arguments.length);
  let v__2 = res;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_9 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_9.data = null;
    throw err_AUTO_9;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.ok) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let value = $procs._$n_enum_$o_nth(v__2, 1);
  let tmp_AUTO_10 = $procs._$n_enum_$o_definition(res);
  let tmp_AUTO_11 = f(value);
  return $procs._PCT__$o__$o_(tmp_AUTO_10, _t_.ok, tmp_AUTO_11)
   }
   else if (($procs.identical_$q_(tag__1, _t_.err) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let err = $procs._$n_enum_$o_nth(v__2, 1);
  let tmp_AUTO_12 = $procs._$n_enum_$o_definition(res);
  return $procs._PCT__$o__$o_(tmp_AUTO_12, _t_.err, err)
   } else { let err_AUTO_13 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_13.data = null;
  throw err_AUTO_13; }


}

export function result_$o_and_then(res, f) {
  if (arguments.length !== 2) throw $procs._args_throw('result:and-then', 2, arguments.length);
  let v__2 = res;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_14 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_14.data = null;
    throw err_AUTO_14;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.ok) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let value = $procs._$n_enum_$o_nth(v__2, 1);
  return f(value)
   }
   else if (($procs.identical_$q_(tag__1, _t_.err) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let err = $procs._$n_enum_$o_nth(v__2, 1);
  let tmp_AUTO_15 = $procs._$n_enum_$o_definition(res);
  return $procs._PCT__$o__$o_(tmp_AUTO_15, _t_.err, err)
   } else { let err_AUTO_16 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_16.data = null;
  throw err_AUTO_16; }


}

export function result_$o_err_$q_(res) {
  if (arguments.length !== 1) throw $procs._args_throw('result:err?', 1, arguments.length);
  let v__2 = res;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_17 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_17.data = null;
    throw err_AUTO_17;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.ok) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let _ = $procs._$n_enum_$o_nth(v__2, 1);
  return false
   }
   else if (($procs.identical_$q_(tag__1, _t_.err) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let _ = $procs._$n_enum_$o_nth(v__2, 1);
  return true
   } else { let err_AUTO_18 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_18.data = null;
  throw err_AUTO_18; }


}

export function result_$o_map_err(res, f) {
  if (arguments.length !== 2) throw $procs._args_throw('result:map-err', 2, arguments.length);
  let v__2 = res;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_19 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_19.data = null;
    throw err_AUTO_19;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.ok) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let value = $procs._$n_enum_$o_nth(v__2, 1);
  let tmp_AUTO_20 = $procs._$n_enum_$o_definition(res);
  return $procs._PCT__$o__$o_(tmp_AUTO_20, _t_.ok, value)
   }
   else if (($procs.identical_$q_(tag__1, _t_.err) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let err = $procs._$n_enum_$o_nth(v__2, 1);
  let tmp_AUTO_21 = $procs._$n_enum_$o_definition(res);
  let tmp_AUTO_22 = f(err);
  return $procs._PCT__$o__$o_(tmp_AUTO_21, _t_.err, tmp_AUTO_22)
   } else { let err_AUTO_23 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_23.data = null;
  throw err_AUTO_23; }


}

export function result_$o_ok_$q_(res) {
  if (arguments.length !== 1) throw $procs._args_throw('result:ok?', 1, arguments.length);
  let v__2 = res;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_24 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_24.data = null;
    throw err_AUTO_24;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.ok) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let _ = $procs._$n_enum_$o_nth(v__2, 1);
  return true
   }
   else if (($procs.identical_$q_(tag__1, _t_.err) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let _ = $procs._$n_enum_$o_nth(v__2, 1);
  return false
   } else { let err_AUTO_25 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_25.data = null;
  throw err_AUTO_25; }


}

export function result_$o_or_else(res, fallback) {
  if (arguments.length !== 2) throw $procs._args_throw('result:or-else', 2, arguments.length);
  let v__2 = res;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_26 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_26.data = null;
    throw err_AUTO_26;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.ok) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let _ = $procs._$n_enum_$o_nth(v__2, 1);
  return res
   }
   else if (($procs.identical_$q_(tag__1, _t_.err) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let _ = $procs._$n_enum_$o_nth(v__2, 1);
  return fallback()
   } else { let err_AUTO_27 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_27.data = null;
  throw err_AUTO_27; }


}

export function result_$o_unwrap_or(res, fallback) {
  if (arguments.length !== 2) throw $procs._args_throw('result:unwrap-or', 2, arguments.length);
  let v__2 = res;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_28 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_28.data = null;
    throw err_AUTO_28;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.ok) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let value = $procs._$n_enum_$o_nth(v__2, 1);
  return value
   }
   else if (($procs.identical_$q_(tag__1, _t_.err) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let _ = $procs._$n_enum_$o_nth(v__2, 1);
  return fallback
   } else { let err_AUTO_29 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_29.data = null;
  throw err_AUTO_29; }


}

export function enum_def_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('enum-def?', 1, arguments.length);
  let tmp_AUTO_36 = $procs.type_of(x);
  return $procs._$n__$e_(tmp_AUTO_36, _t_["enum-def"])
}

export function every_$q_(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('every?', 2, arguments.length);
  let tmp_AUTO_37 = function _PCT_every_$q_(acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%every?', 2, arguments.length);

    if (f(x)) { return $procs._$o__$o_(false, acc) } else { return $procs._$o__$o_(true, false) }
  }
  ;
  return $procs.foldl_shortcut(xs, true, true, tmp_AUTO_37)
}

export function struct_def_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('struct-def?', 1, arguments.length);
  let tmp_AUTO_38 = $procs.type_of(x);
  return $procs._$n__$e_(tmp_AUTO_38, _t_["struct-def"])
}

export function impl_traits(x, ...traits) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('impl-traits', 1, arguments.length);
  traits = arrayToList(traits);
  {

    if ($procs.not((function _fn_(){
      let tmp_AUTO_39 = function f_PCT_(trait) {
        if (arguments.length !== 1) throw $procs._args_throw('f%', 1, arguments.length);
        let tmp_AUTO_40 = $procs.type_of(trait);
        return _$e_(_t_.impl, tmp_AUTO_40)
      }
      ;
      return every_$q_(traits, tmp_AUTO_39);
    })())) { let err_AUTO_41 = new Error("impl-traits misuse. Expected: impl arguments are :impl values. Actual: found non-impl argument. Fix: pass values created by `defimpl`.");
    err_AUTO_41.data = null;
    throw err_AUTO_41; } else {  null; };
  }

  if (struct_def_$q_(x)) { return $procs._$n_struct_def_$o_impl_traits(x, ...listToArray(traits)) }
   else if (enum_def_$q_(x)) { return $procs._$n_enum_def_$o_impl_traits(x, ...listToArray(traits)) } else { let err_AUTO_42 = new Error(str_spaced("impl-traits misuse. Expected: first argument is struct/enum definition. Actual:", $procs.type_of(x), "Fix: attach impls to `defstruct`/`defenum` result, then construct instances from that definition."));
  err_AUTO_42.data = null;
  throw err_AUTO_42; }
}

export function _PCT_err(message) {
  if (arguments.length !== 1) throw $procs._args_throw('%err', 1, arguments.length);
  return $procs._PCT__$o__$o_(Result, _t_.err, message)
}

export function option_$o_map(opt, f) {
  if (arguments.length !== 2) throw $procs._args_throw('option:map', 2, arguments.length);
  let v__2 = opt;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_44 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_44.data = null;
    throw err_AUTO_44;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.some) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let value = $procs._$n_enum_$o_nth(v__2, 1);
  let tmp_AUTO_45 = $procs._$n_enum_$o_definition(opt);
  let tmp_AUTO_46 = f(value);
  return $procs._PCT__$o__$o_(tmp_AUTO_45, _t_.some, tmp_AUTO_46)
   }
   else if (($procs.identical_$q_(tag__1, _t_.none) ? $procs.identical_$q_(1, $procs._$n_enum_$o_count(v__2)) : false)) { let tmp_AUTO_47 = $procs._$n_enum_$o_definition(opt);
  return $procs._PCT__$o__$o_(tmp_AUTO_47, _t_.none)
   } else { let err_AUTO_48 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_48.data = null;
  throw err_AUTO_48; }


}

export function option_$o_and_then(opt, f) {
  if (arguments.length !== 2) throw $procs._args_throw('option:and-then', 2, arguments.length);
  let v__2 = opt;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_49 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_49.data = null;
    throw err_AUTO_49;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.some) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let value = $procs._$n_enum_$o_nth(v__2, 1);
  return f(value)
   }
   else if (($procs.identical_$q_(tag__1, _t_.none) ? $procs.identical_$q_(1, $procs._$n_enum_$o_count(v__2)) : false)) { let tmp_AUTO_50 = $procs._$n_enum_$o_definition(opt);
  return $procs._PCT__$o__$o_(tmp_AUTO_50, _t_.none)
   } else { let err_AUTO_51 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_51.data = null;
  throw err_AUTO_51; }


}

export function option_$o_fold(opt, on_none, on_some) {
  if (arguments.length !== 3) throw $procs._args_throw('option:fold', 3, arguments.length);
  let v__2 = opt;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_52 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_52.data = null;
    throw err_AUTO_52;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.some) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let value = $procs._$n_enum_$o_nth(v__2, 1);
  return on_some(value)
   }
   else if (($procs.identical_$q_(tag__1, _t_.none) ? $procs.identical_$q_(1, $procs._$n_enum_$o_count(v__2)) : false)) { return on_none()
   } else { let err_AUTO_53 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_53.data = null;
  throw err_AUTO_53; }


}

export function option_$o_none_$q_(opt) {
  if (arguments.length < 0) throw $procs._args_between_throw('option:none?', 0, 1, arguments.length);
  if (arguments.length > 1) throw $procs._args_between_throw('option:none?', 0, 1, arguments.length);
  if (arguments.length >= 0 && arguments.length <= 0) opt = _PCT_none();
  let v__2 = opt;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_54 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_54.data = null;
    throw err_AUTO_54;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.some) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let _ = $procs._$n_enum_$o_nth(v__2, 1);
  return false
   }
   else if (($procs.identical_$q_(tag__1, _t_.none) ? $procs.identical_$q_(1, $procs._$n_enum_$o_count(v__2)) : false)) { return true
   } else { let err_AUTO_55 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_55.data = null;
  throw err_AUTO_55; }


}

export function option_$o_or_else(opt, fallback) {
  if (arguments.length !== 2) throw $procs._args_throw('option:or-else', 2, arguments.length);
  let v__2 = opt;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_56 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_56.data = null;
    throw err_AUTO_56;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.some) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let _ = $procs._$n_enum_$o_nth(v__2, 1);
  return opt
   }
   else if (($procs.identical_$q_(tag__1, _t_.none) ? $procs.identical_$q_(1, $procs._$n_enum_$o_count(v__2)) : false)) { return fallback()
   } else { let err_AUTO_57 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_57.data = null;
  throw err_AUTO_57; }


}

export function option_$o_some_$q_(opt) {
  if (arguments.length < 0) throw $procs._args_between_throw('option:some?', 0, 1, arguments.length);
  if (arguments.length > 1) throw $procs._args_between_throw('option:some?', 0, 1, arguments.length);
  if (arguments.length >= 0 && arguments.length <= 0) opt = _PCT_none();
  let v__2 = opt;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_58 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_58.data = null;
    throw err_AUTO_58;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.some) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let _ = $procs._$n_enum_$o_nth(v__2, 1);
  return true
   }
   else if (($procs.identical_$q_(tag__1, _t_.none) ? $procs.identical_$q_(1, $procs._$n_enum_$o_count(v__2)) : false)) { return false
   } else { let err_AUTO_59 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_59.data = null;
  throw err_AUTO_59; }


}

export function option_$o_unwrap(opt) {
  if (arguments.length < 0) throw $procs._args_between_throw('option:unwrap', 0, 1, arguments.length);
  if (arguments.length > 1) throw $procs._args_between_throw('option:unwrap', 0, 1, arguments.length);
  if (arguments.length >= 0 && arguments.length <= 0) opt = _PCT_none();
  let v__2 = opt;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_60 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_60.data = null;
    throw err_AUTO_60;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.some) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let value = $procs._$n_enum_$o_nth(v__2, 1);
  return value
   }
   else if (($procs.identical_$q_(tag__1, _t_.none) ? $procs.identical_$q_(1, $procs._$n_enum_$o_count(v__2)) : false)) { let err_AUTO_61 = new Error("option:unwrap-received-none");
  err_AUTO_61.data = null;
  throw err_AUTO_61;
   } else { let err_AUTO_62 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_62.data = null;
  throw err_AUTO_62; }


}

export function option_$o_unwrap_or(opt, fallback) {
  if (arguments.length !== 2) throw $procs._args_throw('option:unwrap-or', 2, arguments.length);
  let v__2 = opt;
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_63 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_63.data = null;
    throw err_AUTO_63;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.some) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__2)) : false)) { let value = $procs._$n_enum_$o_nth(v__2, 1);
  return value
   }
   else if (($procs.identical_$q_(tag__1, _t_.none) ? $procs.identical_$q_(1, $procs._$n_enum_$o_count(v__2)) : false)) { return fallback
   } else { let err_AUTO_64 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_64.data = null;
  throw err_AUTO_64; }


}

export function _PCT_none() {
  if (arguments.length !== 0) throw $procs._args_throw('%none', 0, arguments.length);
  return $procs._PCT__$o__$o_(Option, _t_.none)
}

export function _PCT_ok(value) {
  if (arguments.length !== 1) throw $procs._args_throw('%ok', 1, arguments.length);
  return $procs._PCT__$o__$o_(Result, _t_.ok, value)
}

export function _PCT_some(value) {
  if (arguments.length !== 1) throw $procs._args_throw('%some', 1, arguments.length);
  return $procs._PCT__$o__$o_(Option, _t_.some, value)
}

export function _$n_str_spaced(head_$q_, x0, ...xs) {
  if (arguments.length < 2) throw $procs._args_fewer_throw('&str-spaced', 2, arguments.length);
  xs = arrayToList(xs);

  if ($procs._$n_list_$o_empty_$q_(xs)) { 
  if (head_$q_) { return $procs._$n_str(x0) }
   else if ($procs.nil_$q_(x0)) { return "" } else { return $procs._$n_str_$o_concat(" ", x0) } }
   else if (some_$q_(x0)) { let tmp_AUTO_73 = (head_$q_ ? $procs._$n_str(x0) : $procs._$n_str_$o_concat(" ", x0));
  let tmp_AUTO_74 = _$n_str_spaced(false, ...listToArray(xs));
  return $procs._$n_str_$o_concat(tmp_AUTO_73, tmp_AUTO_74) } else { return _$n_str_spaced(head_$q_, ...listToArray(xs)) }
}

export function _$n__LT__$e_(a, b) {
  if (arguments.length !== 2) throw $procs._args_throw('&<=', 2, arguments.length);
  {
    {

    if ($procs.not(true)) { let err_AUTO_75 = new Error(str_spaced("expects 1st argument to be string, got:", "expects numbers for &<="));
    err_AUTO_75.data = null;
    throw err_AUTO_75; } else {  null; };
    }
    null;
  }

  if ($procs._$n__LT_(a, b)) { return true } else { return $procs._$n__$e_(a, b) }
}

export function _$n__GT__$e_(a, b) {
  if (arguments.length !== 2) throw $procs._args_throw('&>=', 2, arguments.length);
  {
    {

    if ($procs.not(true)) { let err_AUTO_76 = new Error(str_spaced("expects 1st argument to be string, got:", "expects numbers for &>="));
    err_AUTO_76.data = null;
    throw err_AUTO_76; } else {  null; };
    }
    null;
  }

  if ($procs._$n__GT_(a, b)) { return true } else { return $procs._$n__$e_(a, b) }
}

export function first(x) {
  if (arguments.length !== 1) throw $procs._args_throw('first', 1, arguments.length);

  if ($procs.list_$q_(x)) { 
  if ($procs._$n_list_$o_empty_$q_(x)) { return _PCT_none() } else { let tmp_AUTO_77 = $procs._$n_list_$o_first(x);
  return _PCT_some(tmp_AUTO_77) } }
   else if ($procs.string_$q_(x)) { 
  if ($procs._$n_str_$o_empty_$q_(x)) { return _PCT_none() } else { let tmp_AUTO_78 = $procs._$n_str_$o_first(x);
  return _PCT_some(tmp_AUTO_78) } }
   else if ($procs.enum_$q_(x)) { 
  if ($procs._$n__$e_(0, $procs._$n_enum_$o_count(x))) { return _PCT_none() } else { let tmp_AUTO_79 = $procs._$n_enum_$o_nth(x, 0);
  return _PCT_some(tmp_AUTO_79) } } else { let err_AUTO_80 = new Error(str_spaced("first", "expected", "a", "list,", "string,", "or", "enum,", "got:", x));
  err_AUTO_80.data = null;
  throw err_AUTO_80; }
}

export function nth(x, i) {
  if (arguments.length !== 2) throw $procs._args_throw('nth', 2, arguments.length);

  if ($procs.not(true)) { return _PCT_none() }
   else if ($procs.list_$q_(x)) { 
  if ((_$n__GT__$e_(i, 0) ? (function _fn_(){
    let v1__1 = $procs._$n__LT_(i, $procs._$n_list_$o_count(x));

    if (v1__1) { return v1__1 } else { return false }
  })() : false)) { let tmp_AUTO_81 = $procs._$n_list_$o_nth(x, i);
  return _PCT_some(tmp_AUTO_81) } else { return _PCT_none() } }
   else if ($procs.string_$q_(x)) { 
  if ((_$n__GT__$e_(i, 0) ? (function _fn_(){
    let v1__2 = $procs._$n__LT_(i, $procs._$n_str_$o_count(x));

    if (v1__2) { return v1__2 } else { return false }
  })() : false)) { let tmp_AUTO_82 = $procs._$n_str_$o_nth(x, i);
  return _PCT_some(tmp_AUTO_82) } else { return _PCT_none() } }
   else if ($procs.enum_$q_(x)) { 
  if ((_$n__GT__$e_(i, 0) ? (function _fn_(){
    let v1__3 = $procs._$n__LT_(i, $procs._$n_enum_$o_count(x));

    if (v1__3) { return v1__3 } else { return false }
  })() : false)) { let tmp_AUTO_83 = $procs._$n_enum_$o_nth(x, i);
  return _PCT_some(tmp_AUTO_83) } else { return _PCT_none() } } else { let err_AUTO_84 = new Error(str_spaced("nth", "expected", "a", "list,", "string,", "or", "enum,", "got:", x));
  err_AUTO_84.data = null;
  throw err_AUTO_84; }
}

export function get(base, k) {
  if (arguments.length !== 2) throw $procs._args_throw('get', 2, arguments.length);

  if ($procs.map_$q_(base)) { 
  if ($procs._$n_map_$o_contains_$q_(base, k)) { let tmp_AUTO_85 = $procs._$n_map_$o_get(base, k);
  return _PCT_some(tmp_AUTO_85) } else { return _PCT_none() } }
   else if ($procs.struct_$q_(base)) { let err_AUTO_86 = new Error("get does not read Struct fields; use (:field value) so the checker can enforce the declared type");
  err_AUTO_86.data = null;
  throw err_AUTO_86; }
   else if ((function _fn_(){
    let v1__1 = $procs.list_$q_(base);

    if (($procs.nil_$q_(v1__1) ? true : $procs._$n__$e_(false, v1__1))) { let v1__2 = $procs.string_$q_(base);

    if (($procs.nil_$q_(v1__2) ? true : $procs._$n__$e_(false, v1__2))) { return $procs.enum_$q_(base) } else { return v1__2 }
     } else { return v1__1 }
  })()) { 
  if ($procs.number_$q_(k)) { return nth(base, k) } else { return _PCT_none() } } else { let err_AUTO_87 = new Error(str_spaced("get", "expected", "a", "map", "or", "indexed", "collection,", "got:", base));
  err_AUTO_87.data = null;
  throw err_AUTO_87; }
}

export function _$n_fn_$o_apply(f, g) {
  if (arguments.length !== 2) throw $procs._args_throw('&fn:apply', 2, arguments.length);
  return function f_PCT_(x) {
    if (arguments.length !== 1) throw $procs._args_throw('f%', 1, arguments.length);
    let tmp_AUTO_103 = f(x);
    return g(x, tmp_AUTO_103)
  }

}

export function _$n_fn_$o_bind(m, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&fn:bind', 2, arguments.length);
  return function f_PCT_(x) {
    if (arguments.length !== 1) throw $procs._args_throw('f%', 1, arguments.length);
    let tmp_AUTO_104 = m(x);
    return f(tmp_AUTO_104, x)
  }

}

export function _$n_fn_$o_map(f, g) {
  if (arguments.length !== 2) throw $procs._args_throw('&fn:map', 2, arguments.length);
  return function f_PCT_(x) {
    if (arguments.length !== 1) throw $procs._args_throw('f%', 1, arguments.length);
    let tmp_AUTO_105 = g(x);
    return f(tmp_AUTO_105)
  }

}

export function reduce(xs, x0, f) {
  if (arguments.length !== 3) throw $procs._args_throw('reduce', 3, arguments.length);
  return $procs.foldl(xs, x0, f)
}

export function merge(x0, ...xs) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('merge', 1, arguments.length);
  xs = arrayToList(xs);
  return reduce(xs, x0, $procs._$n_merge)
}

export function union(base, ...xs) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('union', 1, arguments.length);
  xs = arrayToList(xs);
  let tmp_AUTO_106 = function f_PCT_(acc, item) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);
    return $procs._$n_union(acc, item)
  }
  ;
  return reduce(xs, base, tmp_AUTO_106)
}

export function _$n_fn_$o_mappend(f, g) {
  if (arguments.length !== 2) throw $procs._args_throw('&fn:mappend', 2, arguments.length);
  return function f_PCT_(x) {
    if (arguments.length !== 1) throw $procs._args_throw('f%', 1, arguments.length);
    let v1 = f(x);
    let v2 = g(x);

    if ($procs.list_$q_(v1)) { return $procs._$n_list_$o_concat(v1, v2) }
     else if ($procs.map_$q_(v1)) { return merge(v1, v2) }
     else if ($procs.set_$q_(v1)) { return union(v1, v2) }
     else if ($procs.string_$q_(v1)) { return $procs._$n_str_$o_concat(v1, v2) } else { return $procs.invoke_method("mappend",v1,v2) }


  }

}

export function _$n_get_raw(base, k) {
  if (arguments.length !== 2) throw $procs._args_throw('&get-raw', 2, arguments.length);

  if ($procs.list_$q_(base)) { return $procs._$n_list_$o_nth(base, k) }
   else if ($procs.map_$q_(base)) { return $procs._$n_map_$o_get(base, k) }
   else if ($procs.string_$q_(base)) { return $procs._$n_str_$o_nth(base, k) }
   else if ($procs.enum_$q_(base)) { return $procs._$n_enum_$o_nth(base, k) }
   else if ($procs.struct_$q_(base)) { return $procs._$n_struct_$o_get(base, k) } else { let err_AUTO_115 = new Error(str_spaced("&get-raw", "expected", "a", "collection", "or", "struct,", "got:", base));
  err_AUTO_115.data = null;
  throw err_AUTO_115; }
}

export function _$n_list_$o_map(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:map', 2, arguments.length);
  let tmp_AUTO_116 = $procs._$L_();
  let tmp_AUTO_117 = function _PCT__$n_list_$o_map(acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%&list:map', 2, arguments.length);
    let tmp_AUTO_118 = f(x);
    return $procs.append(acc, tmp_AUTO_118)
  }
  ;
  return $procs.foldl(xs, tmp_AUTO_116, tmp_AUTO_117)
}

export function _$n_list_$o_apply(xs, fs) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:apply', 2, arguments.length);
  let tmp_AUTO_119 = (function _fn_(){
    let tmp_AUTO_120 = function f_PCT_(f) {
      if (arguments.length !== 1) throw $procs._args_throw('f%', 1, arguments.length);
      let tmp_AUTO_121 = function f_PCT_(x) {
        if (arguments.length !== 1) throw $procs._args_throw('f%', 1, arguments.length);
        return f(x)
      }
      ;
      return _$n_list_$o_map(xs, tmp_AUTO_121)
    }
    ;
    return _$n_list_$o_map(fs, tmp_AUTO_120);
  })();
  return $procs._$n_list_$o_concat(...listToArray(tmp_AUTO_119))
}

export function _$n_list_$o_empty(_xs) {
  if (arguments.length !== 1) throw $procs._args_throw('&list:empty', 1, arguments.length);
  return $procs._$L_()
}

export function _$n_list_$o_filter(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:filter', 2, arguments.length);
  let tmp_AUTO_122 = $procs._$L_();
  let tmp_AUTO_123 = function _PCT__$n_list_$o_filter(acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%&list:filter', 2, arguments.length);

    if (f(x)) { return $procs.append(acc, x) } else { return acc }
  }
  ;
  return reduce(xs, tmp_AUTO_122, tmp_AUTO_123)
}

export function _$n_list_$o_filter_pair(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:filter-pair', 2, arguments.length);
  let tmp_AUTO_124 = function _PCT_filter_pair(pair) {
    if (arguments.length !== 1) throw $procs._args_throw('%filter-pair', 1, arguments.length);
    {
      {

      if ($procs.not(true)) { let err_AUTO_125 = new Error(str_spaced("expects 1st argument to be string, got:", "expected a pair"));
      err_AUTO_125.data = null;
      throw err_AUTO_125; } else {  null; };
      }

      if (($procs.list_$q_(pair) ? (function _fn_(){
        let v1__1 = _$e_(2, $procs._$n_list_$o_count(pair));

        if (v1__1) { return v1__1 } else { return false }
      })() : false)) { null } else { {
      console.error($procs.printable("Failed assertion:", $procs.format_to_lisp(new CalcitSliceList([new CalcitSymbol("and"), new CalcitSliceList([new CalcitSymbol("list?"), new CalcitSymbol("pair")]), new CalcitSliceList([new CalcitSymbol("="), 2, new CalcitSliceList([new CalcitSymbol("count"), new CalcitSymbol("pair")])])]))));
      }
      let err_AUTO_126 = new Error("expected a pair (and (list? pair) (= 2 (count pair)))");
      err_AUTO_126.data = null;
      throw err_AUTO_126;
       };
    }
    let tmp_AUTO_127 = $procs._$n_list_$o_nth(pair, 0);
    let tmp_AUTO_128 = $procs._$n_list_$o_nth(pair, 1);
    return f(tmp_AUTO_127, tmp_AUTO_128)
  }
  ;
  return _$n_list_$o_filter(xs, tmp_AUTO_124)
}

export function _$n_list_$o_find_last(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:find-last', 2, arguments.length);
  let tmp_AUTO_129 = _PCT_none();
  let tmp_AUTO_130 = _PCT_none();
  let tmp_AUTO_131 = function f_PCT_(_acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);

    if (f(x)) { let tmp_AUTO_132 = _PCT_some(x);
    return $procs._$o__$o_(true, tmp_AUTO_132) } else { let tmp_AUTO_133 = _PCT_none();
    return $procs._$o__$o_(false, tmp_AUTO_133) }
  }
  ;
  return $procs.foldr_shortcut(xs, tmp_AUTO_129, tmp_AUTO_130, tmp_AUTO_131)
}

export function dec(x) {
  if (arguments.length !== 1) throw $procs._args_throw('dec', 1, arguments.length);
  return $procs._$n__(x, 1)
}

export function _$n_list_$o_find_last_index(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:find-last-index', 2, arguments.length);
  let tmp_AUTO_134 = dec($procs._$n_list_$o_count(xs));
  let tmp_AUTO_135 = _PCT_none();
  let tmp_AUTO_136 = function f_PCT_(idx, x) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);

    if (f(x)) { let tmp_AUTO_137 = _PCT_some(idx);
    return $procs._$o__$o_(true, tmp_AUTO_137) } else { let tmp_AUTO_138 = $procs._$n__(1, idx);
    return $procs._$o__$o_(false, tmp_AUTO_138) }
  }
  ;
  return $procs.foldr_shortcut(xs, tmp_AUTO_134, tmp_AUTO_135, tmp_AUTO_136)
}

export function _$n_list_$o_flatten(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('&list:flatten', 1, arguments.length);

  if ($procs.list_$q_(xs)) { let tmp_AUTO_139 = _$n_list_$o_map(xs, _$n_list_$o_flatten);
  return $procs._$n_list_$o_concat(...listToArray(tmp_AUTO_139)) } else { return $procs._$L_(xs) }
}

export function _$n_list_$o_last_index_of(xs, item) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:last-index-of', 2, arguments.length);
  let tmp_AUTO_140 = dec($procs._$n_list_$o_count(xs));
  let tmp_AUTO_141 = _PCT_none();
  let tmp_AUTO_142 = function f_PCT_(idx, x) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);

    if ($procs._$n__$e_(item, x)) { let tmp_AUTO_143 = _PCT_some(idx);
    return $procs._$o__$o_(true, tmp_AUTO_143) } else { let tmp_AUTO_144 = $procs._$n__(1, idx);
    return $procs._$o__$o_(false, tmp_AUTO_144) }
  }
  ;
  return $procs.foldr_shortcut(xs, tmp_AUTO_140, tmp_AUTO_141, tmp_AUTO_142)
}

export function _$n_list_$o_map_pair(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:map-pair', 2, arguments.length);
  let tmp_AUTO_145 = function _PCT_map_pair(pair) {
    if (arguments.length !== 1) throw $procs._args_throw('%map-pair', 1, arguments.length);
    {
      {

      if ($procs.not(true)) { let err_AUTO_146 = new Error(str_spaced("expects 1st argument to be string, got:", "expected a pair"));
      err_AUTO_146.data = null;
      throw err_AUTO_146; } else {  null; };
      }

      if (($procs.list_$q_(pair) ? (function _fn_(){
        let v1__1 = _$e_(2, $procs._$n_list_$o_count(pair));

        if (v1__1) { return v1__1 } else { return false }
      })() : false)) { null } else { {
      console.error($procs.printable("Failed assertion:", $procs.format_to_lisp(new CalcitSliceList([new CalcitSymbol("and"), new CalcitSliceList([new CalcitSymbol("list?"), new CalcitSymbol("pair")]), new CalcitSliceList([new CalcitSymbol("="), 2, new CalcitSliceList([new CalcitSymbol("count"), new CalcitSymbol("pair")])])]))));
      }
      let err_AUTO_147 = new Error("expected a pair (and (list? pair) (= 2 (count pair)))");
      err_AUTO_147.data = null;
      throw err_AUTO_147;
       };
    }
    let tmp_AUTO_148 = $procs._$n_list_$o_nth(pair, 0);
    let tmp_AUTO_149 = $procs._$n_list_$o_nth(pair, 1);
    return f(tmp_AUTO_148, tmp_AUTO_149)
  }
  ;
  return _$n_list_$o_map(xs, tmp_AUTO_145)
}

export function _$n_list_$o_mappend(x, y) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:mappend', 2, arguments.length);
  return $procs._$n_list_$o_concat(x, y)
}

export let _$n_list_$o_max_loop = function _$n_list_$o_max_loop(xs, acc) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:max-loop', 2, arguments.length);
  
  let times_AUTO_154 = 0;
  while(true) { /* Tail Recursion */
    let ret_AUTO_153 = null;
    if (((times_AUTO_154 & 1023) === 0) && times_AUTO_154 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
    
if ($procs._$n_list_$o_empty_$q_(xs)) { ret_AUTO_153 =acc } else { let x = $procs._$n_list_$o_nth(xs, 0);
let tmp_AUTO_151 = $procs._$n_list_$o_rest(xs);
let tmp_AUTO_152 = ($procs._$n__GT_(x, acc) ? x : acc);
ret_AUTO_153 =$procs.recur(tmp_AUTO_151, tmp_AUTO_152)
 }

    if (ret_AUTO_153 instanceof CalcitRecur) {
      if (ret_AUTO_153.args.length !== 2) throw $procs._args_throw('&list:max-loop', 2, ret_AUTO_153.args.length);
      xs = ret_AUTO_153.args[0];
acc = ret_AUTO_153.args[1];
      
      times_AUTO_154 += 1;
      continue;
    } else {
      return ret_AUTO_153;
    }
  }
}


export function _$n_list_$o_max(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('&list:max', 1, arguments.length);

  if ($procs._$n_list_$o_empty_$q_(xs)) { return _PCT_none() } else { let tmp_AUTO_155 = _$n_list_$o_max_loop($procs._$n_list_$o_rest(xs), $procs._$n_list_$o_nth(xs, 0));
  return _PCT_some(tmp_AUTO_155) }
}

export let _$n_list_$o_min_loop = function _$n_list_$o_min_loop(xs, acc) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:min-loop', 2, arguments.length);
  
  let times_AUTO_160 = 0;
  while(true) { /* Tail Recursion */
    let ret_AUTO_159 = null;
    if (((times_AUTO_160 & 1023) === 0) && times_AUTO_160 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
    
if ($procs._$n_list_$o_empty_$q_(xs)) { ret_AUTO_159 =acc } else { let x = $procs._$n_list_$o_nth(xs, 0);
let tmp_AUTO_157 = $procs._$n_list_$o_rest(xs);
let tmp_AUTO_158 = ($procs._$n__LT_(x, acc) ? x : acc);
ret_AUTO_159 =$procs.recur(tmp_AUTO_157, tmp_AUTO_158)
 }

    if (ret_AUTO_159 instanceof CalcitRecur) {
      if (ret_AUTO_159.args.length !== 2) throw $procs._args_throw('&list:min-loop', 2, ret_AUTO_159.args.length);
      xs = ret_AUTO_159.args[0];
acc = ret_AUTO_159.args[1];
      
      times_AUTO_160 += 1;
      continue;
    } else {
      return ret_AUTO_159;
    }
  }
}


export function _$n_list_$o_min(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('&list:min', 1, arguments.length);

  if ($procs._$n_list_$o_empty_$q_(xs)) { return _PCT_none() } else { let tmp_AUTO_161 = _$n_list_$o_min_loop($procs._$n_list_$o_rest(xs), $procs._$n_list_$o_nth(xs, 0));
  return _PCT_some(tmp_AUTO_161) }
}

export function _$n_list_$o_sort_by(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&list:sort-by', 2, arguments.length);

  if ($procs.tag_$q_(f)) { let tmp_AUTO_162 = function _PCT__$n_list_$o_sort_by(a, b) {
    if (arguments.length !== 2) throw $procs._args_throw('%&list:sort-by', 2, arguments.length);
    let tmp_AUTO_163 = _$n_get_raw(a, f);
    let tmp_AUTO_164 = _$n_get_raw(b, f);
    return $procs._$n_compare(tmp_AUTO_163, tmp_AUTO_164)
  }
  ;
  return $procs.sort(xs, tmp_AUTO_162) } else { let tmp_AUTO_165 = function _PCT__$n_list_$o_sort_by(a, b) {
    if (arguments.length !== 2) throw $procs._args_throw('%&list:sort-by', 2, arguments.length);
    let tmp_AUTO_166 = f(a);
    let tmp_AUTO_167 = f(b);
    return $procs._$n_compare(tmp_AUTO_166, tmp_AUTO_167)
  }
  ;
  return $procs.sort(xs, tmp_AUTO_165) }
}

export function _SUB_(x, ...ys) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('-', 1, arguments.length);
  ys = arrayToList(ys);

  if ($procs._$n_list_$o_empty_$q_(ys)) { return $procs._$n__(0, x) } else { return reduce(ys, x, $procs._$n__) }
}

export function _GT__$e_(x, ...ys) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('>=', 1, arguments.length);
  ys = arrayToList(ys);

  if ($procs._$n__$e_(1, $procs._$n_list_$o_count(ys))) { let tmp_AUTO_168 = $procs._$n_list_$o_nth(ys, 0);
  return _$n__GT__$e_(x, tmp_AUTO_168) } else { return foldl_compare(ys, x, _$n__GT__$e_) }
}

export function any_$q_(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('any?', 2, arguments.length);
  let tmp_AUTO_169 = function _PCT_any_$q_(acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%any?', 2, arguments.length);

    if (f(x)) { return $procs._$o__$o_(true, true) } else { return $procs._$o__$o_(false, acc) }
  }
  ;
  return $procs.foldl_shortcut(xs, false, false, tmp_AUTO_169)
}

export function assoc(x, k, v) {
  if (arguments.length !== 3) throw $procs._args_throw('assoc', 3, arguments.length);

  if ($procs.nil_$q_(x)) { let err_AUTO_170 = new Error(str_spaced("assoc does not work on nil for:", k, v));
  err_AUTO_170.data = null;
  throw err_AUTO_170; }
   else if ($procs.list_$q_(x)) { return $procs._$n_list_$o_assoc(x, k, v) } else { return $procs.invoke_method("assoc",x,k, v) }
}

export function contains_$q_(x, k) {
  if (arguments.length !== 2) throw $procs._args_throw('contains?', 2, arguments.length);

  if ($procs.list_$q_(x)) { return $procs._$n_list_$o_contains_$q_(x, k) } else { return $procs.invoke_method("contains?",x,k) }
}

export function slice(xs, n, m) {
  if (arguments.length < 2) throw $procs._args_between_throw('slice', 2, 3, arguments.length);
  if (arguments.length > 3) throw $procs._args_between_throw('slice', 2, 3, arguments.length);

  if ($procs.nil_$q_(m)) { 
  if ($procs.list_$q_(xs)) { return $procs._$n_list_$o_slice(xs, n) }
   else if ($procs.string_$q_(xs)) { return $procs._$n_str_$o_slice(xs, n) } else { return $procs.invoke_method("slice",xs,n) } }
   else if ($procs.list_$q_(xs)) { return $procs._$n_list_$o_slice(xs, n, m) }
   else if ($procs.string_$q_(xs)) { return $procs._$n_str_$o_slice(xs, n, m) } else { return $procs.invoke_method("slice",xs,n, m) }
}

export function drop(xs, n) {
  if (arguments.length !== 2) throw $procs._args_throw('drop', 2, arguments.length);
  let tmp_AUTO_171 = $procs._$n_list_$o_count(xs);
  return slice(xs, n, tmp_AUTO_171)
}

export function each(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('each', 2, arguments.length);
  let tmp_AUTO_172 = function _PCT_each(_acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%each', 2, arguments.length);
    return f(x)
  }
  ;
  return $procs.foldl(xs, null, tmp_AUTO_172)
}

export function filter_not(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('filter-not', 2, arguments.length);
  let tmp_AUTO_173 = function _PCT_filter_not(x) {
    if (arguments.length !== 1) throw $procs._args_throw('%filter-not', 1, arguments.length);
    let tmp_AUTO_174 = f(x);
    return $procs.not(tmp_AUTO_174)
  }
  ;
  return _$n_list_$o_filter(xs, tmp_AUTO_173)
}

export function find(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('find', 2, arguments.length);
  let tmp_AUTO_175 = _PCT_none();
  let tmp_AUTO_176 = function _PCT_find(_acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%find', 2, arguments.length);

    if (f(x)) { let tmp_AUTO_177 = _PCT_some(x);
    return $procs._$o__$o_(true, tmp_AUTO_177) } else { let tmp_AUTO_178 = _PCT_none();
    return $procs._$o__$o_(false, tmp_AUTO_178) }
  }
  ;
  return $procs.foldl_shortcut(xs, 0, tmp_AUTO_175, tmp_AUTO_176)
}

export function find_index(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('find-index', 2, arguments.length);
  let tmp_AUTO_179 = _PCT_none();
  let tmp_AUTO_180 = function _PCT_find_index(index, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%find-index', 2, arguments.length);

    if (f(x)) { let tmp_AUTO_181 = _PCT_some(index);
    return $procs._$o__$o_(true, tmp_AUTO_181) } else { let tmp_AUTO_182 = $procs._$n__ADD_(1, index);
    return $procs._$o__$o_(false, tmp_AUTO_182) }
  }
  ;
  return $procs.foldl_shortcut(xs, 0, tmp_AUTO_179, tmp_AUTO_180)
}

export let get_in = function get_in(base, path) {
  if (arguments.length !== 2) throw $procs._args_throw('get-in', 2, arguments.length);
  
  let times_AUTO_189 = 0;
  while(true) { /* Tail Recursion */
    let ret_AUTO_188 = null;
    if (((times_AUTO_189 & 1023) === 0) && times_AUTO_189 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
    
if ($procs.nil_$q_(base)) { ret_AUTO_188 =_PCT_none() } else { let v__1 = path;
($procs.not(true) ? (function _fn_(){
  let err_AUTO_184 = new Error("expected a list in list-match");
  err_AUTO_184.data = null;
  throw err_AUTO_184;
})() : null);

if ($procs._$n_list_$o_empty_$q_(v__1)) { ret_AUTO_188 =_PCT_some(base)
 } else { let y0 = $procs._$n_list_$o_nth(v__1, 0);
let ys = $procs._$n_list_$o_slice(v__1, 1);

if ($procs.struct_$q_(base)) { let err_AUTO_185 = new Error("get-in does not traverse Struct fields; use (:field value) so the checker can enforce the declared type");
err_AUTO_185.data = null;
throw err_AUTO_185; } else { let v__3 = get(base, y0);
($procs.not($procs.enum_$q_(v__3)) ? (function _fn_(){
  let err_AUTO_186 = new Error(str("tag-match expected enum value, got", v__3));
  err_AUTO_186.data = null;
  throw err_AUTO_186;
})() : null);
let tag__2 = $procs._$n_enum_$o_nth(v__3, 0);
$procs._$n_enum_$o_validate(v__3, tag__2);

if (($procs.identical_$q_(tag__2, _t_.some) ? $procs.identical_$q_(2, $procs._$n_enum_$o_count(v__3)) : false)) { let value = $procs._$n_enum_$o_nth(v__3, 1);
ret_AUTO_188 =$procs.recur(value, ys)
 }
 else if (($procs.identical_$q_(tag__2, _t_.none) ? $procs.identical_$q_(1, $procs._$n_enum_$o_count(v__3)) : false)) { ret_AUTO_188 =_PCT_none()
 } else { let err_AUTO_187 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__3));
err_AUTO_187.data = null;
throw err_AUTO_187; }

 }


 }
 }

    if (ret_AUTO_188 instanceof CalcitRecur) {
      if (ret_AUTO_188.args.length !== 2) throw $procs._args_throw('get-in', 2, ret_AUTO_188.args.length);
      base = ret_AUTO_188.args[0];
path = ret_AUTO_188.args[1];
      
      times_AUTO_189 += 1;
      continue;
    } else {
      return ret_AUTO_188;
    }
  }
}


export function update(x, k, f) {
  if (arguments.length !== 3) throw $procs._args_throw('update', 3, arguments.length);

  if ($procs.map_$q_(x)) { 
  if ($procs._$n_map_$o_contains_$q_(x, k)) { let tmp_AUTO_190 = f($procs._$n_map_$o_get(x, k));
  return $procs._$n_map_$o_assoc(x, k, tmp_AUTO_190) } else { return x } }
   else if ($procs.list_$q_(x)) { 
  if ($procs._$n_list_$o_contains_$q_(x, k)) { let tmp_AUTO_191 = f($procs._$n_list_$o_nth(x, k));
  return $procs._$n_list_$o_assoc(x, k, tmp_AUTO_191) } else { return x } }
   else if ($procs.enum_$q_(x)) { let tmp_AUTO_192 = f($procs._$n_enum_$o_nth(x, k));
  return $procs._$n_enum_$o_assoc(x, k, tmp_AUTO_192) }
   else if ($procs.struct_$q_(x)) { 
  if (contains_$q_(x, k)) { let tmp_AUTO_193 = f($procs._$n_struct_$o_get(x, k));
  return assoc(x, k, tmp_AUTO_193) } else { return x } } else { let err_AUTO_194 = new Error($procs._$n_str_$o_concat("Cannot update key on item: ", $procs.to_lispy_string(x)));
  err_AUTO_194.data = null;
  throw err_AUTO_194; }
}

export function group_by(xs0, f) {
  if (arguments.length !== 2) throw $procs._args_throw('group-by', 2, arguments.length);
  let tmp_AUTO_195 = $procs._$n__$M_();
  return function _PCT_group_by(acc, xs) {
    if (arguments.length !== 2) throw $procs._args_throw('%group-by', 2, arguments.length);

    let times_AUTO_201 = 0;
    while(true) { /* Tail Recursion */
      let ret_AUTO_200 = null;
      if (((times_AUTO_201 & 1023) === 0) && times_AUTO_201 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
      let v__1 = xs;
  ($procs.not(true) ? (function _fn_(){
    let err_AUTO_197 = new Error("expected a list in list-match");
    err_AUTO_197.data = null;
    throw err_AUTO_197;
  })() : null);

  if ($procs._$n_list_$o_empty_$q_(v__1)) { ret_AUTO_200 =acc
   } else { let x0 = $procs._$n_list_$o_nth(v__1, 0);
  let xss = $procs._$n_list_$o_slice(v__1, 1);
  let key = f(x0);
  let tmp_AUTO_198 = ($procs._$n_map_$o_contains_$q_(acc, key) ? (function _fn_(){
    let tmp_AUTO_199 = function _PCT__BSL_(_PCT_, _PCT_2) {
      if (arguments.length < 0) throw $procs._args_between_throw('%\\', 0, 2, arguments.length);
      if (arguments.length > 2) throw $procs._args_between_throw('%\\', 0, 2, arguments.length);
      return $procs.append(_PCT_, x0)
    }
    ;
    return update(acc, key, tmp_AUTO_199);
  })() : $procs._$n_map_$o_assoc(acc, key, $procs._$L_(x0)));
  ret_AUTO_200 =$procs.recur(tmp_AUTO_198, xss)



   }


      if (ret_AUTO_200 instanceof CalcitRecur) {
        if (ret_AUTO_200.args.length !== 2) throw $procs._args_throw('%group-by', 2, ret_AUTO_200.args.length);
        acc = ret_AUTO_200.args[0];
  xs = ret_AUTO_200.args[1];

        times_AUTO_201 += 1;
        continue;
      } else {
        return ret_AUTO_200;
      }
    }
  }

  (tmp_AUTO_195, xs0)
}

export function identity(x) {
  if (arguments.length !== 1) throw $procs._args_throw('identity', 1, arguments.length);
  return x
}

export function index_of(xs, item) {
  if (arguments.length !== 2) throw $procs._args_throw('index-of', 2, arguments.length);
  let tmp_AUTO_202 = _PCT_none();
  let tmp_AUTO_203 = function _PCT_index_of(index, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%index-of', 2, arguments.length);

    if ($procs._$n__$e_(item, x)) { let tmp_AUTO_204 = _PCT_some(index);
    return $procs._$o__$o_(true, tmp_AUTO_204) } else { let tmp_AUTO_205 = $procs._$n__ADD_(1, index);
    return $procs._$o__$o_(false, tmp_AUTO_205) }
  }
  ;
  return $procs.foldl_shortcut(xs, 0, tmp_AUTO_202, tmp_AUTO_203)
}

export function join(xs0, sep) {
  if (arguments.length !== 2) throw $procs._args_throw('join', 2, arguments.length);
  let tmp_AUTO_206 = $procs._$L_();
  return function _PCT_join(acc, xs, beginning_$q_) {
    if (arguments.length !== 3) throw $procs._args_throw('%join', 3, arguments.length);

    let times_AUTO_212 = 0;
    while(true) { /* Tail Recursion */
      let ret_AUTO_211 = null;
      if (((times_AUTO_212 & 1023) === 0) && times_AUTO_212 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
      let v__1 = xs;
  ($procs.not(true) ? (function _fn_(){
    let err_AUTO_208 = new Error("expected a list in list-match");
    err_AUTO_208.data = null;
    throw err_AUTO_208;
  })() : null);

  if ($procs._$n_list_$o_empty_$q_(v__1)) { ret_AUTO_211 =acc
   } else { let x0 = $procs._$n_list_$o_nth(v__1, 0);
  let xss = $procs._$n_list_$o_slice(v__1, 1);
  let tmp_AUTO_209 = (function _fn_(){
    let tmp_AUTO_210 = (beginning_$q_ ? acc : $procs.append(acc, sep));
    return $procs.append(tmp_AUTO_210, x0);
  })();
  ret_AUTO_211 =$procs.recur(tmp_AUTO_209, xss, false)


   }


      if (ret_AUTO_211 instanceof CalcitRecur) {
        if (ret_AUTO_211.args.length !== 3) throw $procs._args_throw('%join', 3, ret_AUTO_211.args.length);
        acc = ret_AUTO_211.args[0];
  xs = ret_AUTO_211.args[1];
  beginning_$q_ = ret_AUTO_211.args[2];

        times_AUTO_212 += 1;
        continue;
      } else {
        return ret_AUTO_211;
      }
    }
  }

  (tmp_AUTO_206, xs0, true)
}

export function join_str(xs0, sep) {
  if (arguments.length !== 2) throw $procs._args_throw('join-str', 2, arguments.length);
  return function _PCT_join_str(acc, xs, beginning_$q_) {
    if (arguments.length !== 3) throw $procs._args_throw('%join-str', 3, arguments.length);

    let times_AUTO_218 = 0;
    while(true) { /* Tail Recursion */
      let ret_AUTO_217 = null;
      if (((times_AUTO_218 & 1023) === 0) && times_AUTO_218 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
      let v__1 = xs;
  ($procs.not(true) ? (function _fn_(){
    let err_AUTO_214 = new Error("expected a list in list-match");
    err_AUTO_214.data = null;
    throw err_AUTO_214;
  })() : null);

  if ($procs._$n_list_$o_empty_$q_(v__1)) { ret_AUTO_217 =acc
   } else { let x0 = $procs._$n_list_$o_nth(v__1, 0);
  let xss = $procs._$n_list_$o_slice(v__1, 1);
  let tmp_AUTO_215 = (function _fn_(){
    let tmp_AUTO_216 = (beginning_$q_ ? acc : $procs._$n_str_$o_concat(acc, sep));
    return $procs._$n_str_$o_concat(tmp_AUTO_216, x0);
  })();
  ret_AUTO_217 =$procs.recur(tmp_AUTO_215, xss, false)


   }


      if (ret_AUTO_217 instanceof CalcitRecur) {
        if (ret_AUTO_217.args.length !== 3) throw $procs._args_throw('%join-str', 3, ret_AUTO_217.args.length);
        acc = ret_AUTO_217.args[0];
  xs = ret_AUTO_217.args[1];
  beginning_$q_ = ret_AUTO_217.args[2];

        times_AUTO_218 += 1;
        continue;
      } else {
        return ret_AUTO_217;
      }
    }
  }

  ("", xs0, true)
}

export function map_indexed(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('map-indexed', 2, arguments.length);
  let tmp_AUTO_219 = $procs._$L_();
  let tmp_AUTO_220 = function _PCT_map_indexed(acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%map-indexed', 2, arguments.length);
    let tmp_AUTO_221 = f($procs._$n_list_$o_count(acc), x);
    return $procs.append(acc, tmp_AUTO_221)
  }
  ;
  return $procs.foldl(xs, tmp_AUTO_219, tmp_AUTO_220)
}

export function mapcat(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('mapcat', 2, arguments.length);
  let tmp_AUTO_222 = _$n_list_$o_map(xs, f);
  return $procs._$n_list_$o_concat(...listToArray(tmp_AUTO_222))
}

export function pairs_map(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('pairs-map', 1, arguments.length);
  let tmp_AUTO_223 = $procs._$n__$M_();
  let tmp_AUTO_224 = function _PCT_pairs_map(acc, pair) {
    if (arguments.length !== 2) throw $procs._args_throw('%pairs-map', 2, arguments.length);
    {
      {

      if ($procs.not(true)) { let err_AUTO_225 = new Error(str_spaced("expects 1st argument to be string, got:", "expects pair for pairs-map"));
      err_AUTO_225.data = null;
      throw err_AUTO_225; } else {  null; };
      }

      if ($procs._$n__$e_(2, $procs._$n_list_$o_count(pair))) { null } else { {
      console.error($procs.printable("Failed assertion:", $procs.format_to_lisp(new CalcitSliceList([new CalcitSymbol("if"), new CalcitSliceList([new CalcitSymbol("list?"), new CalcitSymbol("pair")]), new CalcitSliceList([new CalcitSymbol("&="), 2, new CalcitSliceList([new CalcitSymbol("&list:count"), new CalcitSymbol("pair")])]), false]))));
      }
      let err_AUTO_226 = new Error("expects pair for pairs-map (if (list? pair) (&= 2 (&list:count pair)) false)");
      err_AUTO_226.data = null;
      throw err_AUTO_226;
       };
    }
    let tmp_AUTO_227 = $procs._$n_list_$o_first(pair);
    let tmp_AUTO_228 = $procs._$n_list_$o_last(pair);
    return $procs._$n_map_$o_assoc(acc, tmp_AUTO_227, tmp_AUTO_228)
  }
  ;
  return reduce(xs, tmp_AUTO_223, tmp_AUTO_224)
}

export function take(xs, n) {
  if (arguments.length !== 2) throw $procs._args_throw('take', 2, arguments.length);

  if (_GT__$e_(n, $procs._$n_list_$o_count(xs))) { return xs } else { return slice(xs, 0, n) }
}

export function take_last(xs, n) {
  if (arguments.length !== 2) throw $procs._args_throw('take-last', 2, arguments.length);

  if (_GT__$e_(n, $procs._$n_list_$o_count(xs))) { return xs } else { let tmp_AUTO_229 = _SUB_($procs._$n_list_$o_count(xs), n);
  let tmp_AUTO_230 = $procs._$n_list_$o_count(xs);
  return slice(xs, tmp_AUTO_229, tmp_AUTO_230) }
}

export function _$n_map_$o_add_entry(xs, pair) {
  if (arguments.length !== 2) throw $procs._args_throw('&map:add-entry', 2, arguments.length);
  {
    {

    if ($procs.not(true)) { let err_AUTO_292 = new Error(str_spaced("expects 1st argument to be string, got:", "&map:add-entry expected value in a pair"));
    err_AUTO_292.data = null;
    throw err_AUTO_292; } else {  null; };
    }

    if ((function _fn_(){
      let v1__1 = $procs._$n__$e_(2, $procs._$n_list_$o_count(pair));

      if (v1__1) { return v1__1 } else { return false }
    })()) { null } else { {
    console.error($procs.printable("Failed assertion:", $procs.format_to_lisp(new CalcitSliceList([new CalcitSymbol("and"), new CalcitSliceList([new CalcitSymbol("list?"), new CalcitSymbol("pair")]), new CalcitSliceList([new CalcitSymbol("&="), 2, new CalcitSliceList([new CalcitSymbol("count"), new CalcitSymbol("pair")])])]))));
    }
    let err_AUTO_293 = new Error("&map:add-entry expected value in a pair (and (list? pair) (&= 2 (count pair)))");
    err_AUTO_293.data = null;
    throw err_AUTO_293;
     };
  }
  let tmp_AUTO_294 = $procs._$n_list_$o_nth(pair, 0);
  let tmp_AUTO_295 = $procs._$n_list_$o_nth(pair, 1);
  return $procs._$n_map_$o_assoc(xs, tmp_AUTO_294, tmp_AUTO_295)
}

export function _$n_map_$o_empty(_xs) {
  if (arguments.length !== 1) throw $procs._args_throw('&map:empty', 1, arguments.length);
  return $procs._$n__$M_()
}

export function _$n_map_$o_filter(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&map:filter', 2, arguments.length);
  let tmp_AUTO_296 = $procs._$n__$M_();
  let tmp_AUTO_297 = function _PCT__$n_map_$o_filter(acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%&map:filter', 2, arguments.length);

    if (f(x)) { let tmp_AUTO_298 = $procs._$n_list_$o_nth(x, 0);
    let tmp_AUTO_299 = $procs._$n_list_$o_nth(x, 1);
    return $procs._$n_map_$o_assoc(acc, tmp_AUTO_298, tmp_AUTO_299) } else { return acc }
  }
  ;
  return reduce(xs, tmp_AUTO_296, tmp_AUTO_297)
}

export function _$n_map_$o_filter_kv(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&map:filter-kv', 2, arguments.length);
  let tmp_AUTO_300 = $procs._$n__$M_();
  let tmp_AUTO_301 = function _PCT_map_$o_filter_kv(acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%map:filter-kv', 2, arguments.length);

    if (f($procs._$n_list_$o_nth(x, 0), $procs._$n_list_$o_nth(x, 1))) { let tmp_AUTO_302 = $procs._$n_list_$o_nth(x, 0);
    let tmp_AUTO_303 = $procs._$n_list_$o_nth(x, 1);
    return $procs._$n_map_$o_assoc(acc, tmp_AUTO_302, tmp_AUTO_303) } else { return acc }
  }
  ;
  return reduce(xs, tmp_AUTO_300, tmp_AUTO_301)
}

export function _$n_map_$o_map(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&map:map', 2, arguments.length);
  let tmp_AUTO_304 = $procs._$n__$M_();
  let tmp_AUTO_305 = function _$n_map_$o_map(acc, pair) {
    if (arguments.length !== 2) throw $procs._args_throw('&map:map', 2, arguments.length);
    let result = f(pair);
    (function _fn_(){
      {

      if ($procs.not(true)) { let err_AUTO_306 = new Error(str_spaced("expects 1st argument to be string, got:", "expected pair returned when mapping hashmap"));
      err_AUTO_306.data = null;
      throw err_AUTO_306; } else {  null; };
      }

      if (($procs.list_$q_(result) ? (function _fn_(){
        let v1__1 = $procs._$n__$e_(2, $procs._$n_list_$o_count(result));

        if (v1__1) { return v1__1 } else { return false }
      })() : false)) { return null } else { {
      console.error($procs.printable("Failed assertion:", $procs.format_to_lisp(new CalcitSliceList([new CalcitSymbol("and"), new CalcitSliceList([new CalcitSymbol("list?"), new CalcitSymbol("result")]), new CalcitSliceList([new CalcitSymbol("&="), 2, new CalcitSliceList([new CalcitSymbol("&list:count"), new CalcitSymbol("result")])])]))));
      }
      let err_AUTO_307 = new Error("expected pair returned when mapping hashmap (and (list? result) (&= 2 (&list:count result)))");
      err_AUTO_307.data = null;
      throw err_AUTO_307;
       }
    })();
    let tmp_AUTO_308 = $procs._$n_list_$o_nth(result, 0);
    let tmp_AUTO_309 = $procs._$n_list_$o_nth(result, 1);
    return $procs._$n_map_$o_assoc(acc, tmp_AUTO_308, tmp_AUTO_309)

  }
  ;
  return $procs.foldl(xs, tmp_AUTO_304, tmp_AUTO_305)
}

export function _$n_map_$o_map_list(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&map:map-list', 2, arguments.length);
  let tmp_AUTO_310 = $procs._$L_();
  let tmp_AUTO_311 = function _PCT__$n_map_$o_map_list(acc, pair) {
    if (arguments.length !== 2) throw $procs._args_throw('%&map:map-list', 2, arguments.length);
    let tmp_AUTO_312 = f(pair);
    return $procs.append(acc, tmp_AUTO_312)
  }
  ;
  return $procs.foldl(xs, tmp_AUTO_310, tmp_AUTO_311)
}

export function destruct_map(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('destruct-map', 1, arguments.length);
  let pair = $procs._$n_map_$o_destruct(xs);

  if ($procs.nil_$q_(pair)) { return $procs._PCT__$o__$o_(MapDestruct, _t_.none) } else { return $procs._PCT__$o__$o_(MapDestruct, _t_.some, ...listToArray(pair)) }

}

export function include(base, ...xs) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('include', 1, arguments.length);
  xs = arrayToList(xs);
  let tmp_AUTO_314 = function f_PCT_(acc, item) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);
    return $procs._$n_include(acc, item)
  }
  ;
  return reduce(xs, base, tmp_AUTO_314)
}

export function map(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('map', 2, arguments.length);

  if ($procs.list_$q_(xs)) { return _$n_list_$o_map(xs, f) }
   else if ($procs.set_$q_(xs)) { let tmp_AUTO_315 = $procs._SHA__$M_();
  let tmp_AUTO_316 = function _PCT_map(acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%map', 2, arguments.length);
    let tmp_AUTO_317 = f(x);
    return include(acc, tmp_AUTO_317)
  }
  ;
  return $procs.foldl(xs, tmp_AUTO_315, tmp_AUTO_316) } else { return $procs.invoke_method("map",xs,f) }
}

export function keys(x) {
  if (arguments.length !== 1) throw $procs._args_throw('keys', 1, arguments.length);
  let tmp_AUTO_318 = $procs.to_pairs(x);
  return map(tmp_AUTO_318, $procs._$n_list_$o_first)
}

export function map_kv(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('map-kv', 2, arguments.length);
  let tmp_AUTO_319 = $procs._$n__$M_();
  let tmp_AUTO_320 = function _PCT_map_kv(acc, pair) {
    if (arguments.length !== 2) throw $procs._args_throw('%map-kv', 2, arguments.length);
    let result = f($procs._$n_list_$o_nth(pair, 0), $procs._$n_list_$o_nth(pair, 1));

    if ($procs.list_$q_(result)) { {
    {

    if ($procs.not(true)) { let err_AUTO_321 = new Error(str_spaced("expects 1st argument to be string, got:", "expected pair returned when mapping hashmap"));
    err_AUTO_321.data = null;
    throw err_AUTO_321; } else {  null; };
    }

    if ($procs._$n__$e_(2, $procs._$n_list_$o_count(result))) { null } else { {
    console.error($procs.printable("Failed assertion:", $procs.format_to_lisp(new CalcitSliceList([new CalcitSymbol("&="), 2, new CalcitSliceList([new CalcitSymbol("&list:count"), new CalcitSymbol("result")])]))));
    }
    let err_AUTO_322 = new Error("expected pair returned when mapping hashmap (&= 2 (&list:count result))");
    err_AUTO_322.data = null;
    throw err_AUTO_322;
     }
    ;
    }
    let tmp_AUTO_323 = $procs._$n_list_$o_nth(result, 0);
    let tmp_AUTO_324 = $procs._$n_list_$o_nth(result, 1);
    return $procs._$n_map_$o_assoc(acc, tmp_AUTO_323, tmp_AUTO_324)
     }
     else if ((function _fn_(){
      let v1__1 = $procs.nil_$q_(result);

      if (($procs.nil_$q_(v1__1) ? true : $procs._$n__$e_(false, v1__1))) { return $procs.enum_$q_(result) } else { return v1__1 }
    })()) { return acc } else { let err_AUTO_325 = new Error(str_spaced("map-kv expected list or nil, got:", result));
    err_AUTO_325.data = null;
    throw err_AUTO_325; }

  }
  ;
  return $procs.foldl(xs, tmp_AUTO_319, tmp_AUTO_320)
}

export function vals(x) {
  if (arguments.length !== 1) throw $procs._args_throw('vals', 1, arguments.length);
  let tmp_AUTO_326 = $procs.to_pairs(x);
  return map(tmp_AUTO_326, $procs._$n_list_$o_last)
}

export function _$n_number_$o_empty(_x) {
  if (arguments.length !== 1) throw $procs._args_throw('&number:empty', 1, arguments.length);
  return 0
}

export function inc(x) {
  if (arguments.length !== 1) throw $procs._args_throw('inc', 1, arguments.length);
  return $procs._$n__ADD_(x, 1)
}

export function negate(x) {
  if (arguments.length !== 1) throw $procs._args_throw('negate', 1, arguments.length);
  return $procs._$n__(0, x)
}

export function _$n_set_$o_empty(_xs) {
  if (arguments.length !== 1) throw $procs._args_throw('&set:empty', 1, arguments.length);
  return $procs._SHA__$M_()
}

export function _$n_set_$o_filter(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&set:filter', 2, arguments.length);
  let tmp_AUTO_379 = $procs._SHA__$M_();
  let tmp_AUTO_380 = function _PCT__$n_set_$o_filter(acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%&set:filter', 2, arguments.length);

    if (f(x)) { return $procs._$n_include(acc, x) } else { return acc }
  }
  ;
  return reduce(xs, tmp_AUTO_379, tmp_AUTO_380)
}

export function _$n_set_$o_map(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('&set:map', 2, arguments.length);
  let tmp_AUTO_381 = $procs._SHA__$M_();
  let tmp_AUTO_382 = function _PCT__$n_set_$o_map(acc, x) {
    if (arguments.length !== 2) throw $procs._args_throw('%&set:map', 2, arguments.length);
    let tmp_AUTO_383 = f(x);
    return $procs._$n_include(acc, tmp_AUTO_383)
  }
  ;
  return reduce(xs, tmp_AUTO_381, tmp_AUTO_382)
}

export function _$n_set_$o_max(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('&set:max', 1, arguments.length);
  let tmp_AUTO_384 = $procs._$n_set_$o_to_list(xs);
  return _$n_list_$o_max(tmp_AUTO_384)
}

export function _$n_set_$o_min(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('&set:min', 1, arguments.length);
  let tmp_AUTO_385 = $procs._$n_set_$o_to_list(xs);
  return _$n_list_$o_min(tmp_AUTO_385)
}

export function destruct_set(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('destruct-set', 1, arguments.length);
  let pair = $procs._$n_set_$o_destruct(xs);

  if ($procs.nil_$q_(pair)) { return $procs._PCT__$o__$o_(SetDestruct, _t_.none) } else { let tmp_AUTO_386 = $procs._$n_list_$o_nth(pair, 0);
  let tmp_AUTO_387 = $procs._$n_list_$o_nth(pair, 1);
  return $procs._PCT__$o__$o_(SetDestruct, _t_.some, tmp_AUTO_386, tmp_AUTO_387) }

}

export function difference(base, ...xs) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('difference', 1, arguments.length);
  xs = arrayToList(xs);
  let tmp_AUTO_388 = function f_PCT_(acc, item) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);
    return $procs._$n_difference(acc, item)
  }
  ;
  return reduce(xs, base, tmp_AUTO_388)
}

export function exclude(base, ...xs) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('exclude', 1, arguments.length);
  xs = arrayToList(xs);
  let tmp_AUTO_389 = function f_PCT_(acc, item) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);
    return $procs._$n_exclude(acc, item)
  }
  ;
  return reduce(xs, base, tmp_AUTO_389)
}

export function intersection(base, ...xs) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('intersection', 1, arguments.length);
  xs = arrayToList(xs);
  let tmp_AUTO_390 = function f_PCT_(acc, item) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);
    return $procs._$n_set_$o_intersection(acc, item)
  }
  ;
  return reduce(xs, base, tmp_AUTO_390)
}

export function _$n_str_$o_empty(_) {
  if (arguments.length !== 1) throw $procs._args_throw('&str:empty', 1, arguments.length);
  return ""
}

export function parse_float(source) {
  if (arguments.length !== 1) throw $procs._args_throw('parse-float', 1, arguments.length);
  let parsed = $procs._$n_parse_float(source);

  if ($procs.nil_$q_(parsed)) { return _PCT_err(source) } else { return _PCT_ok(parsed) }

}

export function str_find_index(text, pattern) {
  if (arguments.length !== 2) throw $procs._args_throw('str-find-index', 2, arguments.length);
  let idx = $procs._$n_str_$o_find_index(text, pattern);

  if ($procs._$n__$e_(idx, -1)) { return _PCT_none() } else { return _PCT_some(idx) }

}

export function strip_prefix(s, piece) {
  if (arguments.length !== 2) throw $procs._args_throw('strip-prefix', 2, arguments.length);

  if ($procs.starts_with_$q_(s, piece)) { let tmp_AUTO_416 = $procs._$n_str_$o_count(piece);
  return $procs._$n_str_$o_slice(s, tmp_AUTO_416) } else { return s }
}

export function strip_suffix(s, piece) {
  if (arguments.length !== 2) throw $procs._args_throw('strip-suffix', 2, arguments.length);

  if ($procs.ends_with_$q_(s, piece)) { let tmp_AUTO_417 = $procs._$n__($procs._$n_str_$o_count(s), $procs._$n_str_$o_count(piece));
  return $procs._$n_str_$o_slice(s, 0, tmp_AUTO_417) } else { return s }
}

export let _$n_get_in = function _$n_get_in(base, path) {
  if (arguments.length !== 2) throw $procs._args_throw('&get-in', 2, arguments.length);
  
  let times_AUTO_468 = 0;
  while(true) { /* Tail Recursion */
    let ret_AUTO_467 = null;
    if (((times_AUTO_468 & 1023) === 0) && times_AUTO_468 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
    {

  if ($procs.not(true)) { let err_AUTO_464 = new Error(str_spaced("expects path in a list, got:", path));
  err_AUTO_464.data = null;
  throw err_AUTO_464; } else {  null; };
}

if ($procs.nil_$q_(base)) { ret_AUTO_467 =base } else { let v__1 = path;
($procs.not(true) ? (function _fn_(){
  let err_AUTO_465 = new Error("expected a list in list-match");
  err_AUTO_465.data = null;
  throw err_AUTO_465;
})() : null);

if ($procs._$n_list_$o_empty_$q_(v__1)) { ret_AUTO_467 =base
 } else { let y0 = $procs._$n_list_$o_nth(v__1, 0);
let ys = $procs._$n_list_$o_slice(v__1, 1);
let tmp_AUTO_466 = get(base, y0);
ret_AUTO_467 =$procs.recur(tmp_AUTO_466, ys)


 }
 }

    if (ret_AUTO_467 instanceof CalcitRecur) {
      if (ret_AUTO_467.args.length !== 2) throw $procs._args_throw('&get-in', 2, ret_AUTO_467.args.length);
      base = ret_AUTO_467.args[0];
path = ret_AUTO_467.args[1];
      
      times_AUTO_468 += 1;
      continue;
    } else {
      return ret_AUTO_467;
    }
  }
}


export function _$n_init_builtin_impls_$x_() {
  if (arguments.length !== 0) throw $procs._args_throw('&init-builtin-impls!', 0, arguments.length);
  {
    identity(_$n_core_number_impls);
  }
  {
    identity(_$n_core_string_impls);
  }
  {
    identity(_$n_core_set_impls);
  }
  {
    identity(_$n_core_list_impls);
  }
  {
    identity(_$n_core_map_impls);
  }
  {
    identity(_$n_core_fn_impls);
  }
  {
    identity(_$n_core_enum_impls);
  }
  {
    identity(_$n_core_struct_impls);
  }
  {
    identity(_$n_core_scalar_impls);
  }
  {
    identity(Add);
  }
  {
    identity(Debug);
  }
  {
    identity(Eq);
  }
  {
    identity(Len);
  }
  {
    identity(Mappable);
  }
  {
    identity(Multiply);
  }
  {
    identity(Show);
  }

  if ($procs._$n__$e_($procs._$n_get_calcit_backend(), _t_.js)) { let tmp_AUTO_469 = $procs._$n_js_object(_t_.number, _$n_core_number_impls, _t_.string, _$n_core_string_impls, _t_.set, _$n_core_set_impls, _t_.list, _$n_core_list_impls, _t_.map, _$n_core_map_impls, _t_.fn, _$n_core_fn_impls, _t_.enum, _$n_core_enum_impls, _t_.struct, _$n_core_struct_impls, _t_.scalar, _$n_core_scalar_impls);
  return $procs.register_calcit_builtin_impls(tmp_AUTO_469) } else { return  null; }
}

export function _$n_max(a, b) {
  if (arguments.length !== 2) throw $procs._args_throw('&max', 2, arguments.length);
  {
    {

    if ($procs.not(true)) { let err_AUTO_470 = new Error(str_spaced("expects 1st argument to be string, got:", "expects numbers for &max"));
    err_AUTO_470.data = null;
    throw err_AUTO_470; } else {  null; };
    }
    null;
  }

  if ($procs._$n__GT_(a, b)) { return a } else { return b }
}

export function _$n_min(a, b) {
  if (arguments.length !== 2) throw $procs._args_throw('&min', 2, arguments.length);
  {
    {

    if ($procs.not(true)) { let err_AUTO_471 = new Error(str_spaced("expects 1st argument to be string, got:", "expects numbers for &min"));
    err_AUTO_471.data = null;
    throw err_AUTO_471; } else {  null; };
    }
    null;
  }

  if ($procs._$n__LT_(a, b)) { return a } else { return b }
}

var _SQUO_ = $procs._SQUO_;

export function _$s_(x, ...ys) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('*', 1, arguments.length);
  ys = arrayToList(ys);
  return reduce(ys, x, $procs._$n__$s_)
}

export function _ADD_(x, ...ys) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('+', 1, arguments.length);
  ys = arrayToList(ys);
  return reduce(ys, x, $procs._$n__ADD_)
}

export function thread_step_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('thread-step?', 1, arguments.length);
  let v1__1 = $procs.symbol_$q_(x);

  if (($procs.nil_$q_(v1__1) ? true : $procs._$n__$e_(false, v1__1))) { let v1__2 = $procs.tag_$q_(x);

  if (($procs.nil_$q_(v1__2) ? true : $procs._$n__$e_(false, v1__2))) { let v1__3 = _$e_($procs.type_of(x), _t_.method);

  if (($procs.nil_$q_(v1__3) ? true : $procs._$n__$e_(false, v1__3))) { let tmp_AUTO_472 = $procs.type_of(x);
  return _$e_(tmp_AUTO_472, _t_.fn) } else { return v1__3 }
   } else { return v1__2 }
   } else { return v1__1 }

}

export function _SLSH_(x, ...ys) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('/', 1, arguments.length);
  ys = arrayToList(ys);

  if ($procs._$n_list_$o_empty_$q_(ys)) { return $procs._$n__SLSH_(1, x) } else { return reduce(ys, x, $procs._$n__SLSH_) }
}

export function not_$e_(x, y) {
  if (arguments.length !== 2) throw $procs._args_throw('not=', 2, arguments.length);
  let tmp_AUTO_473 = $procs._$n__$e_(x, y);
  return $procs.not(tmp_AUTO_473)
}

export function _SLSH__$e_(a, b) {
  if (arguments.length !== 2) throw $procs._args_throw('/=', 2, arguments.length);
  return not_$e_(a, b)
}

export function _LT_(x, ...ys) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('<', 1, arguments.length);
  ys = arrayToList(ys);

  if ($procs._$n__$e_(1, $procs._$n_list_$o_count(ys))) { let tmp_AUTO_474 = $procs._$n_list_$o_nth(ys, 0);
  return $procs._$n__LT_(x, tmp_AUTO_474) } else { return foldl_compare(ys, x, $procs._$n__LT_) }
}

export function _LT__$e_(x, ...ys) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('<=', 1, arguments.length);
  ys = arrayToList(ys);

  if ($procs._$n__$e_(1, $procs._$n_list_$o_count(ys))) { let tmp_AUTO_475 = $procs._$n_list_$o_nth(ys, 0);
  return _$n__LT__$e_(x, tmp_AUTO_475) } else { return foldl_compare(ys, x, _$n__LT__$e_) }
}

export function _GT_(x, ...ys) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('>', 1, arguments.length);
  ys = arrayToList(ys);

  if ($procs._$n__$e_(1, $procs._$n_list_$o_count(ys))) { let tmp_AUTO_476 = $procs._$n_list_$o_nth(ys, 0);
  return $procs._$n__GT_(x, tmp_AUTO_476) } else { return foldl_compare(ys, x, $procs._$n__GT_) }
}

export function abs(x) {
  if (arguments.length !== 1) throw $procs._args_throw('abs', 1, arguments.length);

  if ($procs._$n__LT_(x, 0)) { return $procs._$n__(0, x) } else { return x }
}

export function apply(f, args) {
  if (arguments.length !== 2) throw $procs._args_throw('apply', 2, arguments.length);
  return f(...listToArray(args))
}

export function assoc_in(data, path, v) {
  if (arguments.length !== 3) throw $procs._args_throw('assoc-in', 3, arguments.length);
  let v__1 = path;
  ($procs.not(true) ? (function _fn_(){
    let err_AUTO_481 = new Error("expected a list in list-match");
    err_AUTO_481.data = null;
    throw err_AUTO_481;
  })() : null);

  if ($procs._$n_list_$o_empty_$q_(v__1)) { return v
   } else { let p0 = $procs._$n_list_$o_nth(v__1, 0);
  let ps = $procs._$n_list_$o_slice(v__1, 1);

  if ($procs.struct_$q_(data)) { let err_AUTO_482 = new Error("assoc-in does not traverse Struct fields; use assoc with a direct field key");
  err_AUTO_482.data = null;
  throw err_AUTO_482; } else { let d = ($procs.nil_$q_(data) ? $procs._$n__$M_() : data);
  let tmp_AUTO_483 = (function _fn_(){
    let tmp_AUTO_484 = (contains_$q_(d, p0) ? _$n_get_raw(d, p0) : $procs._$n__$M_());
    return assoc_in(tmp_AUTO_484, ps, v);
  })();
  return assoc(d, p0, tmp_AUTO_483)
   }


   }

}

export function buffer_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('buffer?', 1, arguments.length);
  let tmp_AUTO_485 = $procs.type_of(x);
  return $procs._$n__$e_(tmp_AUTO_485, _t_.buffer)
}

export function cirru_quote_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('cirru-quote?', 1, arguments.length);
  let tmp_AUTO_486 = $procs.type_of(x);
  return $procs._$n__$e_(tmp_AUTO_486, _t_["cirru-quote"])
}

export function concat(...args) {
  args = arrayToList(args);
  let v__1 = args;
  ($procs.not(true) ? (function _fn_(){
    let err_AUTO_487 = new Error("expected a list in list-match");
    err_AUTO_487.data = null;
    throw err_AUTO_487;
  })() : null);

  if ($procs._$n_list_$o_empty_$q_(v__1)) { return $procs._$L_()
   } else { let a0 = $procs._$n_list_$o_nth(v__1, 0);
  let as = $procs._$n_list_$o_slice(v__1, 1);
  return $procs._$n_list_$o_concat(a0, ...listToArray(as))


   }

}

export let conj = function conj(xs, y0, ...ys) {
  if (arguments.length < 2) throw $procs._args_fewer_throw('conj', 2, arguments.length);
  
ys = arrayToList(ys);
  let times_AUTO_491 = 0;
  while(true) { /* Tail Recursion */
    let ret_AUTO_490 = null;
    if (((times_AUTO_491 & 1023) === 0) && times_AUTO_491 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
    
if ($procs._$n_list_$o_empty_$q_(ys)) { ret_AUTO_490 =$procs.append(xs, y0) } else { let tmp_AUTO_489 = $procs.append(xs, y0);
ret_AUTO_490 =$procs.recur(tmp_AUTO_489, ...listToArray(ys)) }

    if (ret_AUTO_490 instanceof CalcitRecur) {
      if (ret_AUTO_490.args.length < 2) throw $procs._args_fewer_throw('conj', 2, ret_AUTO_490.args.length);
      [ xs, y0, ...ys ] = ret_AUTO_490.args;
      
ys = arrayToList(ys);
      times_AUTO_491 += 1;
      continue;
    } else {
      return ret_AUTO_490;
    }
  }
}


export let contains_in_$q_ = function contains_in_$q_(xs, path) {
  if (arguments.length !== 2) throw $procs._args_throw('contains-in?', 2, arguments.length);
  
  let times_AUTO_499 = 0;
  while(true) { /* Tail Recursion */
    let ret_AUTO_498 = null;
    if (((times_AUTO_499 & 1023) === 0) && times_AUTO_499 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
    let v__1 = path;
($procs.not(true) ? (function _fn_(){
  let err_AUTO_493 = new Error("expected a list in list-match");
  err_AUTO_493.data = null;
  throw err_AUTO_493;
})() : null);

if ($procs._$n_list_$o_empty_$q_(v__1)) { ret_AUTO_498 =true
 } else { let p0 = $procs._$n_list_$o_nth(v__1, 0);
let ps = $procs._$n_list_$o_slice(v__1, 1);

if ($procs.list_$q_(xs)) { 
if (($procs.number_$q_(p0) ? (function _fn_(){
  let v1__2 = $procs._$n_list_$o_contains_$q_(xs, p0);

  if (v1__2) { return v1__2 } else { return false }
})() : false)) { let tmp_AUTO_494 = $procs._$n_list_$o_nth(xs, p0);
ret_AUTO_498 =$procs.recur(tmp_AUTO_494, ps) } else { ret_AUTO_498 =false } }
 else if ($procs.map_$q_(xs)) { 
if ($procs._$n_map_$o_contains_$q_(xs, p0)) { let tmp_AUTO_495 = $procs._$n_map_$o_get(xs, p0);
ret_AUTO_498 =$procs.recur(tmp_AUTO_495, ps) } else { ret_AUTO_498 =false } }
 else if ($procs.struct_$q_(xs)) { let err_AUTO_496 = new Error("contains-in? does not traverse Struct fields; end the path before the Struct and use (:field value)");
err_AUTO_496.data = null;
throw err_AUTO_496; }
 else if ($procs.enum_$q_(xs)) { 
if ((_$n__GT__$e_(p0, 0) ? (function _fn_(){
  let v1__3 = $procs._$n__LT_(p0, $procs._$n_enum_$o_count(xs));

  if (v1__3) { return v1__3 } else { return false }
})() : false)) { let tmp_AUTO_497 = $procs._$n_enum_$o_nth(xs, p0);
ret_AUTO_498 =$procs.recur(tmp_AUTO_497, ps) } else { ret_AUTO_498 =false } } else { ret_AUTO_498 =false }


 }


    if (ret_AUTO_498 instanceof CalcitRecur) {
      if (ret_AUTO_498.args.length !== 2) throw $procs._args_throw('contains-in?', 2, ret_AUTO_498.args.length);
      xs = ret_AUTO_498.args[0];
path = ret_AUTO_498.args[1];
      
      times_AUTO_499 += 1;
      continue;
    } else {
      return ret_AUTO_498;
    }
  }
}


export function contains_symbol_$q_(xs, y) {
  if (arguments.length !== 2) throw $procs._args_throw('contains-symbol?', 2, arguments.length);

  if ($procs.list_$q_(xs)) { return function _PCT_contains_symbol_$q_(body) {
    if (arguments.length !== 1) throw $procs._args_throw('%contains-symbol?', 1, arguments.length);

    let times_AUTO_503 = 0;
    while(true) { /* Tail Recursion */
      let ret_AUTO_502 = null;
      if (((times_AUTO_503 & 1023) === 0) && times_AUTO_503 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
      let v__1 = body;
  ($procs.not($procs.list_$q_(v__1)) ? (function _fn_(){
    let err_AUTO_501 = new Error("expected a list in list-match");
    err_AUTO_501.data = null;
    throw err_AUTO_501;
  })() : null);

  if ($procs._$n_list_$o_empty_$q_(v__1)) { ret_AUTO_502 =false
   } else { let b0 = $procs._$n_list_$o_nth(v__1, 0);
  let bs = $procs._$n_list_$o_slice(v__1, 1);

  if (contains_symbol_$q_(b0, y)) { ret_AUTO_502 =true } else { ret_AUTO_502 =$procs.recur(bs) }


   }


      if (ret_AUTO_502 instanceof CalcitRecur) {
        if (ret_AUTO_502.args.length !== 1) throw $procs._args_throw('%contains-symbol?', 1, ret_AUTO_502.args.length);
        body = ret_AUTO_502.args[0];

        times_AUTO_503 += 1;
        continue;
      } else {
        return ret_AUTO_502;
      }
    }
  }

  (xs) } else { return $procs._$n__$e_(xs, y) }
}

export function count(x) {
  if (arguments.length !== 1) throw $procs._args_throw('count', 1, arguments.length);

  if ($procs.list_$q_(x)) { return $procs._$n_list_$o_count(x) } else { return $procs.invoke_method("count",x,) }
}

export function data_definition_form(entry) {
  if (arguments.length !== 1) throw $procs._args_throw('data-definition-form', 1, arguments.length);

  if (($procs.list_$q_(entry) ? ($procs.not($procs._$n_list_$o_empty_$q_(entry)) ? (function _fn_(){
    let v1__1 = $procs._$n__$e_($procs._$L_, $procs._$n_list_$o_first(entry));

    if (v1__1) { return v1__1 } else { return false }
  })() : false) : false)) { return $procs._$n_list_$o_rest(entry) }
   else if (($procs.list_$q_(entry) ? ($procs._$n__$e_(1, $procs._$n_list_$o_count(entry)) ? (function _fn_(){
    let v1__2 = $procs.list_$q_($procs._$n_list_$o_first(entry));

    if (v1__2) { return v1__2 } else { return false }
  })() : false) : false)) { let err_AUTO_504 = new Error("data definition forms already receive a list from indentation; remove the extra outer parentheses");
  err_AUTO_504.data = null;
  throw err_AUTO_504; } else { return entry }
}

export function data_definition_malformed_nesting_$q_(form) {
  if (arguments.length !== 1) throw $procs._args_throw('data-definition-malformed-nesting?', 1, arguments.length);

  if (($procs.list_$q_(form) ? ($procs._$n__$e_(1, $procs._$n_list_$o_count(form)) ? (function _fn_(){
    let v1__1 = $procs.list_$q_($procs._$n_list_$o_first(form));

    if (v1__1) { return v1__1 } else { return false }
  })() : false) : false)) { let child = data_definition_form($procs._$n_list_$o_first(form));

  if ($procs.list_$q_(child)) { 
  if ($procs.not($procs._$n_list_$o_empty_$q_(child))) { let v1__2 = (function _fn_(){
    let v1__3 = $procs.tag_$q_($procs._$n_list_$o_first(child));

    if (($procs.nil_$q_(v1__3) ? true : $procs._$n__$e_(false, v1__3))) { 
    if ($procs.not($procs.tag_$q_($procs._$n_list_$o_first(child)))) { let v1__4 = (function _fn_(){
      let tmp_AUTO_505 = function f_PCT_(bound) {
        if (arguments.length !== 1) throw $procs._args_throw('f%', 1, arguments.length);
        let items = data_definition_form(bound);

        if ($procs.list_$q_(items)) { let v1__5 = $procs._$n__$e_(2, $procs._$n_list_$o_count(items));

        if (v1__5) { return v1__5 } else { return false }
         } else { return false }

      }
      ;
      return every_$q_($procs._$n_list_$o_rest(child), tmp_AUTO_505);
    })();

    if (v1__4) { return v1__4 } else { return false }
     } else { return false } } else { return v1__3 }
  })();

  if (v1__2) { return v1__2 } else { return false }
   } else { return false } } else { return false }
   } else { return false }
}

export function empty_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('empty?', 1, arguments.length);

  if ($procs.list_$q_(x)) { return $procs._$n_list_$o_empty_$q_(x) } else { return $procs.invoke_method("empty?",x,) }
}

export function data_definition_where_form_$q_(tail_forms) {
  if (arguments.length !== 1) throw $procs._args_throw('data-definition-where-form?', 1, arguments.length);

  if (empty_$q_(tail_forms)) { return false } else { let candidate = data_definition_form($procs._$n_list_$o_first(tail_forms));

  if ($procs.list_$q_(candidate)) { 
  if ($procs.not($procs._$n_list_$o_empty_$q_(candidate))) { 
  if ($procs.not($procs.tag_$q_($procs._$n_list_$o_first(candidate)))) { let v1__1 = (function _fn_(){
    let tmp_AUTO_506 = function f_PCT_(bound) {
      if (arguments.length !== 1) throw $procs._args_throw('f%', 1, arguments.length);
      let items = data_definition_form(bound);

      if ($procs.list_$q_(items)) { let v1__2 = $procs._$n__$e_(2, $procs._$n_list_$o_count(items));

      if (v1__2) { return v1__2 } else { return false }
       } else { return false }

    }
    ;
    return every_$q_($procs._$n_list_$o_rest(candidate), tmp_AUTO_506);
  })();

  if (v1__1) { return v1__1 } else { return false }
   } else { return false } } else { return false } } else { return false }
   }
}

export function section_by(xs0, n) {
  if (arguments.length !== 2) throw $procs._args_throw('section-by', 2, arguments.length);

  if (_GT__$e_(n, 1)) { let tmp_AUTO_507 = $procs._$L_();
  return function f_PCT_(acc, xs) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);

    let times_AUTO_512 = 0;
    while(true) { /* Tail Recursion */
      let ret_AUTO_511 = null;
      if (((times_AUTO_512 & 1023) === 0) && times_AUTO_512 > 10000000) throw new Error('tail recursion not finished after 10M iterations');

  if (_$n__LT__$e_($procs._$n_list_$o_count(xs), n)) { 
  if ($procs._$n_list_$o_empty_$q_(xs)) { ret_AUTO_511 =acc } else { ret_AUTO_511 =$procs.append(acc, xs) } } else { let tmp_AUTO_509 = $procs.append(acc, take(xs, n));
  let tmp_AUTO_510 = drop(xs, n);
  ret_AUTO_511 =$procs.recur(tmp_AUTO_509, tmp_AUTO_510) }

      if (ret_AUTO_511 instanceof CalcitRecur) {
        if (ret_AUTO_511.args.length !== 2) throw $procs._args_throw('f%', 2, ret_AUTO_511.args.length);
        acc = ret_AUTO_511.args[0];
  xs = ret_AUTO_511.args[1];

        times_AUTO_512 += 1;
        continue;
      } else {
        return ret_AUTO_511;
      }
    }
  }

  (tmp_AUTO_507, xs0) } else { let err_AUTO_513 = new Error(str_spaced("expected positive number, got:", n));
  err_AUTO_513.data = null;
  throw err_AUTO_513; }
}

export function syntax_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('syntax?', 1, arguments.length);
  let tmp_AUTO_514 = $procs.type_of(x);
  return $procs._$n__$e_(tmp_AUTO_514, _t_.syntax)
}

var ref_$q_ = $procs.ref_$q_;

export function deref(_$s_a) {
  if (arguments.length !== 1) throw $procs._args_throw('deref', 1, arguments.length);

  if (ref_$q_(_$s_a)) { return $procs._$n_atom_$o_deref(_$s_a) } else { return $procs.invoke_method("deref",_$s_a,) }
}

export function destruct_list(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('destruct-list', 1, arguments.length);

  if ($procs._$n_list_$o_empty_$q_(xs)) { return $procs._PCT__$o__$o_(ListDestruct, _t_.none) } else { let tmp_AUTO_515 = $procs._$n_list_$o_nth(xs, 0);
  let tmp_AUTO_516 = $procs._$n_list_$o_rest(xs);
  return $procs._PCT__$o__$o_(ListDestruct, _t_.some, tmp_AUTO_515, tmp_AUTO_516) }
}

export function destruct_str(s) {
  if (arguments.length !== 1) throw $procs._args_throw('destruct-str', 1, arguments.length);

  if ($procs._$n__$e_(s, "")) { return $procs._PCT__$o__$o_(StringDestruct, _t_.none) } else { let tmp_AUTO_517 = $procs._$n_str_$o_slice(s, 0, 1);
  let tmp_AUTO_518 = $procs._$n_str_$o_rest(s);
  return $procs._PCT__$o__$o_(StringDestruct, _t_.some, tmp_AUTO_517, tmp_AUTO_518) }
}

export function dissoc(x, ...args) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('dissoc', 1, arguments.length);
  args = arrayToList(args);

  if ($procs.list_$q_(x)) { return $procs._$n_list_$o_dissoc(x, ...listToArray(args)) }
   else if ($procs.map_$q_(x)) { return $procs._$n_map_$o_dissoc(x, ...listToArray(args)) } else { return $procs.invoke_method("dissoc",x,...listToArray(args)) }
}

export function dissoc_in(data, path) {
  if (arguments.length !== 2) throw $procs._args_throw('dissoc-in', 2, arguments.length);
  let v__1 = path;
  ($procs.not(true) ? (function _fn_(){
    let err_AUTO_519 = new Error("expected a list in list-match");
    err_AUTO_519.data = null;
    throw err_AUTO_519;
  })() : null);

  if ($procs._$n_list_$o_empty_$q_(v__1)) { return data
   } else { let p0 = $procs._$n_list_$o_nth(v__1, 0);
  let ps = $procs._$n_list_$o_slice(v__1, 1);

  if ($procs.struct_$q_(data)) { let err_AUTO_520 = new Error("dissoc-in cannot remove declared Struct fields; use an optional field or convert the Struct to a map before removing keys");
  err_AUTO_520.data = null;
  throw err_AUTO_520; }
   else if ($procs._$n__$e_(1, $procs._$n_list_$o_count(path))) { return dissoc(data, p0) } else { let tmp_AUTO_521 = dissoc_in(_$n_get_raw(data, p0), ps);
  return assoc(data, p0, tmp_AUTO_521) }


   }

}

export function distinct(x) {
  if (arguments.length !== 1) throw $procs._args_throw('distinct', 1, arguments.length);
  return $procs._$n_list_$o_distinct(x)
}

export function empty(x) {
  if (arguments.length !== 1) throw $procs._args_throw('empty', 1, arguments.length);

  if ($procs.list_$q_(x)) { return $procs._$L_() } else { return $procs.invoke_method("empty",x,) }
}

export function optionally(s) {
  if (arguments.length !== 1) throw $procs._args_throw('optionally', 1, arguments.length);

  if ($procs.nil_$q_(s)) { return _PCT_none() } else { return _PCT_some(s) }
}

export function enum_definition(tuple) {
  if (arguments.length !== 1) throw $procs._args_throw('enum-definition', 1, arguments.length);
  let tmp_AUTO_522 = $procs._$n_enum_$o_definition(tuple);
  return optionally(tmp_AUTO_522)
}

export function even_$q_(n) {
  if (arguments.length !== 1) throw $procs._args_throw('even?', 1, arguments.length);
  let tmp_AUTO_523 = $procs._$n_number_$o_rem(n, 2);
  return $procs._$n__$e_(0, tmp_AUTO_523)
}

export function filter(xs, f) {
  if (arguments.length !== 2) throw $procs._args_throw('filter', 2, arguments.length);

  if ($procs.list_$q_(xs)) { return _$n_list_$o_filter(xs, f) } else { return $procs.invoke_method("filter",xs,f) }
}

export let foldl_SQUO_ = function foldl_SQUO_(xs, acc, f) {
  if (arguments.length !== 3) throw $procs._args_throw('foldl\'', 3, arguments.length);
  
  let times_AUTO_528 = 0;
  while(true) { /* Tail Recursion */
    let ret_AUTO_527 = null;
    if (((times_AUTO_528 & 1023) === 0) && times_AUTO_528 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
    let v__1 = xs;
($procs.not(true) ? (function _fn_(){
  let err_AUTO_525 = new Error("expected a list in list-match");
  err_AUTO_525.data = null;
  throw err_AUTO_525;
})() : null);

if ($procs._$n_list_$o_empty_$q_(v__1)) { ret_AUTO_527 =acc
 } else { let x0 = $procs._$n_list_$o_nth(v__1, 0);
let xss = $procs._$n_list_$o_slice(v__1, 1);
let tmp_AUTO_526 = f(acc, x0);
ret_AUTO_527 =$procs.recur(xss, tmp_AUTO_526, f)


 }


    if (ret_AUTO_527 instanceof CalcitRecur) {
      if (ret_AUTO_527.args.length !== 3) throw $procs._args_throw('foldl\'', 3, ret_AUTO_527.args.length);
      xs = ret_AUTO_527.args[0];
acc = ret_AUTO_527.args[1];
f = ret_AUTO_527.args[2];
      
      times_AUTO_528 += 1;
      continue;
    } else {
      return ret_AUTO_527;
    }
  }
}


export function frequencies(xs0) {
  if (arguments.length !== 1) throw $procs._args_throw('frequencies', 1, arguments.length);
  {
    {

    if ($procs.not(true)) { let err_AUTO_529 = new Error(str_spaced("expects 1st argument to be string, got:", "expects a list for frequencies"));
    err_AUTO_529.data = null;
    throw err_AUTO_529; } else {  null; };
    }
    null;
  }
  let tmp_AUTO_530 = $procs._$n__$M_();
  return function f_PCT_(acc, xs) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);

    let times_AUTO_536 = 0;
    while(true) { /* Tail Recursion */
      let ret_AUTO_535 = null;
      if (((times_AUTO_536 & 1023) === 0) && times_AUTO_536 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
      let v__1 = xs;
  ($procs.not($procs.list_$q_(v__1)) ? (function _fn_(){
    let err_AUTO_532 = new Error("expected a list in list-match");
    err_AUTO_532.data = null;
    throw err_AUTO_532;
  })() : null);

  if ($procs._$n_list_$o_empty_$q_(v__1)) { ret_AUTO_535 =acc
   } else { let x0 = $procs._$n_list_$o_nth(v__1, 0);
  let xss = $procs._$n_list_$o_slice(v__1, 1);
  let tmp_AUTO_533 = (contains_$q_(acc, x0) ? (function _fn_(){
    let tmp_AUTO_534 = function _PCT__BSL_(_PCT_, _PCT_2) {
      if (arguments.length < 0) throw $procs._args_between_throw('%\\', 0, 2, arguments.length);
      if (arguments.length > 2) throw $procs._args_between_throw('%\\', 0, 2, arguments.length);
      return $procs._$n__ADD_(_PCT_, 1)
    }
    ;
    return update(acc, x0, tmp_AUTO_534);
  })() : $procs._$n_map_$o_assoc(acc, x0, 1));
  ret_AUTO_535 =$procs.recur(tmp_AUTO_533, xss)


   }


      if (ret_AUTO_535 instanceof CalcitRecur) {
        if (ret_AUTO_535.args.length !== 2) throw $procs._args_throw('f%', 2, ret_AUTO_535.args.length);
        acc = ret_AUTO_535.args[0];
  xs = ret_AUTO_535.args[1];

        times_AUTO_536 += 1;
        continue;
      } else {
        return ret_AUTO_535;
      }
    }
  }

  (tmp_AUTO_530, xs0)
}

export function get_env(name) {
  if (arguments.length !== 1) throw $procs._args_throw('get-env', 1, arguments.length);
  let tmp_AUTO_537 = $procs._$n_get_env(name);
  return optionally(tmp_AUTO_537)
}

export function impl_origin(impl) {
  if (arguments.length !== 1) throw $procs._args_throw('impl-origin', 1, arguments.length);
  let tmp_AUTO_538 = $procs._$n_impl_$o_origin(impl);
  return optionally(tmp_AUTO_538)
}

export function includes_$q_(x, k) {
  if (arguments.length !== 2) throw $procs._args_throw('includes?', 2, arguments.length);

  if ($procs.list_$q_(x)) { return $procs._$n_list_$o_includes_$q_(x, k) } else { return $procs.invoke_method("includes?",x,k) }
}

export function interleave(xs0, ys0) {
  if (arguments.length !== 2) throw $procs._args_throw('interleave', 2, arguments.length);
  let tmp_AUTO_539 = $procs._$L_();
  return function _PCT_interleave(acc, xs, ys) {
    if (arguments.length !== 3) throw $procs._args_throw('%interleave', 3, arguments.length);

    let times_AUTO_545 = 0;
    while(true) { /* Tail Recursion */
      let ret_AUTO_544 = null;
      if (((times_AUTO_545 & 1023) === 0) && times_AUTO_545 > 10000000) throw new Error('tail recursion not finished after 10M iterations');

  if (($procs._$n_list_$o_empty_$q_(xs) ? true : $procs._$n_list_$o_empty_$q_(ys))) { ret_AUTO_544 =acc } else { let tmp_AUTO_541 = $procs.append($procs.append(acc, $procs._$n_list_$o_first(xs)), $procs._$n_list_$o_first(ys));
  let tmp_AUTO_542 = $procs._$n_list_$o_rest(xs);
  let tmp_AUTO_543 = $procs._$n_list_$o_rest(ys);
  ret_AUTO_544 =$procs.recur(tmp_AUTO_541, tmp_AUTO_542, tmp_AUTO_543) }

      if (ret_AUTO_544 instanceof CalcitRecur) {
        if (ret_AUTO_544.args.length !== 3) throw $procs._args_throw('%interleave', 3, ret_AUTO_544.args.length);
        acc = ret_AUTO_544.args[0];
  xs = ret_AUTO_544.args[1];
  ys = ret_AUTO_544.args[2];

        times_AUTO_545 += 1;
        continue;
      } else {
        return ret_AUTO_544;
      }
    }
  }

  (tmp_AUTO_539, xs0, ys0)
}

export function js_nullish__GT_option(x) {
  if (arguments.length !== 1) throw $procs._args_throw('js-nullish->option', 1, arguments.length);

  if ($procs.nil_$q_(x)) { return _PCT_none() } else { return _PCT_some(x) }
}

export function js_nullish_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('js-nullish?', 1, arguments.length);
  return $procs.nil_$q_(x)
}

export function js_present_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('js-present?', 1, arguments.length);
  let tmp_AUTO_546 = $procs.nil_$q_(x);
  return $procs.not(tmp_AUTO_546)
}

export function keys_non_nil(x) {
  if (arguments.length !== 1) throw $procs._args_throw('keys-non-nil', 1, arguments.length);
  let tmp_AUTO_547 = $procs._SHA__$M_();
  let tmp_AUTO_548 = $procs.to_pairs(x);
  return function f_PCT_(acc, pairs) {
    if (arguments.length !== 2) throw $procs._args_throw('f%', 2, arguments.length);

    let times_AUTO_554 = 0;
    while(true) { /* Tail Recursion */
      let ret_AUTO_553 = null;
      if (((times_AUTO_554 & 1023) === 0) && times_AUTO_554 > 10000000) throw new Error('tail recursion not finished after 10M iterations');
      let v__2 = destruct_set(pairs);
  ($procs.not($procs.enum_$q_(v__2)) ? (function _fn_(){
    let err_AUTO_550 = new Error(str("tag-match expected enum value, got", v__2));
    err_AUTO_550.data = null;
    throw err_AUTO_550;
  })() : null);
  let tag__1 = $procs._$n_enum_$o_nth(v__2, 0);
  $procs._$n_enum_$o_validate(v__2, tag__1);

  if (($procs.identical_$q_(tag__1, _t_.none) ? $procs.identical_$q_(1, $procs._$n_enum_$o_count(v__2)) : false)) { ret_AUTO_553 =acc
   }
   else if (($procs.identical_$q_(tag__1, _t_.some) ? $procs.identical_$q_(3, $procs._$n_enum_$o_count(v__2)) : false)) { let pair = $procs._$n_enum_$o_nth(v__2, 1);
  let remaining = $procs._$n_enum_$o_nth(v__2, 2);

  if ($procs.nil_$q_($procs._$n_list_$o_last(pair))) { ret_AUTO_553 =$procs.recur(acc, remaining) } else { let tmp_AUTO_551 = include(acc, $procs._$n_list_$o_nth(pair, 0));
  ret_AUTO_553 =$procs.recur(tmp_AUTO_551, remaining) }

   } else { let err_AUTO_552 = new Error(str_spaced("tag-match found no matched case, missing `_` for", v__2));
  err_AUTO_552.data = null;
  throw err_AUTO_552; }



      if (ret_AUTO_553 instanceof CalcitRecur) {
        if (ret_AUTO_553.args.length !== 2) throw $procs._args_throw('f%', 2, ret_AUTO_553.args.length);
        acc = ret_AUTO_553.args[0];
  pairs = ret_AUTO_553.args[1];

        times_AUTO_554 += 1;
        continue;
      } else {
        return ret_AUTO_553;
      }
    }
  }

  (tmp_AUTO_547, tmp_AUTO_548)
}

export function last(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('last', 1, arguments.length);

  if ($procs.list_$q_(xs)) { 
  if ($procs._$n_list_$o_empty_$q_(xs)) { return _PCT_none() } else { let tmp_AUTO_555 = $procs._$n_list_$o_last(xs);
  return _PCT_some(tmp_AUTO_555) } }
   else if ($procs.string_$q_(xs)) { 
  if ($procs._$n_str_$o_empty_$q_(xs)) { return _PCT_none() } else { let tmp_AUTO_556 = $procs._$n_str_$o_nth(xs, $procs._$n__($procs._$n_str_$o_count(xs), 1));
  return _PCT_some(tmp_AUTO_556) } }
   else if ($procs.enum_$q_(xs)) { 
  if ($procs._$n__$e_(0, $procs._$n_enum_$o_count(xs))) { return _PCT_none() } else { let tmp_AUTO_557 = $procs._$n_enum_$o_nth(xs, $procs._$n__($procs._$n_enum_$o_count(xs), 1));
  return _PCT_some(tmp_AUTO_557) } } else { let err_AUTO_558 = new Error(str_spaced("last", "expected", "a", "list,", "string,", "or", "enum,", "got:", xs));
  err_AUTO_558.data = null;
  throw err_AUTO_558; }
}

export function rest(x) {
  if (arguments.length !== 1) throw $procs._args_throw('rest', 1, arguments.length);

  if ($procs.list_$q_(x)) { return $procs._$n_list_$o_rest(x) } else { return $procs.invoke_method("rest",x,) }
}

export function macro_$q_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('macro?', 1, arguments.length);
  let tmp_AUTO_559 = $procs.type_of(x);
  return $procs._$n__$e_(tmp_AUTO_559, _t_.macro)
}

export function max(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('max', 1, arguments.length);
  return $procs.invoke_method("max",xs,)
}

export function merge_non_nil(x0, ...xs) {
  if (arguments.length < 1) throw $procs._args_fewer_throw('merge-non-nil', 1, arguments.length);
  xs = arrayToList(xs);
  return reduce(xs, x0, $procs._$n_merge_non_nil)
}

export function min(xs) {
  if (arguments.length !== 1) throw $procs._args_throw('min', 1, arguments.length);
  return $procs.invoke_method("min",xs,)
}

export function non_nil_$x_(x) {
  if (arguments.length !== 1) throw $procs._args_throw('non-nil!', 1, arguments.length);

  if ($procs.nil_$q_(x)) { let err_AUTO_560 = new Error("expected non nil value");
  err_AUTO_560.data = null;
  throw err_AUTO_560; } else { return x }
}

export function range_bothway(x, y) {
  if (arguments.length < 1) throw $procs._args_between_throw('range-bothway', 1, 2, arguments.length);
  if (arguments.length > 2) throw $procs._args_between_throw('range-bothway', 1, 2, arguments.length);

  if ($procs.nil_$q_(y)) { let tmp_AUTO_561 = inc(negate(x));
  return $procs.range(tmp_AUTO_561, x) } else { let tmp_AUTO_562 = inc($procs._$n__($procs._$n__ADD_(x, x), y));
  return $procs.range(tmp_AUTO_562, y) }
}

export function record_struct(_value) {
  if (arguments.length !== 1) throw $procs._args_throw('record-struct', 1, arguments.length);
  let err_AUTO_563 = new Error("`record-struct` was removed; use `struct-definition`, which returns Option<StructDef>");
  err_AUTO_563.data = null;
  throw err_AUTO_563;
}

export function record_$q_(_value) {
  if (arguments.length !== 1) throw $procs._args_throw('record?', 1, arguments.length);
  let err_AUTO_564 = new Error("`record?` was removed; use `struct?` for struct values or `struct-def?` for definitions");
  err_AUTO_564.data = null;
  throw err_AUTO_564;
}

export function repeat(x, n0) {
  if (arguments.length !== 2) throw $procs._args_throw('repeat', 2, arguments.length);
  let tmp_AUTO_565 = $procs._$L_();
  return function _PCT_repeat(acc, n) {
    if (arguments.length !== 2) throw $procs._args_throw('%repeat', 2, arguments.length);

    let times_AUTO_570 = 0;
    while(true) { /* Tail Recursion */
      let ret_AUTO_569 = null;
      if (((times_AUTO_570 & 1023) === 0) && times_AUTO_570 > 10000000) throw new Error('tail recursion not finished after 10M iterations');

  if (_$n__LT__$e_(n, 0)) { ret_AUTO_569 =acc } else { let tmp_AUTO_567 = $procs.append(acc, x);
  let tmp_AUTO_568 = $procs._$n__(n, 1);
  ret_AUTO_569 =$procs.recur(tmp_AUTO_567, tmp_AUTO_568) }

      if (ret_AUTO_569 instanceof CalcitRecur) {
        if (ret_AUTO_569.args.length !== 2) throw $procs._args_throw('%repeat', 2, ret_AUTO_569.args.length);
        acc = ret_AUTO_569.args[0];
  n = ret_AUTO_569.args[1];

        times_AUTO_570 += 1;
        continue;
      } else {
        return ret_AUTO_569;
      }
    }
  }

  (tmp_AUTO_565, n0)
}

export function select_keys(m, xs) {
  if (arguments.length !== 2) throw $procs._args_throw('select-keys', 2, arguments.length);
  {
    {

    if ($procs.not(true)) { let err_AUTO_571 = new Error(str_spaced("expects 1st argument to be string, got:", "expected map for selecting"));
    err_AUTO_571.data = null;
    throw err_AUTO_571; } else {  null; };
    }
    null;
  }
  let tmp_AUTO_572 = $procs._$n__$M_();
  let tmp_AUTO_573 = function _PCT_select_keys(acc, k) {
    if (arguments.length !== 2) throw $procs._args_throw('%select-keys', 2, arguments.length);
    let tmp_AUTO_574 = $procs._$n_map_$o_get(m, k);
    return $procs._$n_map_$o_assoc(acc, k, tmp_AUTO_574)
  }
  ;
  return $procs.foldl(xs, tmp_AUTO_572, tmp_AUTO_573)
}

export function some_in_$q_(x, path) {
  if (arguments.length !== 2) throw $procs._args_throw('some-in?', 2, arguments.length);
  let tmp_AUTO_575 = get_in(x, path);
  return option_$o_some_$q_(tmp_AUTO_575)
}

export function struct_definition(value) {
  if (arguments.length !== 1) throw $procs._args_throw('struct-definition', 1, arguments.length);
  let tmp_AUTO_576 = $procs._$n_struct_$o_definition(value);
  return optionally(tmp_AUTO_576)
}

export function tagging_edn(data) {
  if (arguments.length !== 1) throw $procs._args_throw('tagging-edn', 1, arguments.length);

  if ($procs.list_$q_(data)) { return _$n_list_$o_map(data, tagging_edn) }
   else if ($procs.map_$q_(data)) { let tmp_AUTO_577 = function _PCT_tagging(k, v) {
    if (arguments.length !== 2) throw $procs._args_throw('%tagging', 2, arguments.length);
    let tmp_AUTO_578 = ($procs.string_$q_(k) ? $procs.turn_tag(k) : k);
    let tmp_AUTO_579 = tagging_edn(v);
    return $procs._$L_(tmp_AUTO_578, tmp_AUTO_579)
  }
  ;
  return map_kv(data, tmp_AUTO_577) } else { return data }
}

export function tuple_enum(_value) {
  if (arguments.length !== 1) throw $procs._args_throw('tuple-enum', 1, arguments.length);
  let err_AUTO_580 = new Error("`tuple-enum` was removed; use `enum-definition`, which returns Option<EnumDef>");
  err_AUTO_580.data = null;
  throw err_AUTO_580;
}

export function tuple_$q_(_value) {
  if (arguments.length !== 1) throw $procs._args_throw('tuple?', 1, arguments.length);
  let err_AUTO_581 = new Error("`tuple?` was removed; use `enum?` for enum values or `enum-def?` for definitions");
  err_AUTO_581.data = null;
  throw err_AUTO_581;
}

export function turn_str(x) {
  if (arguments.length !== 1) throw $procs._args_throw('turn-str', 1, arguments.length);
  return $procs.turn_string(x)
}

export function unselect_keys(m, xs) {
  if (arguments.length !== 2) throw $procs._args_throw('unselect-keys', 2, arguments.length);
  {
    {

    if ($procs.not(true)) { let err_AUTO_582 = new Error(str_spaced("expects 1st argument to be string, got:", "expected map for unselecting"));
    err_AUTO_582.data = null;
    throw err_AUTO_582; } else {  null; };
    }
    null;
  }
  let tmp_AUTO_583 = function _PCT_unselect_keys(acc, k) {
    if (arguments.length !== 2) throw $procs._args_throw('%unselect-keys', 2, arguments.length);
    return $procs._$n_map_$o_dissoc(acc, k)
  }
  ;
  return $procs.foldl(xs, m, tmp_AUTO_583)
}

export function update_in(data, path, f) {
  if (arguments.length !== 3) throw $procs._args_throw('update-in', 3, arguments.length);
  let v__1 = path;
  ($procs.not(true) ? (function _fn_(){
    let err_AUTO_584 = new Error("expected a list in list-match");
    err_AUTO_584.data = null;
    throw err_AUTO_584;
  })() : null);

  if ($procs._$n_list_$o_empty_$q_(v__1)) { let tmp_AUTO_585 = _PCT_some(data);
  return f(tmp_AUTO_585)
   } else { let p0 = $procs._$n_list_$o_nth(v__1, 0);
  let ps = $procs._$n_list_$o_slice(v__1, 1);

  if ($procs.struct_$q_(data)) { let err_AUTO_586 = new Error("update-in does not traverse Struct fields; use update with a direct field key");
  err_AUTO_586.data = null;
  throw err_AUTO_586; } else { let current = ($procs.nil_$q_(data) ? _PCT_none() : get(data, p0));
  let tmp_AUTO_587 = ($procs.nil_$q_(data) ? $procs._$n__$M_() : data);
  let tmp_AUTO_588 = ($procs._$n_list_$o_empty_$q_(ps) ? f(current) : update_in(option_$o_unwrap_or(current, $procs._$n__$M_()), ps, f));
  return assoc(tmp_AUTO_587, p0, tmp_AUTO_588)
   }


   }

}

export function zipmap(xs0, ys0) {
  if (arguments.length !== 2) throw $procs._args_throw('zipmap', 2, arguments.length);
  let tmp_AUTO_589 = $procs._$n__$M_();
  return function f_PCT_(acc, xs, ys) {
    if (arguments.length !== 3) throw $procs._args_throw('f%', 3, arguments.length);

    let times_AUTO_595 = 0;
    while(true) { /* Tail Recursion */
      let ret_AUTO_594 = null;
      if (((times_AUTO_595 & 1023) === 0) && times_AUTO_595 > 10000000) throw new Error('tail recursion not finished after 10M iterations');

  if (($procs._$n_list_$o_empty_$q_(xs) ? true : $procs._$n_list_$o_empty_$q_(ys))) { ret_AUTO_594 =acc } else { let tmp_AUTO_591 = $procs._$n_map_$o_assoc(acc, $procs._$n_list_$o_first(xs), $procs._$n_list_$o_first(ys));
  let tmp_AUTO_592 = rest(xs);
  let tmp_AUTO_593 = rest(ys);
  ret_AUTO_594 =$procs.recur(tmp_AUTO_591, tmp_AUTO_592, tmp_AUTO_593) }

      if (ret_AUTO_594 instanceof CalcitRecur) {
        if (ret_AUTO_594.args.length !== 3) throw $procs._args_throw('f%', 3, ret_AUTO_594.args.length);
        acc = ret_AUTO_594.args[0];
  xs = ret_AUTO_594.args[1];
  ys = ret_AUTO_594.args[2];

        times_AUTO_595 += 1;
        continue;
      } else {
        return ret_AUTO_594;
      }
    }
  }

  (tmp_AUTO_589, xs0, ys0)
}



export var Mappable = $procs._$n_trait_$o__$o_new(_t_.Mappable, $procs._$L_($procs._$L_(_t_.map, new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.return, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")]), _t_.fn])])])]))));

export var ResultMappableImpl = $procs._$n_impl_$o__$o_new(Mappable, $procs._$L_(_t_.map, result_$o_map));

export var ResultMethods = (function _fn_(){
  let tmp_AUTO_30 = $procs._$o__$o_($procs.invoke_method_closure("ok?"), result_$o_ok_$q_);
  let tmp_AUTO_31 = $procs._$o__$o_($procs.invoke_method_closure("err?"), result_$o_err_$q_);
  let tmp_AUTO_32 = $procs._$o__$o_($procs.invoke_method_closure("unwrap-or"), result_$o_unwrap_or);
  let tmp_AUTO_33 = $procs._$o__$o_($procs.invoke_method_closure("and-then"), result_$o_and_then);
  let tmp_AUTO_34 = $procs._$o__$o_($procs.invoke_method_closure("map-err"), result_$o_map_err);
  let tmp_AUTO_35 = $procs._$o__$o_($procs.invoke_method_closure("or-else"), result_$o_or_else);
  return $procs._$n_impl_$o__$o_new(_t_.ResultMethods, tmp_AUTO_30, tmp_AUTO_31, tmp_AUTO_32, tmp_AUTO_33, tmp_AUTO_34, tmp_AUTO_35);
})();

export var Result = (function _fn_(){
  let tmp_AUTO_43 = $procs._$n_enum_def_$o_new(_t_.Result, $procs._$L_(new CalcitSymbol("T"), new CalcitSymbol("E")), $procs._$L_(_t_.ok, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])), $procs._$L_(_t_.err, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("E")])));
  return impl_traits(tmp_AUTO_43, $calcit_DOT_internal._$n_core_debug_impl, $calcit_DOT_internal._$n_core_eq_impl, ResultMappableImpl, ResultMethods);
})();

export var OptionMappableImpl = $procs._$n_impl_$o__$o_new(Mappable, $procs._$L_(_t_.map, option_$o_map));

export var OptionMethods = (function _fn_(){
  let tmp_AUTO_65 = $procs._$o__$o_($procs.invoke_method_closure("some?"), option_$o_some_$q_);
  let tmp_AUTO_66 = $procs._$o__$o_($procs.invoke_method_closure("none?"), option_$o_none_$q_);
  let tmp_AUTO_67 = $procs._$o__$o_($procs.invoke_method_closure("unwrap"), option_$o_unwrap);
  let tmp_AUTO_68 = $procs._$o__$o_($procs.invoke_method_closure("unwrap-or"), option_$o_unwrap_or);
  let tmp_AUTO_69 = $procs._$o__$o_($procs.invoke_method_closure("and-then"), option_$o_and_then);
  let tmp_AUTO_70 = $procs._$o__$o_($procs.invoke_method_closure("or-else"), option_$o_or_else);
  let tmp_AUTO_71 = $procs._$o__$o_($procs.invoke_method_closure("fold"), option_$o_fold);
  return $procs._$n_impl_$o__$o_new(_t_.OptionMethods, tmp_AUTO_65, tmp_AUTO_66, tmp_AUTO_67, tmp_AUTO_68, tmp_AUTO_69, tmp_AUTO_70, tmp_AUTO_71);
})();

export var Option = (function _fn_(){
  let tmp_AUTO_72 = $procs._$n_enum_def_$o_new(_t_.Option, $procs._$L_(new CalcitSymbol("T")), $procs._$L_(_t_.some, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])), $procs._$L_(_t_.none));
  return impl_traits(tmp_AUTO_72, $calcit_DOT_internal._$n_core_debug_impl, $calcit_DOT_internal._$n_core_eq_impl, OptionMappableImpl, OptionMethods);
})();

export var _$n_core_enum_methods = (function _fn_(){
  let tmp_AUTO_88 = $procs._$o__$o_(_t_.count, $procs._$n_enum_$o_count);
  let tmp_AUTO_89 = $procs._$o__$o_(_t_.nth, nth);
  let tmp_AUTO_90 = $procs._$o__$o_(_t_.get, get);
  let tmp_AUTO_91 = $procs._$o__$o_(_t_.assoc, $procs._$n_enum_$o_assoc);
  let tmp_AUTO_92 = $procs._$o__$o_(_t_.first, first);
  let tmp_AUTO_93 = (function _fn_(){
    let tmp_AUTO_94 = function _$n_enum_$o_empty_$q__impl(x) {
      if (arguments.length !== 1) throw $procs._args_throw('&enum:empty?-impl', 1, arguments.length);
      let tmp_AUTO_95 = $procs._$n_enum_$o_count(x);
      return $procs._$n__$e_(0, tmp_AUTO_95)
    }
    ;
    return $procs._$o__$o_(_t_["empty?"], tmp_AUTO_94);
  })();
  let tmp_AUTO_96 = (function _fn_(){
    let tmp_AUTO_97 = function _$n_enum_$o_contains_$q__impl(x, k) {
      if (arguments.length !== 2) throw $procs._args_throw('&enum:contains?-impl', 2, arguments.length);

      if (_$n__GT__$e_(k, 0)) { let tmp_AUTO_98 = $procs._$n_enum_$o_count(x);
      return $procs._$n__LT_(k, tmp_AUTO_98) } else { return false }
    }
    ;
    return $procs._$o__$o_(_t_["contains?"], tmp_AUTO_97);
  })();
  return $procs._$n_impl_$o__$o_new(_t_["&core-enum-methods"], tmp_AUTO_88, tmp_AUTO_89, tmp_AUTO_90, tmp_AUTO_91, tmp_AUTO_92, tmp_AUTO_93, tmp_AUTO_96);
})();

export var Contains = $procs._$n_trait_$o__$o_new(_t_.Contains, $procs._$L_($procs._$L_(_t_["contains?"], new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("K")])])]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("K")])])]), new CalcitSliceList([_t_.return, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("Bool")])])])]))));

export var Countable = $procs._$n_trait_$o__$o_new(_t_.Countable, $procs._$L_($procs._$L_(_t_.count, new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.return, _t_.number]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])])])]))));

export var Debug = $procs._$n_trait_$o__$o_new(_t_.Debug, $procs._$L_($procs._$L_(_t_.debug, new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.return, _t_.string]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])])])]))));

export var Eq = $procs._$n_trait_$o__$o_new(_t_.Eq, $procs._$L_($procs._$L_(_t_["eq?"], new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.return, _t_.bool]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])])])]))));

export var _$n_core_enum_impls = (function _fn_(){
  let tmp_AUTO_99 = $procs._$n_impl_$o__$o_new(Debug, $calcit_DOT_internal._$n_core_debug_impl);
  let tmp_AUTO_100 = $procs._$n_impl_$o__$o_new(Eq, $calcit_DOT_internal._$n_core_eq_impl);
  let tmp_AUTO_101 = $procs._$n_impl_$o__$o_new(Countable, $calcit_DOT_internal._$n_core_countable_enum_impl);
  let tmp_AUTO_102 = $procs._$n_impl_$o__$o_new(Contains, $calcit_DOT_internal._$n_core_contains_enum_impl);
  return $procs._$L_(_$n_core_enum_methods, tmp_AUTO_99, tmp_AUTO_100, tmp_AUTO_101, tmp_AUTO_102);
})();

export var _$n_core_fn_methods = (function _fn_(){
  let tmp_AUTO_107 = (function _fn_(){
    let tmp_AUTO_108 = function _$n_fn_$o_call(f, ...args) {
      if (arguments.length < 1) throw $procs._args_fewer_throw('&fn:call', 1, arguments.length);
      args = arrayToList(args);
      return f(...listToArray(args))
    }
    ;
    return $procs._$o__$o_(_t_.call, tmp_AUTO_108);
  })();
  let tmp_AUTO_109 = (function _fn_(){
    let tmp_AUTO_110 = function _$n_fn_$o_call_args(f, args) {
      if (arguments.length !== 2) throw $procs._args_throw('&fn:call-args', 2, arguments.length);
      return f(...listToArray(args))
    }
    ;
    return $procs._$o__$o_(_t_["call-args"], tmp_AUTO_110);
  })();
  let tmp_AUTO_111 = $procs._$o__$o_(_t_.map, _$n_fn_$o_map);
  let tmp_AUTO_112 = $procs._$o__$o_(_t_.bind, _$n_fn_$o_bind);
  let tmp_AUTO_113 = $procs._$o__$o_(_t_.mappend, _$n_fn_$o_mappend);
  let tmp_AUTO_114 = $procs._$o__$o_(_t_.apply, _$n_fn_$o_apply);
  return $procs._$n_impl_$o__$o_new(_t_["&core-fn-methods"], tmp_AUTO_107, tmp_AUTO_109, tmp_AUTO_111, tmp_AUTO_112, tmp_AUTO_113, tmp_AUTO_114);
})();

export var _$n_core_fn_impls = $procs._$L_(_$n_core_fn_methods, $procs._$n_impl_$o__$o_new(Debug, $calcit_DOT_internal._$n_core_debug_impl));

export var _$n_core_list_methods = (function _fn_(){
  let tmp_AUTO_231 = $procs._$o__$o_(_t_["any?"], any_$q_);
  let tmp_AUTO_232 = $procs._$o__$o_(_t_.add, $procs.append);
  let tmp_AUTO_233 = $procs._$o__$o_(_t_.append, $procs.append);
  let tmp_AUTO_234 = $procs._$o__$o_(_t_.assoc, $procs._$n_list_$o_assoc);
  let tmp_AUTO_235 = $procs._$o__$o_(_t_["assoc-after"], $procs._$n_list_$o_assoc_after);
  let tmp_AUTO_236 = $procs._$o__$o_(_t_["assoc-before"], $procs._$n_list_$o_assoc_before);
  let tmp_AUTO_237 = $procs._$o__$o_(_t_.bind, mapcat);
  let tmp_AUTO_238 = $procs._$o__$o_(_t_.butlast, $procs.butlast);
  let tmp_AUTO_239 = $procs._$o__$o_(_t_.concat, $procs._$n_list_$o_concat);
  let tmp_AUTO_240 = $procs._$o__$o_(_t_["contains?"], $procs._$n_list_$o_contains_$q_);
  let tmp_AUTO_241 = $procs._$o__$o_(_t_["includes?"], $procs._$n_list_$o_includes_$q_);
  let tmp_AUTO_242 = $procs._$o__$o_(_t_.count, $procs._$n_list_$o_count);
  let tmp_AUTO_243 = $procs._$o__$o_(_t_.drop, drop);
  let tmp_AUTO_244 = $procs._$o__$o_(_t_.each, each);
  let tmp_AUTO_245 = $procs._$o__$o_(_t_.empty, _$n_list_$o_empty);
  let tmp_AUTO_246 = $procs._$o__$o_(_t_["empty?"], $procs._$n_list_$o_empty_$q_);
  let tmp_AUTO_247 = $procs._$o__$o_(_t_.filter, _$n_list_$o_filter);
  let tmp_AUTO_248 = $procs._$o__$o_(_t_["filter-not"], filter_not);
  let tmp_AUTO_249 = $procs._$o__$o_(_t_.find, find);
  let tmp_AUTO_250 = $procs._$o__$o_(_t_["find-index"], find_index);
  let tmp_AUTO_251 = $procs._$o__$o_(_t_["find-last"], _$n_list_$o_find_last);
  let tmp_AUTO_252 = $procs._$o__$o_(_t_["find-last-index"], _$n_list_$o_find_last_index);
  let tmp_AUTO_253 = $procs._$o__$o_(_t_.foldl, $procs.foldl);
  let tmp_AUTO_254 = $procs._$o__$o_(_t_.get, get);
  let tmp_AUTO_255 = $procs._$o__$o_(_t_["get-in"], get_in);
  let tmp_AUTO_256 = $procs._$o__$o_(_t_["group-by"], group_by);
  let tmp_AUTO_257 = $procs._$o__$o_(_t_["index-of"], index_of);
  let tmp_AUTO_258 = $procs._$o__$o_(_t_.join, join);
  let tmp_AUTO_259 = $procs._$o__$o_(_t_["join-str"], join_str);
  let tmp_AUTO_260 = $procs._$o__$o_(_t_["last-index-of"], _$n_list_$o_last_index_of);
  let tmp_AUTO_261 = $procs._$o__$o_(_t_.map, _$n_list_$o_map);
  let tmp_AUTO_262 = $procs._$o__$o_(_t_["map-indexed"], map_indexed);
  let tmp_AUTO_263 = $procs._$o__$o_(_t_.mappend, _$n_list_$o_mappend);
  let tmp_AUTO_264 = $procs._$o__$o_(_t_.max, _$n_list_$o_max);
  let tmp_AUTO_265 = $procs._$o__$o_(_t_.min, _$n_list_$o_min);
  let tmp_AUTO_266 = $procs._$o__$o_(_t_.nth, nth);
  let tmp_AUTO_267 = $procs._$o__$o_(_t_["pairs-map"], pairs_map);
  let tmp_AUTO_268 = $procs._$o__$o_(_t_.prepend, $procs.prepend);
  let tmp_AUTO_269 = $procs._$o__$o_(_t_.reduce, reduce);
  let tmp_AUTO_270 = $procs._$o__$o_(_t_.reverse, $procs._$n_list_$o_reverse);
  let tmp_AUTO_271 = $procs._$o__$o_(_t_.slice, $procs._$n_list_$o_slice);
  let tmp_AUTO_272 = $procs._$o__$o_(_t_.sort, $procs.sort);
  let tmp_AUTO_273 = $procs._$o__$o_(_t_["sort-by"], _$n_list_$o_sort_by);
  let tmp_AUTO_274 = $procs._$o__$o_(_t_.take, take);
  let tmp_AUTO_275 = $procs._$o__$o_(_t_["take-last"], take_last);
  let tmp_AUTO_276 = $procs._$o__$o_(_t_["to-set"], $procs._$n_list_$o_to_set);
  let tmp_AUTO_277 = $procs._$o__$o_(_t_.first, first);
  let tmp_AUTO_278 = $procs._$o__$o_(_t_.rest, $procs._$n_list_$o_rest);
  let tmp_AUTO_279 = $procs._$o__$o_(_t_.dissoc, $procs._$n_list_$o_dissoc);
  let tmp_AUTO_280 = $procs._$o__$o_(_t_["to-list"], identity);
  let tmp_AUTO_281 = $procs._$o__$o_(_t_["map-pair"], _$n_list_$o_map_pair);
  let tmp_AUTO_282 = $procs._$o__$o_(_t_["filter-pair"], _$n_list_$o_filter_pair);
  let tmp_AUTO_283 = $procs._$o__$o_(_t_.apply, _$n_list_$o_apply);
  let tmp_AUTO_284 = $procs._$o__$o_(_t_.flatten, _$n_list_$o_flatten);
  return $procs._$n_impl_$o__$o_new(_t_["&core-list-methods"], tmp_AUTO_231, tmp_AUTO_232, tmp_AUTO_233, tmp_AUTO_234, tmp_AUTO_235, tmp_AUTO_236, tmp_AUTO_237, tmp_AUTO_238, tmp_AUTO_239, tmp_AUTO_240, tmp_AUTO_241, tmp_AUTO_242, tmp_AUTO_243, tmp_AUTO_244, tmp_AUTO_245, tmp_AUTO_246, tmp_AUTO_247, tmp_AUTO_248, tmp_AUTO_249, tmp_AUTO_250, tmp_AUTO_251, tmp_AUTO_252, tmp_AUTO_253, tmp_AUTO_254, tmp_AUTO_255, tmp_AUTO_256, tmp_AUTO_257, tmp_AUTO_258, tmp_AUTO_259, tmp_AUTO_260, tmp_AUTO_261, tmp_AUTO_262, tmp_AUTO_263, tmp_AUTO_264, tmp_AUTO_265, tmp_AUTO_266, tmp_AUTO_267, tmp_AUTO_268, tmp_AUTO_269, tmp_AUTO_270, tmp_AUTO_271, tmp_AUTO_272, tmp_AUTO_273, tmp_AUTO_274, tmp_AUTO_275, tmp_AUTO_276, tmp_AUTO_277, tmp_AUTO_278, tmp_AUTO_279, tmp_AUTO_280, tmp_AUTO_281, tmp_AUTO_282, tmp_AUTO_283, tmp_AUTO_284);
})();

export var Add = $procs._$n_trait_$o__$o_new(_t_.Add, $procs._$L_($procs._$L_(_t_.add, new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.return, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])])])]))));

export var Len = $procs._$n_trait_$o__$o_new(_t_.Len, $procs._$L_($procs._$L_(_t_.len, new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.return, _t_.number]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])])])]))));

export var _$n_core_list_impls = (function _fn_(){
  let tmp_AUTO_285 = $procs._$n_impl_$o__$o_new(Debug, $calcit_DOT_internal._$n_core_debug_impl);
  let tmp_AUTO_286 = $procs._$n_impl_$o__$o_new(Eq, $calcit_DOT_internal._$n_core_eq_impl);
  let tmp_AUTO_287 = $procs._$n_impl_$o__$o_new(Add, $calcit_DOT_internal._$n_core_add_list_impl);
  let tmp_AUTO_288 = $procs._$n_impl_$o__$o_new(Len, $calcit_DOT_internal._$n_core_len_list_impl);
  let tmp_AUTO_289 = $procs._$n_impl_$o__$o_new(Mappable, $calcit_DOT_internal._$n_core_mappable_list_impl);
  let tmp_AUTO_290 = $procs._$n_impl_$o__$o_new(Countable, $calcit_DOT_internal._$n_core_countable_list_impl);
  let tmp_AUTO_291 = $procs._$n_impl_$o__$o_new(Contains, $calcit_DOT_internal._$n_core_contains_list_impl);
  return $procs._$L_(_$n_core_list_methods, tmp_AUTO_285, tmp_AUTO_286, tmp_AUTO_287, tmp_AUTO_288, tmp_AUTO_289, tmp_AUTO_290, tmp_AUTO_291);
})();

export var MapDestruct = (function _fn_(){
  let tmp_AUTO_313 = $procs._$L_(_t_.some, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("K")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("V")]), new CalcitSliceList([new CalcitSymbol("::"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("Map")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("K")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("V")])]));
  return $procs._$n_enum_def_$o_new(_t_.MapDestruct, $procs._$L_(new CalcitSymbol("K"), new CalcitSymbol("V")), tmp_AUTO_313, $procs._$L_(_t_.none));
})();

export var _$n_core_map_methods = (function _fn_(){
  let tmp_AUTO_327 = $procs._$o__$o_(_t_.add, _$n_map_$o_add_entry);
  let tmp_AUTO_328 = $procs._$o__$o_(_t_.assoc, $procs._$n_map_$o_assoc);
  let tmp_AUTO_329 = $procs._$o__$o_(_t_["common-keys"], $procs._$n_map_$o_common_keys);
  let tmp_AUTO_330 = $procs._$o__$o_(_t_["contains?"], $procs._$n_map_$o_contains_$q_);
  let tmp_AUTO_331 = $procs._$o__$o_(_t_.count, $procs._$n_map_$o_count);
  let tmp_AUTO_332 = $procs._$o__$o_(_t_.destruct, destruct_map);
  let tmp_AUTO_333 = $procs._$o__$o_(_t_["diff-keys"], $procs._$n_map_$o_diff_keys);
  let tmp_AUTO_334 = $procs._$o__$o_(_t_["diff-new"], $procs._$n_map_$o_diff_new);
  let tmp_AUTO_335 = $procs._$o__$o_(_t_["diff-triple"], $procs._$n_map_$o_diff_triple);
  let tmp_AUTO_336 = $procs._$o__$o_(_t_.dissoc, $procs._$n_map_$o_dissoc);
  let tmp_AUTO_337 = $procs._$o__$o_(_t_.empty, _$n_map_$o_empty);
  let tmp_AUTO_338 = $procs._$o__$o_(_t_["empty?"], $procs._$n_map_$o_empty_$q_);
  let tmp_AUTO_339 = $procs._$o__$o_(_t_.filter, _$n_map_$o_filter);
  let tmp_AUTO_340 = $procs._$o__$o_(_t_["filter-kv"], _$n_map_$o_filter_kv);
  let tmp_AUTO_341 = $procs._$o__$o_(_t_.get, get);
  let tmp_AUTO_342 = $procs._$o__$o_(_t_["get-in"], get_in);
  let tmp_AUTO_343 = $procs._$o__$o_(_t_["includes?"], $procs._$n_map_$o_includes_$q_);
  let tmp_AUTO_344 = $procs._$o__$o_(_t_.keys, keys);
  let tmp_AUTO_345 = $procs._$o__$o_(_t_.map, _$n_map_$o_map);
  let tmp_AUTO_346 = $procs._$o__$o_(_t_["map-kv"], map_kv);
  let tmp_AUTO_347 = $procs._$o__$o_(_t_["map-list"], _$n_map_$o_map_list);
  let tmp_AUTO_348 = $procs._$o__$o_(_t_.mappend, merge);
  let tmp_AUTO_349 = $procs._$o__$o_(_t_.merge, merge);
  let tmp_AUTO_350 = $procs._$o__$o_(_t_["to-list"], $procs._$n_map_$o_to_list);
  let tmp_AUTO_351 = $procs._$o__$o_(_t_["to-map"], identity);
  let tmp_AUTO_352 = $procs._$o__$o_(_t_["to-pairs"], $procs.to_pairs);
  let tmp_AUTO_353 = $procs._$o__$o_(_t_.values, vals);
  return $procs._$n_impl_$o__$o_new(_t_["&core-map-methods"], tmp_AUTO_327, tmp_AUTO_328, tmp_AUTO_329, tmp_AUTO_330, tmp_AUTO_331, tmp_AUTO_332, tmp_AUTO_333, tmp_AUTO_334, tmp_AUTO_335, tmp_AUTO_336, tmp_AUTO_337, tmp_AUTO_338, tmp_AUTO_339, tmp_AUTO_340, tmp_AUTO_341, tmp_AUTO_342, tmp_AUTO_343, tmp_AUTO_344, tmp_AUTO_345, tmp_AUTO_346, tmp_AUTO_347, tmp_AUTO_348, tmp_AUTO_349, tmp_AUTO_350, tmp_AUTO_351, tmp_AUTO_352, tmp_AUTO_353);
})();

export var _$n_core_map_impls = (function _fn_(){
  let tmp_AUTO_354 = $procs._$n_impl_$o__$o_new(Debug, $calcit_DOT_internal._$n_core_debug_impl);
  let tmp_AUTO_355 = $procs._$n_impl_$o__$o_new(Eq, $calcit_DOT_internal._$n_core_eq_impl);
  let tmp_AUTO_356 = $procs._$n_impl_$o__$o_new(Len, $calcit_DOT_internal._$n_core_len_map_impl);
  let tmp_AUTO_357 = $procs._$n_impl_$o__$o_new(Mappable, $calcit_DOT_internal._$n_core_mappable_map_impl);
  let tmp_AUTO_358 = $procs._$n_impl_$o__$o_new(Countable, $calcit_DOT_internal._$n_core_countable_map_impl);
  let tmp_AUTO_359 = $procs._$n_impl_$o__$o_new(Contains, $calcit_DOT_internal._$n_core_contains_map_impl);
  return $procs._$L_(_$n_core_map_methods, tmp_AUTO_354, tmp_AUTO_355, tmp_AUTO_356, tmp_AUTO_357, tmp_AUTO_358, tmp_AUTO_359);
})();

export var _$n_core_number_methods = (function _fn_(){
  let tmp_AUTO_360 = $procs._$o__$o_(_t_.ceil, $procs.ceil);
  let tmp_AUTO_361 = $procs._$o__$o_(_t_.empty, _$n_number_$o_empty);
  let tmp_AUTO_362 = $procs._$o__$o_(_t_.floor, $procs.floor);
  let tmp_AUTO_363 = $procs._$o__$o_(_t_.format, $procs._$n_number_$o_format);
  let tmp_AUTO_364 = $procs._$o__$o_(_t_["display-by"], $procs._$n_number_$o_display_by);
  let tmp_AUTO_365 = $procs._$o__$o_(_t_.inc, inc);
  let tmp_AUTO_366 = $procs._$o__$o_(_t_.pow, $procs.pow);
  let tmp_AUTO_367 = $procs._$o__$o_(_t_.round, $procs.round);
  let tmp_AUTO_368 = $procs._$o__$o_(_t_["round?"], $procs.round_$q_);
  let tmp_AUTO_369 = $procs._$o__$o_(_t_.fract, $procs._$n_number_$o_fract);
  let tmp_AUTO_370 = $procs._$o__$o_(_t_.sqrt, $procs.sqrt);
  let tmp_AUTO_371 = $procs._$o__$o_(_t_.negate, negate);
  let tmp_AUTO_372 = $procs._$o__$o_(_t_.rem, $procs._$n_number_$o_rem);
  let tmp_AUTO_373 = $procs._$o__$o_(_t_.compare, $procs._$n_compare);
  return $procs._$n_impl_$o__$o_new(_t_["&core-number-methods"], tmp_AUTO_360, tmp_AUTO_361, tmp_AUTO_362, tmp_AUTO_363, tmp_AUTO_364, tmp_AUTO_365, tmp_AUTO_366, tmp_AUTO_367, tmp_AUTO_368, tmp_AUTO_369, tmp_AUTO_370, tmp_AUTO_371, tmp_AUTO_372, tmp_AUTO_373);
})();

export var Compare = $procs._$n_trait_$o__$o_new(_t_.Compare, $procs._$L_($procs._$L_(_t_.compare, new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.return, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("Number")])])])]))));

export var Multiply = $procs._$n_trait_$o__$o_new(_t_.Multiply, $procs._$L_($procs._$L_(_t_.multiply, new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.return, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])])])]))));

export var _$n_core_number_impls = (function _fn_(){
  let tmp_AUTO_374 = $procs._$n_impl_$o__$o_new(Debug, $calcit_DOT_internal._$n_core_debug_impl);
  let tmp_AUTO_375 = $procs._$n_impl_$o__$o_new(Eq, $calcit_DOT_internal._$n_core_eq_impl);
  let tmp_AUTO_376 = $procs._$n_impl_$o__$o_new(Add, $calcit_DOT_internal._$n_core_add_number_impl);
  let tmp_AUTO_377 = $procs._$n_impl_$o__$o_new(Multiply, $calcit_DOT_internal._$n_core_multiply_number_impl);
  let tmp_AUTO_378 = $procs._$n_impl_$o__$o_new(Compare, $calcit_DOT_internal._$n_core_compare_number_impl);
  return $procs._$L_(_$n_core_number_methods, tmp_AUTO_374, tmp_AUTO_375, tmp_AUTO_376, tmp_AUTO_377, tmp_AUTO_378);
})();

export var _$n_core_scalar_impls = $procs._$L_($procs._$n_impl_$o__$o_new(Debug, $calcit_DOT_internal._$n_core_debug_impl), $procs._$n_impl_$o__$o_new(Eq, $calcit_DOT_internal._$n_core_eq_impl));

export var SetDestruct = $procs._$n_enum_def_$o_new(_t_.SetDestruct, $procs._$L_(new CalcitSymbol("T")), $procs._$L_(_t_.some, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")]), new CalcitSliceList([new CalcitSymbol("::"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("Set")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])), $procs._$L_(_t_.none));

export var _$n_core_set_methods = (function _fn_(){
  let tmp_AUTO_391 = $procs._$o__$o_(_t_.add, include);
  let tmp_AUTO_392 = $procs._$o__$o_(_t_["contains?"], $procs._$n_set_$o_includes_$q_);
  let tmp_AUTO_393 = $procs._$o__$o_(_t_.count, $procs._$n_set_$o_count);
  let tmp_AUTO_394 = $procs._$o__$o_(_t_.destruct, destruct_set);
  let tmp_AUTO_395 = $procs._$o__$o_(_t_.difference, difference);
  let tmp_AUTO_396 = $procs._$o__$o_(_t_.empty, _$n_set_$o_empty);
  let tmp_AUTO_397 = $procs._$o__$o_(_t_["empty?"], $procs._$n_set_$o_empty_$q_);
  let tmp_AUTO_398 = $procs._$o__$o_(_t_.exclude, exclude);
  let tmp_AUTO_399 = $procs._$o__$o_(_t_.filter, _$n_set_$o_filter);
  let tmp_AUTO_400 = $procs._$o__$o_(_t_.include, include);
  let tmp_AUTO_401 = $procs._$o__$o_(_t_["includes?"], $procs._$n_set_$o_includes_$q_);
  let tmp_AUTO_402 = $procs._$o__$o_(_t_.intersection, intersection);
  let tmp_AUTO_403 = $procs._$o__$o_(_t_.map, _$n_set_$o_map);
  let tmp_AUTO_404 = $procs._$o__$o_(_t_.mappend, union);
  let tmp_AUTO_405 = $procs._$o__$o_(_t_.max, _$n_set_$o_max);
  let tmp_AUTO_406 = $procs._$o__$o_(_t_.min, _$n_set_$o_min);
  let tmp_AUTO_407 = $procs._$o__$o_(_t_["to-list"], $procs._$n_set_$o_to_list);
  let tmp_AUTO_408 = $procs._$o__$o_(_t_["to-set"], identity);
  let tmp_AUTO_409 = $procs._$o__$o_(_t_.union, union);
  return $procs._$n_impl_$o__$o_new(_t_["&core-set-methods"], tmp_AUTO_391, tmp_AUTO_392, tmp_AUTO_393, tmp_AUTO_394, tmp_AUTO_395, tmp_AUTO_396, tmp_AUTO_397, tmp_AUTO_398, tmp_AUTO_399, tmp_AUTO_400, tmp_AUTO_401, tmp_AUTO_402, tmp_AUTO_403, tmp_AUTO_404, tmp_AUTO_405, tmp_AUTO_406, tmp_AUTO_407, tmp_AUTO_408, tmp_AUTO_409);
})();

export var _$n_core_set_impls = (function _fn_(){
  let tmp_AUTO_410 = $procs._$n_impl_$o__$o_new(Debug, $calcit_DOT_internal._$n_core_debug_impl);
  let tmp_AUTO_411 = $procs._$n_impl_$o__$o_new(Eq, $calcit_DOT_internal._$n_core_eq_impl);
  let tmp_AUTO_412 = $procs._$n_impl_$o__$o_new(Len, $calcit_DOT_internal._$n_core_len_set_impl);
  let tmp_AUTO_413 = $procs._$n_impl_$o__$o_new(Mappable, $calcit_DOT_internal._$n_core_mappable_set_impl);
  let tmp_AUTO_414 = $procs._$n_impl_$o__$o_new(Countable, $calcit_DOT_internal._$n_core_countable_set_impl);
  let tmp_AUTO_415 = $procs._$n_impl_$o__$o_new(Contains, $calcit_DOT_internal._$n_core_contains_set_impl);
  return $procs._$L_(_$n_core_set_methods, tmp_AUTO_410, tmp_AUTO_411, tmp_AUTO_412, tmp_AUTO_413, tmp_AUTO_414, tmp_AUTO_415);
})();

export var _$n_core_string_methods = (function _fn_(){
  let tmp_AUTO_418 = $procs._$o__$o_(_t_["blank?"], $procs.blank_$q_);
  let tmp_AUTO_419 = $procs._$o__$o_(_t_.count, $procs._$n_str_$o_count);
  let tmp_AUTO_420 = $procs._$o__$o_(_t_.empty, _$n_str_$o_empty);
  let tmp_AUTO_421 = $procs._$o__$o_(_t_["ends-with?"], $procs.ends_with_$q_);
  let tmp_AUTO_422 = $procs._$o__$o_(_t_.get, get);
  let tmp_AUTO_423 = $procs._$o__$o_(_t_["parse-float"], parse_float);
  let tmp_AUTO_424 = $procs._$o__$o_(_t_.replace, $procs._$n_str_$o_replace);
  let tmp_AUTO_425 = $procs._$o__$o_(_t_.split, $procs.split);
  let tmp_AUTO_426 = $procs._$o__$o_(_t_["split-lines"], $procs.split_lines);
  let tmp_AUTO_427 = $procs._$o__$o_(_t_["starts-with?"], $procs.starts_with_$q_);
  let tmp_AUTO_428 = $procs._$o__$o_(_t_["strip-prefix"], strip_prefix);
  let tmp_AUTO_429 = $procs._$o__$o_(_t_["strip-suffix"], strip_suffix);
  let tmp_AUTO_430 = $procs._$o__$o_(_t_.slice, $procs._$n_str_$o_slice);
  let tmp_AUTO_431 = $procs._$o__$o_(_t_.trim, $procs.trim);
  let tmp_AUTO_432 = $procs._$o__$o_(_t_["empty?"], $procs._$n_str_$o_empty_$q_);
  let tmp_AUTO_433 = $procs._$o__$o_(_t_["contains?"], $procs._$n_str_$o_contains_$q_);
  let tmp_AUTO_434 = $procs._$o__$o_(_t_["includes?"], $procs._$n_str_$o_includes_$q_);
  let tmp_AUTO_435 = $procs._$o__$o_(_t_.nth, nth);
  let tmp_AUTO_436 = $procs._$o__$o_(_t_.first, first);
  let tmp_AUTO_437 = $procs._$o__$o_(_t_.rest, $procs._$n_str_$o_rest);
  let tmp_AUTO_438 = $procs._$o__$o_(_t_["pad-left"], $procs._$n_str_$o_pad_left);
  let tmp_AUTO_439 = $procs._$o__$o_(_t_["pad-right"], $procs._$n_str_$o_pad_right);
  let tmp_AUTO_440 = $procs._$o__$o_(_t_["find-index"], str_find_index);
  let tmp_AUTO_441 = $procs._$o__$o_(_t_["get-char-code"], $procs.get_char_code);
  let tmp_AUTO_442 = $procs._$o__$o_(_t_.escape, $procs._$n_str_$o_escape);
  let tmp_AUTO_443 = $procs._$o__$o_(_t_.mappend, $procs._$n_str_$o_concat);
  let tmp_AUTO_444 = $procs._$o__$o_(_t_.compare, $procs._$n_str_$o_compare);
  return $procs._$n_impl_$o__$o_new(_t_["&core-string-methods"], tmp_AUTO_418, tmp_AUTO_419, tmp_AUTO_420, tmp_AUTO_421, tmp_AUTO_422, tmp_AUTO_423, tmp_AUTO_424, tmp_AUTO_425, tmp_AUTO_426, tmp_AUTO_427, tmp_AUTO_428, tmp_AUTO_429, tmp_AUTO_430, tmp_AUTO_431, tmp_AUTO_432, tmp_AUTO_433, tmp_AUTO_434, tmp_AUTO_435, tmp_AUTO_436, tmp_AUTO_437, tmp_AUTO_438, tmp_AUTO_439, tmp_AUTO_440, tmp_AUTO_441, tmp_AUTO_442, tmp_AUTO_443, tmp_AUTO_444);
})();

export var _$n_core_string_impls = (function _fn_(){
  let tmp_AUTO_445 = $procs._$n_impl_$o__$o_new(Debug, $calcit_DOT_internal._$n_core_debug_impl);
  let tmp_AUTO_446 = $procs._$n_impl_$o__$o_new(Eq, $calcit_DOT_internal._$n_core_eq_impl);
  let tmp_AUTO_447 = $procs._$n_impl_$o__$o_new(Add, $calcit_DOT_internal._$n_core_add_string_impl);
  let tmp_AUTO_448 = $procs._$n_impl_$o__$o_new(Len, $calcit_DOT_internal._$n_core_len_string_impl);
  let tmp_AUTO_449 = $procs._$n_impl_$o__$o_new(Countable, $calcit_DOT_internal._$n_core_countable_string_impl);
  let tmp_AUTO_450 = $procs._$n_impl_$o__$o_new(Contains, $calcit_DOT_internal._$n_core_contains_string_impl);
  let tmp_AUTO_451 = $procs._$n_impl_$o__$o_new(Compare, $calcit_DOT_internal._$n_core_compare_string_impl);
  return $procs._$L_(_$n_core_string_methods, tmp_AUTO_445, tmp_AUTO_446, tmp_AUTO_447, tmp_AUTO_448, tmp_AUTO_449, tmp_AUTO_450, tmp_AUTO_451);
})();

export var _$n_core_struct_methods = (function _fn_(){
  let tmp_AUTO_452 = $procs._$o__$o_(_t_.count, $procs._$n_struct_$o_count);
  let tmp_AUTO_453 = $procs._$o__$o_(_t_["contains?"], $procs._$n_struct_$o_contains_$q_);
  let tmp_AUTO_454 = $procs._$o__$o_(_t_.assoc, $procs._$n_struct_$o_assoc);
  let tmp_AUTO_455 = $procs._$o__$o_(_t_["to-map"], $procs._$n_struct_$o_to_map);
  let tmp_AUTO_456 = (function _fn_(){
    let tmp_AUTO_457 = function _$n_struct_$o_empty_$q__impl(x) {
      if (arguments.length !== 1) throw $procs._args_throw('&struct:empty?-impl', 1, arguments.length);
      let tmp_AUTO_458 = $procs._$n_struct_$o_count(x);
      return $procs._$n__$e_(0, tmp_AUTO_458)
    }
    ;
    return $procs._$o__$o_(_t_["empty?"], tmp_AUTO_457);
  })();
  return $procs._$n_impl_$o__$o_new(_t_["&core-struct-methods"], tmp_AUTO_452, tmp_AUTO_453, tmp_AUTO_454, tmp_AUTO_455, tmp_AUTO_456);
})();

export var _$n_core_struct_impls = (function _fn_(){
  let tmp_AUTO_459 = $procs._$n_impl_$o__$o_new(Debug, $calcit_DOT_internal._$n_core_debug_impl);
  let tmp_AUTO_460 = $procs._$n_impl_$o__$o_new(Eq, $calcit_DOT_internal._$n_core_eq_impl);
  let tmp_AUTO_461 = $procs._$n_impl_$o__$o_new(Countable, $calcit_DOT_internal._$n_core_countable_struct_impl);
  let tmp_AUTO_462 = $procs._$n_impl_$o__$o_new(Contains, $calcit_DOT_internal._$n_core_contains_struct_impl);
  return $procs._$L_(_$n_core_struct_methods, tmp_AUTO_459, tmp_AUTO_460, tmp_AUTO_461, tmp_AUTO_462);
})();

export var Show = $procs._$n_trait_$o__$o_new(_t_.Show, $procs._$L_($procs._$L_(_t_.show, new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.return, _t_.string]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])])])]))));

export var Deserialize = $procs._$n_trait_$o__$o_new(_t_.Deserialize, $procs._$L_($procs._$L_(_t_.deserialize, new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.return, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), _t_.string])])])]))));

export var ListDestruct = $procs._$n_enum_def_$o_new(_t_.ListDestruct, $procs._$L_(new CalcitSymbol("T")), $procs._$L_(_t_.some, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")]), new CalcitSliceList([new CalcitSymbol("::"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("List")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])), $procs._$L_(_t_.none));

export var RuntimeMapMeta = $procs._$n_struct_def_$o_new(_t_.RuntimeMapMeta, $procs._$L_(_t_.kind, new CalcitSymbol("Tag")));

export var RuntimeMapResponse = (function _fn_(){
  let tmp_AUTO_477 = $procs._$L_(_t_.code, new CalcitSymbol("Number"));
  let tmp_AUTO_478 = $procs._$L_(_t_.message, new CalcitSliceList([new CalcitSymbol("::"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("Option")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("String")])]));
  let tmp_AUTO_479 = $procs._$L_(_t_.body, new CalcitSymbol("Dynamic"));
  let tmp_AUTO_480 = $procs._$L_(_t_.meta, new CalcitSliceList([new CalcitSymbol("::"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("Option")]), new CalcitSymbol("RuntimeMapMeta")]));
  return $procs._$n_struct_def_$o_new(_t_.RuntimeMapResponse, tmp_AUTO_477, tmp_AUTO_478, tmp_AUTO_479, tmp_AUTO_480);
})();

export var Serialize = $procs._$n_trait_$o__$o_new(_t_.Serialize, $procs._$L_($procs._$L_(_t_.serialize, new CalcitSliceList([new CalcitSymbol("::"), _t_.fn, new CalcitSliceList([new CalcitSymbol("{}"), new CalcitSliceList([_t_.return, _t_.string]), new CalcitSliceList([_t_.generics, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])]), new CalcitSliceList([_t_.args, new CalcitSliceList([new CalcitSymbol("[]"), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("T")])])])])]))));

export var StringDestruct = $procs._$n_enum_def_$o_new(_t_.StringDestruct, $procs._$L_(_t_.some, new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("String")]), new CalcitSliceList([new CalcitSymbol('quote'), new CalcitSymbol("String")])), $procs._$L_(_t_.none));


$procs.register_calcit_builtin_impls({
  list: _$n_core_list_impls,
  map: _$n_core_map_impls,
  number: _$n_core_number_impls,
  set: _$n_core_set_impls,
  string: _$n_core_string_impls,
  fn: _$n_core_fn_impls,
  enum: _$n_core_enum_impls,
  struct: _$n_core_struct_impls,
  scalar: _$n_core_scalar_impls,
});

let runtimeVersion = $procs.calcit_version;
let cli_version = '0.13.29';

if (runtimeVersion !== cli_version) {
  console.warn(`[Warning] versions mismatch, CLI using: ${cli_version}, runtime using: ${runtimeVersion}`)
}
