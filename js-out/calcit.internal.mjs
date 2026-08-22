
import * as $clt from "./calcit.core.mjs";
const _t_ = $clt.init_tags(["&core-add-list-impl","&core-add-number-impl","&core-add-string-impl","&core-compare-number-impl","&core-compare-string-impl","&core-contains-enum-impl","&core-contains-list-impl","&core-contains-map-impl","&core-contains-set-impl","&core-contains-string-impl","&core-contains-struct-impl","&core-countable-enum-impl","&core-countable-list-impl","&core-countable-map-impl","&core-countable-set-impl","&core-countable-string-impl","&core-countable-struct-impl","&core-debug-impl","&core-eq-impl","&core-len-list-impl","&core-len-map-impl","&core-len-set-impl","&core-len-string-impl","&core-mappable-list-impl","&core-mappable-map-impl","&core-mappable-set-impl","&core-multiply-number-impl","add","compare","contains?","count","debug","eq?","fn","len","map","multiply",]);

export function normalize_trait_type(t0) {
  if (arguments.length !== 1) throw $clt._args_throw('normalize-trait-type', 1, arguments.length);

  if ($clt.list_$q_(t0)) { let size = $clt._$n_list_$o_count(t0);
  let head = $clt._$n_list_$o_first(t0);
  let second = ($clt._$n__GT__$e_(size, 2) ? $clt._$n_list_$o_nth(t0, 1) : $clt._$L_());
  let third = ($clt._$n__GT__$e_(size, 3) ? $clt._$n_list_$o_nth(t0, 2) : $clt._$L_());
  let wrap_list = function f_PCT_(x) {
    if (arguments.length !== 1) throw $clt._args_throw('f%', 1, arguments.length);

    if ($clt.list_$q_(x)) { return x } else { return $clt._$L_(x) }
  }
  ;

  if (($clt.tag_$q_(head) ? ($clt._$n__$e_(head, _t_.fn) ? (function _fn_(){
    let v1__1 = $clt._$n__$e_(size, 3);

    if (v1__1) { return v1__1 } else { return false }
  })() : false) : false)) { let tmp_AUTO_3 = $clt._$L_();
  let tmp_AUTO_4 = wrap_list(second);
  let tmp_AUTO_5 = $clt._$n_list_$o_nth(t0, 2);
  return $clt._$L_(_t_.fn, tmp_AUTO_3, tmp_AUTO_4, tmp_AUTO_5) }
   else if (($clt.tag_$q_(head) ? ($clt._$n__$e_(head, _t_.fn) ? (function _fn_(){
    let v1__2 = $clt._$n__$e_(size, 4);

    if (v1__2) { return v1__2 } else { return false }
  })() : false) : false)) { let tmp_AUTO_6 = wrap_list(second);
  let tmp_AUTO_7 = wrap_list(third);
  let tmp_AUTO_8 = $clt._$n_list_$o_nth(t0, 3);
  return $clt._$L_(_t_.fn, tmp_AUTO_6, tmp_AUTO_7, tmp_AUTO_8) }
   else if (($clt.tag_$q_(second) ? ($clt._$n__$e_(second, _t_.fn) ? (function _fn_(){
    let v1__3 = $clt._$n__$e_(size, 4);

    if (v1__3) { return v1__3 } else { return false }
  })() : false) : false)) { let tmp_AUTO_9 = $clt._$L_();
  let tmp_AUTO_10 = wrap_list(third);
  let tmp_AUTO_11 = $clt._$n_list_$o_nth(t0, 3);
  return $clt._$L_(head, second, tmp_AUTO_9, tmp_AUTO_10, tmp_AUTO_11) }
   else if (($clt.tag_$q_(second) ? ($clt._$n__$e_(second, _t_.fn) ? (function _fn_(){
    let v1__4 = $clt._$n__$e_(size, 5);

    if (v1__4) { return v1__4 } else { return false }
  })() : false) : false)) { let tmp_AUTO_12 = wrap_list(third);
  let tmp_AUTO_13 = wrap_list($clt._$n_list_$o_nth(t0, 3));
  let tmp_AUTO_14 = $clt._$n_list_$o_nth(t0, 4);
  return $clt._$L_(head, second, tmp_AUTO_12, tmp_AUTO_13, tmp_AUTO_14) } else { return t0 }




   } else { return t0 }
}



export var _$n_core_add_list_impl = $clt._$n_impl_$o__$o_new(_t_["&core-add-list-impl"], $clt._$o__$o_(_t_.add, $clt._$n_list_$o_concat));

export var _$n_core_add_number_impl = $clt._$n_impl_$o__$o_new(_t_["&core-add-number-impl"], $clt._$o__$o_(_t_.add, $clt._$n__ADD_));

export var _$n_core_add_string_impl = $clt._$n_impl_$o__$o_new(_t_["&core-add-string-impl"], $clt._$o__$o_(_t_.add, $clt._$n_str_$o_concat));

export var _$n_core_compare_number_impl = $clt._$n_impl_$o__$o_new(_t_["&core-compare-number-impl"], $clt._$o__$o_(_t_.compare, $clt._$n_compare));

export var _$n_core_compare_string_impl = $clt._$n_impl_$o__$o_new(_t_["&core-compare-string-impl"], $clt._$o__$o_(_t_.compare, $clt._$n_str_$o_compare));

export var _$n_core_contains_enum_impl = $clt._$n_impl_$o__$o_new(_t_["&core-contains-enum-impl"], (function _fn_(){
  let tmp_AUTO_1 = function f_PCT_(x, k) {
    if (arguments.length !== 2) throw $clt._args_throw('f%', 2, arguments.length);

    if ($clt._$n__GT__$e_(k, 0)) { let tmp_AUTO_2 = $clt._$n_enum_$o_count(x);
    return $clt._$n__LT_(k, tmp_AUTO_2) } else { return false }
  }
  ;
  return $clt._$o__$o_(_t_["contains?"], tmp_AUTO_1);
})());

export var _$n_core_contains_list_impl = $clt._$n_impl_$o__$o_new(_t_["&core-contains-list-impl"], $clt._$o__$o_(_t_["contains?"], $clt._$n_list_$o_contains_$q_));

export var _$n_core_contains_map_impl = $clt._$n_impl_$o__$o_new(_t_["&core-contains-map-impl"], $clt._$o__$o_(_t_["contains?"], $clt._$n_map_$o_contains_$q_));

export var _$n_core_contains_set_impl = $clt._$n_impl_$o__$o_new(_t_["&core-contains-set-impl"], $clt._$o__$o_(_t_["contains?"], $clt._$n_set_$o_includes_$q_));

export var _$n_core_contains_string_impl = $clt._$n_impl_$o__$o_new(_t_["&core-contains-string-impl"], $clt._$o__$o_(_t_["contains?"], $clt._$n_str_$o_contains_$q_));

export var _$n_core_contains_struct_impl = $clt._$n_impl_$o__$o_new(_t_["&core-contains-struct-impl"], $clt._$o__$o_(_t_["contains?"], $clt._$n_struct_$o_contains_$q_));

export var _$n_core_countable_enum_impl = $clt._$n_impl_$o__$o_new(_t_["&core-countable-enum-impl"], $clt._$o__$o_(_t_.count, $clt._$n_enum_$o_count));

export var _$n_core_countable_list_impl = $clt._$n_impl_$o__$o_new(_t_["&core-countable-list-impl"], $clt._$o__$o_(_t_.count, $clt._$n_list_$o_count));

export var _$n_core_countable_map_impl = $clt._$n_impl_$o__$o_new(_t_["&core-countable-map-impl"], $clt._$o__$o_(_t_.count, $clt._$n_map_$o_count));

export var _$n_core_countable_set_impl = $clt._$n_impl_$o__$o_new(_t_["&core-countable-set-impl"], $clt._$o__$o_(_t_.count, $clt._$n_set_$o_count));

export var _$n_core_countable_string_impl = $clt._$n_impl_$o__$o_new(_t_["&core-countable-string-impl"], $clt._$o__$o_(_t_.count, $clt._$n_str_$o_count));

export var _$n_core_countable_struct_impl = $clt._$n_impl_$o__$o_new(_t_["&core-countable-struct-impl"], $clt._$o__$o_(_t_.count, $clt._$n_struct_$o_count));

export var _$n_core_debug_impl = $clt._$n_impl_$o__$o_new(_t_["&core-debug-impl"], $clt._$o__$o_(_t_.debug, $clt._$n_str));

export var _$n_core_eq_impl = $clt._$n_impl_$o__$o_new(_t_["&core-eq-impl"], $clt._$o__$o_(_t_["eq?"], $clt._$n__$e_));

export var _$n_core_len_list_impl = $clt._$n_impl_$o__$o_new(_t_["&core-len-list-impl"], $clt._$o__$o_(_t_.len, $clt._$n_list_$o_count));

export var _$n_core_len_map_impl = $clt._$n_impl_$o__$o_new(_t_["&core-len-map-impl"], $clt._$o__$o_(_t_.len, $clt._$n_map_$o_count));

export var _$n_core_len_set_impl = $clt._$n_impl_$o__$o_new(_t_["&core-len-set-impl"], $clt._$o__$o_(_t_.len, $clt._$n_set_$o_count));

export var _$n_core_len_string_impl = $clt._$n_impl_$o__$o_new(_t_["&core-len-string-impl"], $clt._$o__$o_(_t_.len, $clt._$n_str_$o_count));

export var _$n_core_mappable_list_impl = $clt._$n_impl_$o__$o_new(_t_["&core-mappable-list-impl"], $clt._$o__$o_(_t_.map, $clt._$n_list_$o_map));

export var _$n_core_mappable_map_impl = $clt._$n_impl_$o__$o_new(_t_["&core-mappable-map-impl"], $clt._$o__$o_(_t_.map, $clt._$n_map_$o_map));

export var _$n_core_mappable_set_impl = $clt._$n_impl_$o__$o_new(_t_["&core-mappable-set-impl"], $clt._$o__$o_(_t_.map, $clt._$n_set_$o_map));

export var _$n_core_multiply_number_impl = $clt._$n_impl_$o__$o_new(_t_["&core-multiply-number-impl"], $clt._$o__$o_(_t_.multiply, $clt._$n__$s_));

