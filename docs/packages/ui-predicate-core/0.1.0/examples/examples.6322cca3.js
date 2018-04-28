// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({583:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
       value: true
});
exports.default = _isPlaceholder;
function _isPlaceholder(a) {
       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}
},{}],525:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _curry1;

var _isPlaceholder2 = require('./_isPlaceholder');

var _isPlaceholder3 = _interopRequireDefault(_isPlaceholder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || (0, _isPlaceholder3.default)(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}
},{"./_isPlaceholder":583}],40:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      var t = R.always('Tee');
 *      t(); //=> 'Tee'
 */
var always = /*#__PURE__*/(0, _curry2.default)(function always(val) {
  return function () {
    return val;
  };
});
exports.default = always;
},{"./internal/_curry1":525}],24:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _always = require('./always');

var _always2 = _interopRequireDefault(_always);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.T
 * @example
 *
 *      R.F(); //=> false
 */
var F = /*#__PURE__*/(0, _always2.default)(false);
exports.default = F;
},{"./always":40}],26:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _always = require('./always');

var _always2 = _interopRequireDefault(_always);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.F
 * @example
 *
 *      R.T(); //=> true
 */
var T = /*#__PURE__*/(0, _always2.default)(true);
exports.default = T;
},{"./always":40}],28:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
exports.default = { '@@functional/placeholder': true };
},{}],520:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _curry2;

var _curry = require('./_curry1');

var _curry3 = _interopRequireDefault(_curry);

var _isPlaceholder2 = require('./_isPlaceholder');

var _isPlaceholder3 = _interopRequireDefault(_isPlaceholder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return (0, _isPlaceholder3.default)(a) ? f2 : (0, _curry3.default)(function (_b) {
          return fn(a, _b);
        });
      default:
        return (0, _isPlaceholder3.default)(a) && (0, _isPlaceholder3.default)(b) ? f2 : (0, _isPlaceholder3.default)(a) ? (0, _curry3.default)(function (_a) {
          return fn(_a, b);
        }) : (0, _isPlaceholder3.default)(b) ? (0, _curry3.default)(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}
},{"./_curry1":525,"./_isPlaceholder":583}],30:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */
var add = /*#__PURE__*/(0, _curry3.default)(function add(a, b) {
  return Number(a) + Number(b);
});
exports.default = add;
},{"./internal/_curry2":520}],523:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _concat;
/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];

  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
}
},{}],533:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _arity;
function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}
},{}],541:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _curryN;

var _arity2 = require('./_arity');

var _arity3 = _interopRequireDefault(_arity2);

var _isPlaceholder2 = require('./_isPlaceholder');

var _isPlaceholder3 = _interopRequireDefault(_isPlaceholder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!(0, _isPlaceholder3.default)(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!(0, _isPlaceholder3.default)(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : (0, _arity3.default)(left, _curryN(length, combined, fn));
  };
}
},{"./_arity":533,"./_isPlaceholder":583}],106:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arity2 = require('./internal/_arity');

var _arity3 = _interopRequireDefault(_arity2);

var _curry = require('./internal/_curry1');

var _curry3 = _interopRequireDefault(_curry);

var _curry4 = require('./internal/_curry2');

var _curry5 = _interopRequireDefault(_curry4);

var _curryN2 = require('./internal/_curryN');

var _curryN3 = _interopRequireDefault(_curryN2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
var curryN = /*#__PURE__*/(0, _curry5.default)(function curryN(length, fn) {
  if (length === 1) {
    return (0, _curry3.default)(fn);
  }
  return (0, _arity3.default)(length, (0, _curryN3.default)(length, [], fn));
});
exports.default = curryN;
},{"./internal/_arity":533,"./internal/_curry1":525,"./internal/_curry2":520,"./internal/_curryN":541}],32:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat2 = require('./internal/_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      var mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */
var addIndex = /*#__PURE__*/(0, _curry2.default)(function addIndex(fn) {
  return (0, _curryN2.default)(fn.length, function () {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function () {
      var result = origFn.apply(this, (0, _concat3.default)(arguments, [idx, list]));
      idx += 1;
      return result;
    };
    return fn.apply(this, args);
  });
});
exports.default = addIndex;
},{"./internal/_concat":523,"./internal/_curry1":525,"./curryN":106}],524:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _curry3;

var _curry = require('./_curry1');

var _curry4 = _interopRequireDefault(_curry);

var _curry5 = require('./_curry2');

var _curry6 = _interopRequireDefault(_curry5);

var _isPlaceholder2 = require('./_isPlaceholder');

var _isPlaceholder3 = _interopRequireDefault(_isPlaceholder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return (0, _isPlaceholder3.default)(a) ? f3 : (0, _curry6.default)(function (_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return (0, _isPlaceholder3.default)(a) && (0, _isPlaceholder3.default)(b) ? f3 : (0, _isPlaceholder3.default)(a) ? (0, _curry6.default)(function (_a, _c) {
          return fn(_a, b, _c);
        }) : (0, _isPlaceholder3.default)(b) ? (0, _curry6.default)(function (_b, _c) {
          return fn(a, _b, _c);
        }) : (0, _curry4.default)(function (_c) {
          return fn(a, b, _c);
        });
      default:
        return (0, _isPlaceholder3.default)(a) && (0, _isPlaceholder3.default)(b) && (0, _isPlaceholder3.default)(c) ? f3 : (0, _isPlaceholder3.default)(a) && (0, _isPlaceholder3.default)(b) ? (0, _curry6.default)(function (_a, _b) {
          return fn(_a, _b, c);
        }) : (0, _isPlaceholder3.default)(a) && (0, _isPlaceholder3.default)(c) ? (0, _curry6.default)(function (_a, _c) {
          return fn(_a, b, _c);
        }) : (0, _isPlaceholder3.default)(b) && (0, _isPlaceholder3.default)(c) ? (0, _curry6.default)(function (_b, _c) {
          return fn(a, _b, _c);
        }) : (0, _isPlaceholder3.default)(a) ? (0, _curry4.default)(function (_a) {
          return fn(_a, b, c);
        }) : (0, _isPlaceholder3.default)(b) ? (0, _curry4.default)(function (_b) {
          return fn(a, _b, c);
        }) : (0, _isPlaceholder3.default)(c) ? (0, _curry4.default)(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}
},{"./_curry1":525,"./_curry2":520,"./_isPlaceholder":583}],34:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat2 = require('./internal/_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig (a -> a) -> Number -> [a] -> [a]
 * @param {Function} fn The function to apply.
 * @param {Number} idx The index.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(R.add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]
 *      R.adjust(R.add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]
 * @symb R.adjust(f, -1, [a, b]) = [a, f(b)]
 * @symb R.adjust(f, 0, [a, b]) = [f(a), b]
 */
var adjust = /*#__PURE__*/(0, _curry2.default)(function adjust(fn, idx, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }
  var start = idx < 0 ? list.length : 0;
  var _idx = start + idx;
  var _list = (0, _concat3.default)(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});
exports.default = adjust;
},{"./internal/_concat":523,"./internal/_curry3":524}],531:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
exports.default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};
},{}],562:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _isTransformer;
function _isTransformer(obj) {
  return typeof obj['@@transducer/step'] === 'function';
}
},{}],521:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _dispatchable;

var _isArray2 = require('./_isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isTransformer2 = require('./_isTransformer');

var _isTransformer3 = _interopRequireDefault(_isTransformer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!(0, _isArray3.default)(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      if ((0, _isTransformer3.default)(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}
},{"./_isArray":531,"./_isTransformer":562}],573:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _reduced;
function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
},{}],585:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
};
},{}],522:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduced2 = require('./_reduced');

var _reduced3 = _interopRequireDefault(_reduced2);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XAll = /*#__PURE__*/function () {
  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }
  XAll.prototype['@@transducer/init'] = _xfBase3.default.init;
  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = (0, _reduced3.default)(this.xf['@@transducer/step'](result, false));
    }
    return result;
  };

  return XAll;
}();

var _xall = /*#__PURE__*/(0, _curry3.default)(function _xall(f, xf) {
  return new XAll(f, xf);
});
exports.default = _xall;
},{"./_curry2":520,"./_reduced":573,"./_xfBase":585}],36:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xall2 = require('./internal/_xall');

var _xall3 = _interopRequireDefault(_xall2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      var equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */
var all = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['all'], _xall3.default, function all(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }
    idx += 1;
  }
  return true;
}));
exports.default = all;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xall":522}],264:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */
var max = /*#__PURE__*/(0, _curry3.default)(function max(a, b) {
  return b > a ? b : a;
});
exports.default = max;
},{"./internal/_curry2":520}],540:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _map;
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}
},{}],538:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _isString;
function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
},{}],584:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _isArray2 = require('./_isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isString2 = require('./_isString');

var _isString3 = _interopRequireDefault(_isString2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
var _isArrayLike = /*#__PURE__*/(0, _curry2.default)(function isArrayLike(x) {
  if ((0, _isArray3.default)(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== 'object') {
    return false;
  }
  if ((0, _isString3.default)(x)) {
    return false;
  }
  if (x.nodeType === 1) {
    return !!x.length;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
exports.default = _isArrayLike;
},{"./_curry1":525,"./_isArray":531,"./_isString":538}],580:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _xwrap;
var XWrap = /*#__PURE__*/function () {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };
  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}
},{}],68:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arity2 = require('./internal/_arity');

var _arity3 = _interopRequireDefault(_arity2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */
var bind = /*#__PURE__*/(0, _curry3.default)(function bind(fn, thisObj) {
  return (0, _arity3.default)(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});
exports.default = bind;
},{"./internal/_arity":533,"./internal/_curry2":520}],527:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _reduce;

var _isArrayLike2 = require('./_isArrayLike');

var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

var _xwrap2 = require('./_xwrap');

var _xwrap3 = _interopRequireDefault(_xwrap2);

var _bind = require('../bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName]((0, _bind2.default)(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = (0, _xwrap3.default)(fn);
  }
  if ((0, _isArrayLike3.default)(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}
},{"./_isArrayLike":584,"./_xwrap":580,"../bind":68}],565:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XMap = /*#__PURE__*/function () {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase3.default.init;
  XMap.prototype['@@transducer/result'] = _xfBase3.default.result;
  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap = /*#__PURE__*/(0, _curry3.default)(function _xmap(f, xf) {
  return new XMap(f, xf);
});
exports.default = _xmap;
},{"./_curry2":520,"./_xfBase":585}],530:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _has;
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
},{}],550:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _has2 = require('./_has');

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toString = Object.prototype.toString;
var _isArguments = function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return (0, _has3.default)('callee', x);
  };
};

exports.default = _isArguments;
},{"./_has":530}],226:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _has2 = require('./internal/_has');

var _has3 = _interopRequireDefault(_has2);

var _isArguments2 = require('./internal/_isArguments');

var _isArguments3 = _interopRequireDefault(_isArguments2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// cover IE < 9 keys issues
var hasEnumBug = ! /*#__PURE__*/{ toString: null }.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
// Safari bug
var hasArgsEnumBug = /*#__PURE__*/function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
var _keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
} : function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && (0, _isArguments3.default)(obj);
  for (prop in obj) {
    if ((0, _has3.default)(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if ((0, _has3.default)(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
};
var keys = /*#__PURE__*/(0, _curry2.default)(_keys);
exports.default = keys;
},{"./internal/_curry1":525,"./internal/_has":530,"./internal/_isArguments":550}],252:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _map2 = require('./internal/_map');

var _map3 = _interopRequireDefault(_map2);

var _reduce2 = require('./internal/_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _xmap2 = require('./internal/_xmap');

var _xmap3 = _interopRequireDefault(_xmap2);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */
var map = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['fantasy-land/map', 'map'], _xmap3.default, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return (0, _curryN2.default)(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return (0, _reduce3.default)(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, (0, _keys2.default)(functor));
    default:
      return (0, _map3.default)(fn, functor);
  }
}));
exports.default = map;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_map":540,"./internal/_reduce":527,"./internal/_xmap":565,"./curryN":106,"./keys":226}],334:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
var path = /*#__PURE__*/(0, _curry3.default)(function path(paths, obj) {
  var val = obj;
  var idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
});
exports.default = path;
},{"./internal/_curry2":520}],362:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */

var prop = /*#__PURE__*/(0, _curry3.default)(function prop(p, obj) {
  return (0, _path2.default)([p], obj);
});
exports.default = prop;
},{"./internal/_curry2":520,"./path":334}],354:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _prop = require('./prop');

var _prop2 = _interopRequireDefault(_prop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
 *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */
var pluck = /*#__PURE__*/(0, _curry3.default)(function pluck(p, list) {
  return (0, _map2.default)((0, _prop2.default)(p), list);
});
exports.default = pluck;
},{"./internal/_curry2":520,"./map":252,"./prop":362}],376:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _reduce2 = require('./internal/_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */
var reduce = /*#__PURE__*/(0, _curry2.default)(_reduce3.default);
exports.default = reduce;
},{"./internal/_curry3":524,"./internal/_reduce":527}],38:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

var _max = require('./max');

var _max2 = _interopRequireDefault(_max);

var _pluck = require('./pluck');

var _pluck2 = _interopRequireDefault(_pluck);

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      var isQueen = R.propEq('rank', 'Q');
 *      var isSpade = R.propEq('suit', '♠︎');
 *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */
var allPass = /*#__PURE__*/(0, _curry2.default)(function allPass(preds) {
  return (0, _curryN2.default)((0, _reduce2.default)(_max2.default, 0, (0, _pluck2.default)('length', preds)), function () {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }
      idx += 1;
    }
    return true;
  });
});
exports.default = allPass;
},{"./internal/_curry1":525,"./curryN":106,"./max":264,"./pluck":354,"./reduce":376}],42:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */
var and = /*#__PURE__*/(0, _curry3.default)(function and(a, b) {
  return a && b;
});
exports.default = and;
},{"./internal/_curry2":520}],526:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduced2 = require('./_reduced');

var _reduced3 = _interopRequireDefault(_reduced2);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XAny = /*#__PURE__*/function () {
  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }
  XAny.prototype['@@transducer/init'] = _xfBase3.default.init;
  XAny.prototype['@@transducer/result'] = function (result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAny.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.any = true;
      result = (0, _reduced3.default)(this.xf['@@transducer/step'](result, true));
    }
    return result;
  };

  return XAny;
}();

var _xany = /*#__PURE__*/(0, _curry3.default)(function _xany(f, xf) {
  return new XAny(f, xf);
});
exports.default = _xany;
},{"./_curry2":520,"./_reduced":573,"./_xfBase":585}],44:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xany2 = require('./internal/_xany');

var _xany3 = _interopRequireDefault(_xany2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if at least one of elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      var lessThan0 = R.flip(R.lt)(0);
 *      var lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */
var any = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['any'], _xany3.default, function any(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}));
exports.default = any;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xany":526}],46:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

var _max = require('./max');

var _max2 = _interopRequireDefault(_max);

var _pluck = require('./pluck');

var _pluck2 = _interopRequireDefault(_pluck);

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      var isClub = R.propEq('suit', '♣');
 *      var isSpade = R.propEq('suit', '♠');
 *      var isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */
var anyPass = /*#__PURE__*/(0, _curry2.default)(function anyPass(preds) {
  return (0, _curryN2.default)((0, _reduce2.default)(_max2.default, 0, (0, _pluck2.default)('length', preds)), function () {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }
      idx += 1;
    }
    return false;
  });
});
exports.default = anyPass;
},{"./internal/_curry1":525,"./curryN":106,"./max":264,"./pluck":354,"./reduce":376}],48:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat2 = require('./internal/_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduce2 = require('./internal/_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (a -> b -> c) -> (a -> b) -> (a -> c)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */
var ap = /*#__PURE__*/(0, _curry3.default)(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } :
  // else
  (0, _reduce3.default)(function (acc, f) {
    return (0, _concat3.default)(acc, (0, _map2.default)(f, applyX));
  }, [], applyF);
});
exports.default = ap;
},{"./internal/_concat":523,"./internal/_curry2":520,"./internal/_reduce":527,"./map":252}],528:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _aperture;
function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);
  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }
  return acc;
}
},{}],529:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat2 = require('./_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XAperture = /*#__PURE__*/function () {
  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XAperture.prototype['@@transducer/init'] = _xfBase3.default.init;
  XAperture.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XAperture.prototype['@@transducer/step'] = function (result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };
  XAperture.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };
  XAperture.prototype.getCopy = function () {
    return (0, _concat3.default)(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return XAperture;
}();

var _xaperture = /*#__PURE__*/(0, _curry3.default)(function _xaperture(n, xf) {
  return new XAperture(n, xf);
});
exports.default = _xaperture;
},{"./_concat":523,"./_curry2":520,"./_xfBase":585}],50:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aperture2 = require('./internal/_aperture');

var _aperture3 = _interopRequireDefault(_aperture2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xaperture2 = require('./internal/_xaperture');

var _xaperture3 = _interopRequireDefault(_xaperture2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */
var aperture = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)([], _xaperture3.default, _aperture3.default));
exports.default = aperture;
},{"./internal/_aperture":528,"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xaperture":529}],52:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat2 = require('./internal/_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */
var append = /*#__PURE__*/(0, _curry3.default)(function append(el, list) {
  return (0, _concat3.default)(list, [el]);
});
exports.default = append;
},{"./internal/_concat":523,"./internal/_curry2":520}],54:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      var nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */
var apply = /*#__PURE__*/(0, _curry3.default)(function apply(fn, args) {
  return fn.apply(this, args);
});
exports.default = apply;
},{"./internal/_curry2":520}],494:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */
var values = /*#__PURE__*/(0, _curry2.default)(function values(obj) {
  var props = (0, _keys2.default)(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;
  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }
  return vals;
});
exports.default = values;
},{"./internal/_curry1":525,"./keys":226}],56:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _apply = require('./apply');

var _apply2 = _interopRequireDefault(_apply);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _max = require('./max');

var _max2 = _interopRequireDefault(_max);

var _pluck = require('./pluck');

var _pluck2 = _interopRequireDefault(_pluck);

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _values = require('./values');

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      var getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */
var applySpec = /*#__PURE__*/(0, _curry2.default)(function applySpec(spec) {
  spec = (0, _map2.default)(function (v) {
    return typeof v == 'function' ? v : applySpec(v);
  }, spec);
  return (0, _curryN2.default)((0, _reduce2.default)(_max2.default, 0, (0, _pluck2.default)('length', (0, _values2.default)(spec))), function () {
    var args = arguments;
    return (0, _map2.default)(function (f) {
      return (0, _apply2.default)(f, args);
    }, spec);
  });
});
exports.default = applySpec;
},{"./internal/_curry1":525,"./apply":54,"./curryN":106,"./map":252,"./max":264,"./pluck":354,"./reduce":376,"./values":494}],58:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Takes a value and applies a function to it.
*
* This function is also known as the `thrush` combinator.
*
* @func
* @memberOf R
 * @since v0.25.0
* @category Function
* @sig a -> (a -> b) -> b
* @param {*} x The value
* @param {Function} f The function to apply
* @return {*} The result of applying `f` to `x`
* @example
*
*      var t42 = R.applyTo(42);
*      t42(R.identity); //=> 42
*      t42(R.add(1)); //=> 43
*/
var applyTo = /*#__PURE__*/(0, _curry3.default)(function applyTo(x, f) {
  return f(x);
});
exports.default = applyTo;
},{"./internal/_curry2":520}],60:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @see R.descend
 * @example
 *
 *      var byAge = R.ascend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByYoungestFirst = R.sort(byAge, people);
 */
var ascend = /*#__PURE__*/(0, _curry2.default)(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});
exports.default = ascend;
},{"./internal/_curry3":524}],62:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */
var assoc = /*#__PURE__*/(0, _curry2.default)(function assoc(prop, val, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = val;
  return result;
});
exports.default = assoc;
},{"./internal/_curry3":524}],532:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
exports.default = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};
},{}],220:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */
var isNil = /*#__PURE__*/(0, _curry2.default)(function isNil(x) {
  return x == null;
});
exports.default = isNil;
},{"./internal/_curry1":525}],64:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _has2 = require('./internal/_has');

var _has3 = _interopRequireDefault(_has2);

var _isArray2 = require('./internal/_isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isInteger2 = require('./internal/_isInteger');

var _isInteger3 = _interopRequireDefault(_isInteger2);

var _assoc = require('./assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _isNil = require('./isNil');

var _isNil2 = _interopRequireDefault(_isNil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */
var assocPath = /*#__PURE__*/(0, _curry2.default)(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }
  var idx = path[0];
  if (path.length > 1) {
    var nextObj = !(0, _isNil2.default)(obj) && (0, _has3.default)(idx, obj) ? obj[idx] : (0, _isInteger3.default)(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }
  if ((0, _isInteger3.default)(idx) && (0, _isArray3.default)(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return (0, _assoc2.default)(idx, val, obj);
  }
});
exports.default = assocPath;
},{"./internal/_curry3":524,"./internal/_has":530,"./internal/_isArray":531,"./internal/_isInteger":532,"./assoc":62,"./isNil":220}],300:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      var takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */
var nAry = /*#__PURE__*/(0, _curry3.default)(function nAry(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.call(this);
      };
    case 1:
      return function (a0) {
        return fn.call(this, a0);
      };
    case 2:
      return function (a0, a1) {
        return fn.call(this, a0, a1);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };
    default:
      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});
exports.default = nAry;
},{"./internal/_curry2":520}],66:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _nAry = require('./nAry');

var _nAry2 = _interopRequireDefault(_nAry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> c) -> (a, b -> c)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @see R.nAry, R.unary
 * @example
 *
 *      var takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      var takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */
var binary = /*#__PURE__*/(0, _curry2.default)(function binary(fn) {
  return (0, _nAry2.default)(2, fn);
});
exports.default = binary;
},{"./internal/_curry1":525,"./nAry":300}],534:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _isFunction;
function _isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]';
}
},{}],246:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduce2 = require('./internal/_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _ap = require('./ap');

var _ap2 = _interopRequireDefault(_ap);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      var madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */
var liftN = /*#__PURE__*/(0, _curry3.default)(function liftN(arity, fn) {
  var lifted = (0, _curryN2.default)(arity, fn);
  return (0, _curryN2.default)(arity, function () {
    return (0, _reduce3.default)(_ap2.default, (0, _map2.default)(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});
exports.default = liftN;
},{"./internal/_curry2":520,"./internal/_reduce":527,"./ap":48,"./curryN":106,"./map":252}],244:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _liftN = require('./liftN');

var _liftN2 = _interopRequireDefault(_liftN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      var madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */
var lift = /*#__PURE__*/(0, _curry2.default)(function lift(fn) {
  return (0, _liftN2.default)(fn.length, fn);
});
exports.default = lift;
},{"./internal/_curry1":525,"./liftN":246}],70:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _isFunction2 = require('./internal/_isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _and = require('./and');

var _and2 = _interopRequireDefault(_and);

var _lift = require('./lift');

var _lift2 = _interopRequireDefault(_lift);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.and
 * @example
 *
 *      var gt10 = R.gt(R.__, 10)
 *      var lt20 = R.lt(R.__, 20)
 *      var f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 */
var both = /*#__PURE__*/(0, _curry3.default)(function both(f, g) {
  return (0, _isFunction3.default)(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : (0, _lift2.default)(_and2.default)(f, g);
});
exports.default = both;
},{"./internal/_curry2":520,"./internal/_isFunction":534,"./and":42,"./lift":244}],104:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
var curry = /*#__PURE__*/(0, _curry2.default)(function curry(fn) {
  return (0, _curryN2.default)(fn.length, fn);
});
exports.default = curry;
},{"./internal/_curry1":525,"./curryN":106}],72:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      var indentN = R.pipe(R.repeat(' '),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      var format = R.converge(R.call, [
 *                                  R.pipe(R.prop('indent'), indentN),
 *                                  R.prop('value')
 *                              ]);
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */
var call = /*#__PURE__*/(0, _curry2.default)(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});
exports.default = call;
},{"./curry":104}],535:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _makeFlat;

var _isArrayLike2 = require('./_isArrayLike');

var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */
function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if ((0, _isArrayLike3.default)(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
}
},{"./_isArrayLike":584}],591:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _forceReduced;
function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
},{}],589:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forceReduced2 = require('./_forceReduced');

var _forceReduced3 = _interopRequireDefault(_forceReduced2);

var _isArrayLike2 = require('./_isArrayLike');

var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

var _reduce2 = require('./_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preservingReduced = function (xf) {
  return {
    '@@transducer/init': _xfBase3.default.init,
    '@@transducer/result': function (result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? (0, _forceReduced3.default)(ret) : ret;
    }
  };
};

var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase3.default.init,
    '@@transducer/result': function (result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      return !(0, _isArrayLike3.default)(input) ? (0, _reduce3.default)(rxf, result, [input]) : (0, _reduce3.default)(rxf, result, input);
    }
  };
};

exports.default = _flatCat;
},{"./_forceReduced":591,"./_isArrayLike":584,"./_reduce":527,"./_xfBase":585}],536:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _flatCat2 = require('./_flatCat');

var _flatCat3 = _interopRequireDefault(_flatCat2);

var _map = require('../map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _xchain = /*#__PURE__*/(0, _curry3.default)(function _xchain(f, xf) {
  return (0, _map2.default)(f, (0, _flatCat3.default)(xf));
});
exports.default = _xchain;
},{"./_curry2":520,"./_flatCat":589,"../map":252}],74:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _makeFlat2 = require('./internal/_makeFlat');

var _makeFlat3 = _interopRequireDefault(_makeFlat2);

var _xchain2 = require('./internal/_xchain');

var _xchain3 = _interopRequireDefault(_xchain2);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      var duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */
var chain = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['fantasy-land/chain', 'chain'], _xchain3.default, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }
  return (0, _makeFlat3.default)(false)((0, _map2.default)(fn, monad));
}));
exports.default = chain;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_makeFlat":535,"./internal/_xchain":536,"./map":252}],76:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */
var clamp = /*#__PURE__*/(0, _curry2.default)(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }
  return value < min ? min : value > max ? max : value;
});
exports.default = clamp;
},{"./internal/_curry3":524}],576:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
                                  value: true
});
exports.default = _cloneRegExp;
function _cloneRegExp(pattern) {
                                  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
}
},{}],464:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */
var type = /*#__PURE__*/(0, _curry2.default)(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});
exports.default = type;
},{"./internal/_curry1":525}],537:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _clone;

var _cloneRegExp2 = require('./_cloneRegExp');

var _cloneRegExp3 = _interopRequireDefault(_cloneRegExp2);

var _type = require('../type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */
function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    for (var key in value) {
      copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
    }
    return copiedValue;
  };
  switch ((0, _type2.default)(value)) {
    case 'Object':
      return copy({});
    case 'Array':
      return copy([]);
    case 'Date':
      return new Date(value.valueOf());
    case 'RegExp':
      return (0, _cloneRegExp3.default)(value);
    default:
      return value;
  }
}
},{"./_cloneRegExp":576,"../type":464}],78:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clone2 = require('./internal/_clone');

var _clone3 = _interopRequireDefault(_clone2);

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      var objects = [{}, {}, {}];
 *      var objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */
var clone = /*#__PURE__*/(0, _curry2.default)(function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : (0, _clone3.default)(value, [], [], true);
});
exports.default = clone;
},{"./internal/_clone":537,"./internal/_curry1":525}],80:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b) -> Boolean) -> ((a, b) -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      var byAge = R.comparator((a, b) => a.age < b.age);
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByIncreasingAge = R.sort(byAge, people);
 */
var comparator = /*#__PURE__*/(0, _curry2.default)(function comparator(pred) {
  return function (a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});
exports.default = comparator;
},{"./internal/_curry1":525}],306:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */
var not = /*#__PURE__*/(0, _curry2.default)(function not(a) {
  return !a;
});
exports.default = not;
},{"./internal/_curry1":525}],82:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lift = require('./lift');

var _lift2 = _interopRequireDefault(_lift);

var _not = require('./not');

var _not2 = _interopRequireDefault(_not);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      var isNotNil = R.complement(R.isNil);
 *      isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      isNil(7); //=> false
 *      isNotNil(7); //=> true
 */
var complement = /*#__PURE__*/(0, _lift2.default)(_not2.default);
exports.default = complement;
},{"./lift":244,"./not":306}],570:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _pipe;
function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}
},{}],558:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _checkForMethod;

var _isArray2 = require('./_isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return (0, _isArray3.default)(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}
},{"./_isArray":531}],402:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkForMethod2 = require('./internal/_checkForMethod');

var _checkForMethod3 = _interopRequireDefault(_checkForMethod2);

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
var slice = /*#__PURE__*/(0, _curry2.default)( /*#__PURE__*/(0, _checkForMethod3.default)('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));
exports.default = slice;
},{"./internal/_checkForMethod":558,"./internal/_curry3":524}],428:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkForMethod2 = require('./internal/_checkForMethod');

var _checkForMethod3 = _interopRequireDefault(_checkForMethod2);

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _slice = require('./slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */
var tail = /*#__PURE__*/(0, _curry2.default)( /*#__PURE__*/(0, _checkForMethod3.default)('tail', /*#__PURE__*/(0, _slice2.default)(1, Infinity)));
exports.default = tail;
},{"./internal/_checkForMethod":558,"./internal/_curry1":525,"./slice":402}],348:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipe;

var _arity2 = require('./internal/_arity');

var _arity3 = _interopRequireDefault(_arity2);

var _pipe2 = require('./internal/_pipe');

var _pipe3 = _interopRequireDefault(_pipe2);

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _tail = require('./tail');

var _tail2 = _interopRequireDefault(_tail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */
function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return (0, _arity3.default)(arguments[0].length, (0, _reduce2.default)(_pipe3.default, arguments[0], (0, _tail2.default)(arguments)));
}
},{"./internal/_arity":533,"./internal/_pipe":570,"./reduce":376,"./tail":428}],394:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _isString2 = require('./internal/_isString');

var _isString3 = _interopRequireDefault(_isString2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */
var reverse = /*#__PURE__*/(0, _curry2.default)(function reverse(list) {
  return (0, _isString3.default)(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});
exports.default = reverse;
},{"./internal/_curry1":525,"./internal/_isString":538}],84:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;

var _pipe = require('./pipe');

var _pipe2 = _interopRequireDefault(_pipe);

var _reverse = require('./reverse');

var _reverse2 = _interopRequireDefault(_reverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */
function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return _pipe2.default.apply(this, (0, _reverse2.default)(arguments));
}
},{"./pipe":348,"./reverse":394}],86:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composeK;

var _chain = require('./chain');

var _chain2 = _interopRequireDefault(_chain);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the right-to-left Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (a -> m z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipeK
 * @example
 *
 *       //  get :: String -> Object -> Maybe *
 *       var get = R.curry((propName, obj) => Maybe(obj[propName]))
 *
 *       //  getStateCode :: Maybe String -> Maybe String
 *       var getStateCode = R.composeK(
 *         R.compose(Maybe.of, R.toUpper),
 *         get('state'),
 *         get('address'),
 *         get('user'),
 *       );
 *       getStateCode({"user":{"address":{"state":"ny"}}}); //=> Maybe.Just("NY")
 *       getStateCode({}); //=> Maybe.Nothing()
 * @symb R.composeK(f, g, h)(a) = R.chain(f, R.chain(g, h(a)))
 */
function composeK() {
  if (arguments.length === 0) {
    throw new Error('composeK requires at least one argument');
  }
  var init = Array.prototype.slice.call(arguments);
  var last = init.pop();
  return (0, _compose2.default)(_compose2.default.apply(this, (0, _map2.default)(_chain2.default, init)), last);
}
},{"./chain":74,"./compose":84,"./map":252}],571:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _pipeP;
function _pipeP(f, g) {
  return function () {
    var ctx = this;
    return f.apply(ctx, arguments).then(function (x) {
      return g.call(ctx, x);
    });
  };
}
},{}],352:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipeP;

var _arity2 = require('./internal/_arity');

var _arity3 = _interopRequireDefault(_arity2);

var _pipeP2 = require('./internal/_pipeP');

var _pipeP3 = _interopRequireDefault(_pipeP2);

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _tail = require('./tail');

var _tail2 = _interopRequireDefault(_tail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Performs left-to-right composition of one or more Promise-returning
 * functions. The leftmost function may have any arity; the remaining functions
 * must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeP
 * @example
 *
 *      //  followersForUser :: String -> Promise [User]
 *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
 */
function pipeP() {
  if (arguments.length === 0) {
    throw new Error('pipeP requires at least one argument');
  }
  return (0, _arity3.default)(arguments[0].length, (0, _reduce2.default)(_pipeP3.default, arguments[0], (0, _tail2.default)(arguments)));
}
},{"./internal/_arity":533,"./internal/_pipeP":571,"./reduce":376,"./tail":428}],88:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composeP;

var _pipeP = require('./pipeP');

var _pipeP2 = _interopRequireDefault(_pipeP);

var _reverse = require('./reverse');

var _reverse2 = _interopRequireDefault(_reverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Performs right-to-left composition of one or more Promise-returning
 * functions. The rightmost function may have any arity; the remaining
 * functions must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
 * @param {...Function} functions The functions to compose
 * @return {Function}
 * @see R.pipeP
 * @example
 *
 *      var db = {
 *        users: {
 *          JOE: {
 *            name: 'Joe',
 *            followers: ['STEVE', 'SUZY']
 *          }
 *        }
 *      }
 *
 *      // We'll pretend to do a db lookup which returns a promise
 *      var lookupUser = (userId) => Promise.resolve(db.users[userId])
 *      var lookupFollowers = (user) => Promise.resolve(user.followers)
 *      lookupUser('JOE').then(lookupFollowers)
 *
 *      //  followersForUser :: String -> Promise [UserId]
 *      var followersForUser = R.composeP(lookupFollowers, lookupUser);
 *      followersForUser('JOE').then(followers => console.log('Followers:', followers))
 *      // Followers: ["STEVE","SUZY"]
 */
function composeP() {
  if (arguments.length === 0) {
    throw new Error('composeP requires at least one argument');
  }
  return _pipeP2.default.apply(this, (0, _reverse2.default)(arguments));
}
},{"./pipeP":352,"./reverse":394}],592:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _arrayFromIterator;
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}
},{}],542:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _containsWith;
function _containsWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}
},{}],593:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _functionName;
function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}
},{}],184:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */
var identical = /*#__PURE__*/(0, _curry3.default)(function identical(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
});
exports.default = identical;
},{"./internal/_curry2":520}],559:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _equals;

var _arrayFromIterator2 = require('./_arrayFromIterator');

var _arrayFromIterator3 = _interopRequireDefault(_arrayFromIterator2);

var _containsWith2 = require('./_containsWith');

var _containsWith3 = _interopRequireDefault(_containsWith2);

var _functionName2 = require('./_functionName');

var _functionName3 = _interopRequireDefault(_functionName2);

var _has2 = require('./_has');

var _has3 = _interopRequireDefault(_has2);

var _identical = require('../identical');

var _identical2 = _interopRequireDefault(_identical);

var _keys = require('../keys');

var _keys2 = _interopRequireDefault(_keys);

var _type = require('../type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = (0, _arrayFromIterator3.default)(aIterator);
  var b = (0, _arrayFromIterator3.default)(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }

  // if *a* array contains any element that is not included in *b*
  return !(0, _containsWith3.default)(function (b, aItem) {
    return !(0, _containsWith3.default)(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if ((0, _identical2.default)(a, b)) {
    return true;
  }

  var typeA = (0, _type2.default)(a);

  if (typeA !== (0, _type2.default)(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && (0, _functionName3.default)(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && (0, _identical2.default)(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!(0, _identical2.default)(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = (0, _keys2.default)(a);
  if (keysA.length !== (0, _keys2.default)(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);

  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!((0, _has3.default)(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}
},{"./_arrayFromIterator":592,"./_containsWith":542,"./_functionName":593,"./_has":530,"../identical":184,"../keys":226,"../type":464}],146:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _equals2 = require('./internal/_equals');

var _equals3 = _interopRequireDefault(_equals2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */
var equals = /*#__PURE__*/(0, _curry3.default)(function equals(a, b) {
  return (0, _equals3.default)(a, b, [], []);
});
exports.default = equals;
},{"./internal/_curry2":520,"./internal/_equals":559}],561:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _indexOf;

var _equals = require('../equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _indexOf(list, a, idx) {
  var inf, item;
  // Array.prototype.indexOf doesn't exist below IE9
  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === 'number' && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        // non-zero numbers can utilise Set
        return list.indexOf(a, idx);

      // all these types can utilise Set
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }
    }
  }
  // anything else not covered above, defer to R.equals
  while (idx < list.length) {
    if ((0, _equals2.default)(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}
},{"../equals":146}],539:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _contains;

var _indexOf2 = require('./_indexOf');

var _indexOf3 = _interopRequireDefault(_indexOf2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _contains(a, list) {
  return (0, _indexOf3.default)(list, a, 0) >= 0;
}
},{"./_indexOf":561}],594:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _quote;
function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');

  return '"' + escaped.replace(/"/g, '\\"') + '"';
}
},{}],595:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

exports.default = _toISOString;
},{}],567:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _complement;
function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}
},{}],552:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _filter;
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}
},{}],551:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _isObject;
function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}
},{}],553:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XFilter = /*#__PURE__*/function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase3.default.init;
  XFilter.prototype['@@transducer/result'] = _xfBase3.default.result;
  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter = /*#__PURE__*/(0, _curry3.default)(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});
exports.default = _xfilter;
},{"./_curry2":520,"./_xfBase":585}],150:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _filter2 = require('./internal/_filter');

var _filter3 = _interopRequireDefault(_filter2);

var _isObject2 = require('./internal/_isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _reduce2 = require('./internal/_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _xfilter2 = require('./internal/_xfilter');

var _xfilter3 = _interopRequireDefault(_xfilter2);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var filter = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['filter'], _xfilter3.default, function (pred, filterable) {
  return (0, _isObject3.default)(filterable) ? (0, _reduce3.default)(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }
    return acc;
  }, {}, (0, _keys2.default)(filterable)) :
  // else
  (0, _filter3.default)(pred, filterable);
}));
exports.default = filter;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_filter":552,"./internal/_isObject":551,"./internal/_reduce":527,"./internal/_xfilter":553,"./keys":226}],386:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _complement2 = require('./internal/_complement');

var _complement3 = _interopRequireDefault(_complement2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var reject = /*#__PURE__*/(0, _curry3.default)(function reject(pred, filterable) {
  return (0, _filter2.default)((0, _complement3.default)(pred), filterable);
});
exports.default = reject;
},{"./internal/_complement":567,"./internal/_curry2":520,"./filter":150}],579:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _toString;

var _contains2 = require('./_contains');

var _contains3 = _interopRequireDefault(_contains2);

var _map2 = require('./_map');

var _map3 = _interopRequireDefault(_map2);

var _quote2 = require('./_quote');

var _quote3 = _interopRequireDefault(_quote2);

var _toISOString2 = require('./_toISOString');

var _toISOString3 = _interopRequireDefault(_toISOString2);

var _keys = require('../keys');

var _keys2 = _interopRequireDefault(_keys);

var _reject = require('../reject');

var _reject2 = _interopRequireDefault(_reject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return (0, _contains3.default)(y, xs) ? '<Circular>' : _toString(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function (obj, keys) {
    return (0, _map3.default)(function (k) {
      return (0, _quote3.default)(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + (0, _map3.default)(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + (0, _map3.default)(recur, x).concat(mapPairs(x, (0, _reject2.default)(function (k) {
        return (/^\d+$/.test(k)
        );
      }, (0, _keys2.default)(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : (0, _quote3.default)((0, _toISOString3.default)(x))) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : (0, _quote3.default)(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, (0, _keys2.default)(x)).join(', ') + '}';
  }
}
},{"./_contains":539,"./_map":540,"./_quote":594,"./_toISOString":595,"../keys":226,"../reject":386}],450:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _toString2 = require('./internal/_toString');

var _toString3 = _interopRequireDefault(_toString2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */
var toString = /*#__PURE__*/(0, _curry2.default)(function toString(val) {
  return (0, _toString3.default)(val, []);
});
exports.default = toString;
},{"./internal/_curry1":525,"./internal/_toString":579}],90:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _isArray2 = require('./internal/_isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isFunction2 = require('./internal/_isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isString2 = require('./internal/_isString');

var _isString3 = _interopRequireDefault(_isString2);

var _toString = require('./toString');

var _toString2 = _interopRequireDefault(_toString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */
var concat = /*#__PURE__*/(0, _curry3.default)(function concat(a, b) {
  if ((0, _isArray3.default)(a)) {
    if ((0, _isArray3.default)(b)) {
      return a.concat(b);
    }
    throw new TypeError((0, _toString2.default)(b) + ' is not an array');
  }
  if ((0, _isString3.default)(a)) {
    if ((0, _isString3.default)(b)) {
      return a + b;
    }
    throw new TypeError((0, _toString2.default)(b) + ' is not a string');
  }
  if (a != null && (0, _isFunction3.default)(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }
  if (a != null && (0, _isFunction3.default)(a.concat)) {
    return a.concat(b);
  }
  throw new TypeError((0, _toString2.default)(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});
exports.default = concat;
},{"./internal/_curry2":520,"./internal/_isArray":531,"./internal/_isFunction":534,"./internal/_isString":538,"./toString":450}],92:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arity2 = require('./internal/_arity');

var _arity3 = _interopRequireDefault(_arity2);

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _max = require('./max');

var _max2 = _interopRequireDefault(_max);

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @example
 *
 *      var fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */
var cond = /*#__PURE__*/(0, _curry2.default)(function cond(pairs) {
  var arity = (0, _reduce2.default)(_max2.default, 0, (0, _map2.default)(function (pair) {
    return pair[0].length;
  }, pairs));
  return (0, _arity3.default)(arity, function () {
    var idx = 0;
    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }
      idx += 1;
    }
  });
});
exports.default = cond;
},{"./internal/_arity":533,"./internal/_curry1":525,"./map":252,"./max":264,"./reduce":376}],96:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _curry4 = require('./curry');

var _curry5 = _interopRequireDefault(_curry4);

var _nAry = require('./nAry');

var _nAry2 = _interopRequireDefault(_nAry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      }
 *
 *      Salad.prototype.recipe = function() {
 *        var instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *        return R.join('\n', instructions);
 *      };
 *
 *      var ThreeLayerSalad = R.constructN(3, Salad);
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      var salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 *      console.log(salad.recipe());
 *      // Add a dollop of Mayonnaise
 *      // Add a dollop of Potato Chips
 *      // Add a dollop of Ketchup
 */
var constructN = /*#__PURE__*/(0, _curry3.default)(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }
  if (n === 0) {
    return function () {
      return new Fn();
    };
  }
  return (0, _curry5.default)((0, _nAry2.default)(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case 1:
        return new Fn($0);
      case 2:
        return new Fn($0, $1);
      case 3:
        return new Fn($0, $1, $2);
      case 4:
        return new Fn($0, $1, $2, $3);
      case 5:
        return new Fn($0, $1, $2, $3, $4);
      case 6:
        return new Fn($0, $1, $2, $3, $4, $5);
      case 7:
        return new Fn($0, $1, $2, $3, $4, $5, $6);
      case 8:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
      case 9:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
      case 10:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});
exports.default = constructN;
},{"./internal/_curry2":520,"./curry":104,"./nAry":300}],94:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _constructN = require('./constructN');

var _constructN2 = _interopRequireDefault(_constructN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @see R.invoker
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      var AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      var animalTypes = ["Lion", "Tiger", "Bear"];
 *      var animalSighting = R.invoker(0, 'sighting');
 *      var sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */
var construct = /*#__PURE__*/(0, _curry2.default)(function construct(Fn) {
  return (0, _constructN2.default)(Fn.length, Fn);
});
exports.default = construct;
},{"./internal/_curry1":525,"./constructN":96}],98:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contains2 = require('./internal/_contains');

var _contains3 = _interopRequireDefault(_contains2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 */
var contains = /*#__PURE__*/(0, _curry3.default)(_contains3.default);
exports.default = contains;
},{"./internal/_contains":539,"./internal/_curry2":520}],100:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _map2 = require('./internal/_map');

var _map3 = _interopRequireDefault(_map2);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

var _max = require('./max');

var _max2 = _interopRequireDefault(_max);

var _pluck = require('./pluck');

var _pluck2 = _interopRequireDefault(_pluck);

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. When invoked, this new function is applied to some
 * arguments, each branching function is applied to those same arguments. The
 * results of each branching function are passed as arguments to the converging
 * function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      var average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */
var converge = /*#__PURE__*/(0, _curry3.default)(function converge(after, fns) {
  return (0, _curryN2.default)((0, _reduce2.default)(_max2.default, 0, (0, _pluck2.default)('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, (0, _map3.default)(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});
exports.default = converge;
},{"./internal/_curry2":520,"./internal/_map":540,"./curryN":106,"./max":264,"./pluck":354,"./reduce":376}],572:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curryN2 = require('./_curryN');

var _curryN3 = _interopRequireDefault(_curryN2);

var _has2 = require('./_has');

var _has3 = _interopRequireDefault(_has2);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XReduceBy = /*#__PURE__*/function () {
  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }
  XReduceBy.prototype['@@transducer/init'] = _xfBase3.default.init;
  XReduceBy.prototype['@@transducer/result'] = function (result) {
    var key;
    for (key in this.inputs) {
      if ((0, _has3.default)(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);
        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }
    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };
  XReduceBy.prototype['@@transducer/step'] = function (result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return XReduceBy;
}();

var _xreduceBy = /*#__PURE__*/(0, _curryN3.default)(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
  return new XReduceBy(valueFn, valueAcc, keyFn, xf);
});
exports.default = _xreduceBy;
},{"./_curryN":541,"./_has":530,"./_xfBase":585}],378:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curryN2 = require('./internal/_curryN');

var _curryN3 = _interopRequireDefault(_curryN2);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _has2 = require('./internal/_has');

var _has3 = _interopRequireDefault(_has2);

var _reduce2 = require('./internal/_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _xreduceBy2 = require('./internal/_xreduceBy');

var _xreduceBy3 = _interopRequireDefault(_xreduceBy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce
 * @example
 *
 *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
 *      var namesByGrade = reduceToNamesBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Lucy', score: 92},
 *                      {name: 'Drew', score: 85},
 *                      // ...
 *                      {name: 'Bart', score: 62}];
 *      namesByGrade(students);
 *      // {
 *      //   'A': ['Lucy'],
 *      //   'B': ['Drew']
 *      //   // ...,
 *      //   'F': ['Bart']
 *      // }
 */
var reduceBy = /*#__PURE__*/(0, _curryN3.default)(4, [], /*#__PURE__*/(0, _dispatchable3.default)([], _xreduceBy3.default, function reduceBy(valueFn, valueAcc, keyFn, list) {
  return (0, _reduce3.default)(function (acc, elt) {
    var key = keyFn(elt);
    acc[key] = valueFn((0, _has3.default)(key, acc) ? acc[key] : valueAcc, elt);
    return acc;
  }, {}, list);
}));
exports.default = reduceBy;
},{"./internal/_curryN":541,"./internal/_dispatchable":521,"./internal/_has":530,"./internal/_reduce":527,"./internal/_xreduceBy":572}],102:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduceBy = require('./reduceBy');

var _reduceBy2 = _interopRequireDefault(_reduceBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */
var countBy = /*#__PURE__*/(0, _reduceBy2.default)(function (acc, elem) {
  return acc + 1;
}, 0);
exports.default = countBy;
},{"./reduceBy":378}],108:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */
var dec = /*#__PURE__*/(0, _add2.default)(-1);
exports.default = dec;
},{"./add":30}],110:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      var defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */
var defaultTo = /*#__PURE__*/(0, _curry3.default)(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});
exports.default = defaultTo;
},{"./internal/_curry2":520}],112:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @see R.ascend
 * @example
 *
 *      var byAge = R.descend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByOldestFirst = R.sort(byAge, people);
 */
var descend = /*#__PURE__*/(0, _curry2.default)(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});
exports.default = descend;
},{"./internal/_curry3":524}],114:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contains2 = require('./internal/_contains');

var _contains3 = _interopRequireDefault(_contains2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */
var difference = /*#__PURE__*/(0, _curry3.default)(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!(0, _contains3.default)(first[idx], second) && !(0, _contains3.default)(first[idx], out)) {
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
});
exports.default = difference;
},{"./internal/_contains":539,"./internal/_curry2":520}],116:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _containsWith2 = require('./internal/_containsWith');

var _containsWith3 = _interopRequireDefault(_containsWith2);

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      var cmp = (x, y) => x.a === y.a;
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      var l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */
var differenceWith = /*#__PURE__*/(0, _curry2.default)(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!(0, _containsWith3.default)(pred, first[idx], second) && !(0, _containsWith3.default)(pred, first[idx], out)) {
      out.push(first[idx]);
    }
    idx += 1;
  }
  return out;
});
exports.default = differenceWith;
},{"./internal/_containsWith":542,"./internal/_curry3":524}],118:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */
var dissoc = /*#__PURE__*/(0, _curry3.default)(function dissoc(prop, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  delete result[prop];
  return result;
});
exports.default = dissoc;
},{"./internal/_curry2":520}],388:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */
var remove = /*#__PURE__*/(0, _curry2.default)(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});
exports.default = remove;
},{"./internal/_curry3":524}],490:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _adjust = require('./adjust');

var _adjust2 = _interopRequireDefault(_adjust);

var _always = require('./always');

var _always2 = _interopRequireDefault(_always);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
 *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */
var update = /*#__PURE__*/(0, _curry2.default)(function update(idx, x, list) {
  return (0, _adjust2.default)((0, _always2.default)(x), idx, list);
});
exports.default = update;
},{"./internal/_curry3":524,"./adjust":34,"./always":40}],120:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _isInteger2 = require('./internal/_isInteger');

var _isInteger3 = _interopRequireDefault(_isInteger2);

var _assoc = require('./assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _dissoc = require('./dissoc');

var _dissoc2 = _interopRequireDefault(_dissoc);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */
var dissocPath = /*#__PURE__*/(0, _curry3.default)(function dissocPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return (0, _isInteger3.default)(path[0]) ? (0, _remove2.default)(path[0], 1, obj) : (0, _dissoc2.default)(path[0], obj);
    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);
      if (obj[head] == null) {
        return obj;
      } else if ((0, _isInteger3.default)(path[0])) {
        return (0, _update2.default)(head, dissocPath(tail, obj[head]), obj);
      } else {
        return (0, _assoc2.default)(head, dissocPath(tail, obj[head]), obj);
      }
  }
});
exports.default = dissocPath;
},{"./internal/_curry2":520,"./internal/_isInteger":532,"./assoc":62,"./dissoc":118,"./remove":388,"./update":490}],122:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      var half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      var reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */
var divide = /*#__PURE__*/(0, _curry3.default)(function divide(a, b) {
  return a / b;
});
exports.default = divide;
},{"./internal/_curry2":520}],543:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XDrop = /*#__PURE__*/function () {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }
  XDrop.prototype['@@transducer/init'] = _xfBase3.default.init;
  XDrop.prototype['@@transducer/result'] = _xfBase3.default.result;
  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

var _xdrop = /*#__PURE__*/(0, _curry3.default)(function _xdrop(n, xf) {
  return new XDrop(n, xf);
});
exports.default = _xdrop;
},{"./_curry2":520,"./_xfBase":585}],124:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xdrop2 = require('./internal/_xdrop');

var _xdrop3 = _interopRequireDefault(_xdrop2);

var _slice = require('./slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */
var drop = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['drop'], _xdrop3.default, function drop(n, xs) {
  return (0, _slice2.default)(Math.max(0, n), Infinity, xs);
}));
exports.default = drop;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xdrop":543,"./slice":402}],574:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduced2 = require('./_reduced');

var _reduced3 = _interopRequireDefault(_reduced2);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XTake = /*#__PURE__*/function () {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }
  XTake.prototype['@@transducer/init'] = _xfBase3.default.init;
  XTake.prototype['@@transducer/result'] = _xfBase3.default.result;
  XTake.prototype['@@transducer/step'] = function (result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.n >= 0 && this.i >= this.n ? (0, _reduced3.default)(ret) : ret;
  };

  return XTake;
}();

var _xtake = /*#__PURE__*/(0, _curry3.default)(function _xtake(n, xf) {
  return new XTake(n, xf);
});
exports.default = _xtake;
},{"./_curry2":520,"./_reduced":573,"./_xfBase":585}],430:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xtake2 = require('./internal/_xtake');

var _xtake3 = _interopRequireDefault(_xtake2);

var _slice = require('./slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      var personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      var takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */
var take = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['take'], _xtake3.default, function take(n, xs) {
  return (0, _slice2.default)(0, n < 0 ? Infinity : n, xs);
}));
exports.default = take;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xtake":574,"./slice":402}],544:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dropLast;

var _take = require('../take');

var _take2 = _interopRequireDefault(_take);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dropLast(n, xs) {
  return (0, _take2.default)(n < xs.length ? xs.length - n : 0, xs);
}
},{"../take":430}],545:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XDropLast = /*#__PURE__*/function () {
  function XDropLast(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XDropLast.prototype['@@transducer/init'] = _xfBase3.default.init;
  XDropLast.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }
    this.store(input);
    return result;
  };
  XDropLast.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return XDropLast;
}();

var _xdropLast = /*#__PURE__*/(0, _curry3.default)(function _xdropLast(n, xf) {
  return new XDropLast(n, xf);
});
exports.default = _xdropLast;
},{"./_curry2":520,"./_xfBase":585}],126:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _dropLast2 = require('./internal/_dropLast');

var _dropLast3 = _interopRequireDefault(_dropLast2);

var _xdropLast2 = require('./internal/_xdropLast');

var _xdropLast3 = _interopRequireDefault(_xdropLast2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */
var dropLast = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)([], _xdropLast3.default, _dropLast3.default));
exports.default = dropLast;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_dropLast":544,"./internal/_xdropLast":545}],548:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dropLastWhile;

var _slice = require('../slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }
  return (0, _slice2.default)(0, idx + 1, xs);
}
},{"../slice":402}],549:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduce2 = require('./_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XDropLastWhile = /*#__PURE__*/function () {
  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }
  XDropLastWhile.prototype['@@transducer/init'] = _xfBase3.default.init;
  XDropLastWhile.prototype['@@transducer/result'] = function (result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };
  XDropLastWhile.prototype.flush = function (result, input) {
    result = (0, _reduce3.default)(this.xf['@@transducer/step'], result, this.retained);
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };
  XDropLastWhile.prototype.retain = function (result, input) {
    this.retained.push(input);
    return result;
  };

  return XDropLastWhile;
}();

var _xdropLastWhile = /*#__PURE__*/(0, _curry3.default)(function _xdropLastWhile(fn, xf) {
  return new XDropLastWhile(fn, xf);
});
exports.default = _xdropLastWhile;
},{"./_curry2":520,"./_reduce":527,"./_xfBase":585}],130:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _dropLastWhile2 = require('./internal/_dropLastWhile');

var _dropLastWhile3 = _interopRequireDefault(_dropLastWhile2);

var _xdropLastWhile2 = require('./internal/_xdropLastWhile');

var _xdropLastWhile3 = _interopRequireDefault(_xdropLastWhile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} predicate The function to be called on each element
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      var lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *
 *      R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 */
var dropLastWhile = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)([], _xdropLastWhile3.default, _dropLastWhile3.default));
exports.default = dropLastWhile;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_dropLastWhile":548,"./internal/_xdropLastWhile":549}],546:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XDropRepeatsWith = /*#__PURE__*/function () {
  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase3.default.init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase3.default.result;
  XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
    var sameAsLast = false;
    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }
    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return XDropRepeatsWith;
}();

var _xdropRepeatsWith = /*#__PURE__*/(0, _curry3.default)(function _xdropRepeatsWith(pred, xf) {
  return new XDropRepeatsWith(pred, xf);
});
exports.default = _xdropRepeatsWith;
},{"./_curry2":520,"./_xfBase":585}],308:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _isString2 = require('./internal/_isString');

var _isString3 = _interopRequireDefault(_isString2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */
var nth = /*#__PURE__*/(0, _curry3.default)(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return (0, _isString3.default)(list) ? list.charAt(idx) : list[idx];
});
exports.default = nth;
},{"./internal/_curry2":520,"./internal/_isString":538}],230:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nth = require('./nth');

var _nth2 = _interopRequireDefault(_nth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */
var last = /*#__PURE__*/(0, _nth2.default)(-1);
exports.default = last;
},{"./nth":308}],132:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xdropRepeatsWith2 = require('./internal/_xdropRepeatsWith');

var _xdropRepeatsWith3 = _interopRequireDefault(_xdropRepeatsWith2);

var _last = require('./last');

var _last2 = _interopRequireDefault(_last);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */
var dropRepeatsWith = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)([], _xdropRepeatsWith3.default, function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;
  if (len !== 0) {
    result[0] = list[0];
    while (idx < len) {
      if (!pred((0, _last2.default)(result), list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
  }
  return result;
}));
exports.default = dropRepeatsWith;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xdropRepeatsWith":546,"./last":230}],128:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xdropRepeatsWith2 = require('./internal/_xdropRepeatsWith');

var _xdropRepeatsWith3 = _interopRequireDefault(_xdropRepeatsWith2);

var _dropRepeatsWith = require('./dropRepeatsWith');

var _dropRepeatsWith2 = _interopRequireDefault(_dropRepeatsWith);

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */
var dropRepeats = /*#__PURE__*/(0, _curry2.default)( /*#__PURE__*/(0, _dispatchable3.default)([], /*#__PURE__*/(0, _xdropRepeatsWith3.default)(_equals2.default), /*#__PURE__*/(0, _dropRepeatsWith2.default)(_equals2.default)));
exports.default = dropRepeats;
},{"./internal/_curry1":525,"./internal/_dispatchable":521,"./internal/_xdropRepeatsWith":546,"./dropRepeatsWith":132,"./equals":146}],547:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XDropWhile = /*#__PURE__*/function () {
  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XDropWhile.prototype['@@transducer/init'] = _xfBase3.default.init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase3.default.result;
  XDropWhile.prototype['@@transducer/step'] = function (result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }
      this.f = null;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return XDropWhile;
}();

var _xdropWhile = /*#__PURE__*/(0, _curry3.default)(function _xdropWhile(f, xf) {
  return new XDropWhile(f, xf);
});
exports.default = _xdropWhile;
},{"./_curry2":520,"./_xfBase":585}],134:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xdropWhile2 = require('./internal/_xdropWhile');

var _xdropWhile3 = _interopRequireDefault(_xdropWhile2);

var _slice = require('./slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      var lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *
 *      R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 */
var dropWhile = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['dropWhile'], _xdropWhile3.default, function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }
  return (0, _slice2.default)(idx, Infinity, xs);
}));
exports.default = dropWhile;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xdropWhile":547,"./slice":402}],322:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */
var or = /*#__PURE__*/(0, _curry3.default)(function or(a, b) {
  return a || b;
});
exports.default = or;
},{"./internal/_curry2":520}],136:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _isFunction2 = require('./internal/_isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _lift = require('./lift');

var _lift2 = _interopRequireDefault(_lift);

var _or = require('./or');

var _or2 = _interopRequireDefault(_or);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      var gt10 = x => x > 10;
 *      var even = x => x % 2 === 0;
 *      var f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 */
var either = /*#__PURE__*/(0, _curry3.default)(function either(f, g) {
  return (0, _isFunction3.default)(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : (0, _lift2.default)(_or2.default)(f, g);
});
exports.default = either;
},{"./internal/_curry2":520,"./internal/_isFunction":534,"./lift":244,"./or":322}],138:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _isArguments2 = require('./internal/_isArguments');

var _isArguments3 = _interopRequireDefault(_isArguments2);

var _isArray2 = require('./internal/_isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isObject2 = require('./internal/_isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isString2 = require('./internal/_isString');

var _isString3 = _interopRequireDefault(_isString2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */
var empty = /*#__PURE__*/(0, _curry2.default)(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : (0, _isArray3.default)(x) ? [] : (0, _isString3.default)(x) ? '' : (0, _isObject3.default)(x) ? {} : (0, _isArguments3.default)(x) ? function () {
    return arguments;
  }() :
  // else
  void 0;
});
exports.default = empty;
},{"./internal/_curry1":525,"./internal/_isArguments":550,"./internal/_isArray":531,"./internal/_isObject":551,"./internal/_isString":538}],432:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _drop = require('./drop');

var _drop2 = _interopRequireDefault(_drop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */
var takeLast = /*#__PURE__*/(0, _curry3.default)(function takeLast(n, xs) {
  return (0, _drop2.default)(n >= 0 ? xs.length - n : 0, xs);
});
exports.default = takeLast;
},{"./internal/_curry2":520,"./drop":124}],140:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

var _takeLast = require('./takeLast');

var _takeLast2 = _interopRequireDefault(_takeLast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if a list ends with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */
var endsWith = /*#__PURE__*/(0, _curry3.default)(function (suffix, list) {
  return (0, _equals2.default)((0, _takeLast2.default)(suffix.length, list), suffix);
});
exports.default = endsWith;
},{"./internal/_curry2":520,"./equals":146,"./takeLast":432}],142:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */
var eqBy = /*#__PURE__*/(0, _curry2.default)(function eqBy(f, x, y) {
  return (0, _equals2.default)(f(x), f(y));
});
exports.default = eqBy;
},{"./internal/_curry3":524,"./equals":146}],144:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */
var eqProps = /*#__PURE__*/(0, _curry2.default)(function eqProps(prop, obj1, obj2) {
  return (0, _equals2.default)(obj1[prop], obj2[prop]);
});
exports.default = eqProps;
},{"./internal/_curry3":524,"./equals":146}],148:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      var transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */
var evolve = /*#__PURE__*/(0, _curry3.default)(function evolve(transformations, object) {
  var result = {};
  var transformation, key, type;
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key]) : transformation && type === 'object' ? evolve(transformation, object[key]) : object[key];
  }
  return result;
});
exports.default = evolve;
},{"./internal/_curry2":520}],554:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduced2 = require('./_reduced');

var _reduced3 = _interopRequireDefault(_reduced2);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XFind = /*#__PURE__*/function () {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind.prototype['@@transducer/init'] = _xfBase3.default.init;
  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = (0, _reduced3.default)(this.xf['@@transducer/step'](result, input));
    }
    return result;
  };

  return XFind;
}();

var _xfind = /*#__PURE__*/(0, _curry3.default)(function _xfind(f, xf) {
  return new XFind(f, xf);
});
exports.default = _xfind;
},{"./_curry2":520,"./_reduced":573,"./_xfBase":585}],152:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xfind2 = require('./internal/_xfind');

var _xfind3 = _interopRequireDefault(_xfind2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */
var find = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['find'], _xfind3.default, function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));
exports.default = find;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xfind":554}],556:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduced2 = require('./_reduced');

var _reduced3 = _interopRequireDefault(_reduced2);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XFindIndex = /*#__PURE__*/function () {
  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }
  XFindIndex.prototype['@@transducer/init'] = _xfBase3.default.init;
  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.found = true;
      result = (0, _reduced3.default)(this.xf['@@transducer/step'](result, this.idx));
    }
    return result;
  };

  return XFindIndex;
}();

var _xfindIndex = /*#__PURE__*/(0, _curry3.default)(function _xfindIndex(f, xf) {
  return new XFindIndex(f, xf);
});
exports.default = _xfindIndex;
},{"./_curry2":520,"./_reduced":573,"./_xfBase":585}],154:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xfindIndex2 = require('./internal/_xfindIndex');

var _xfindIndex3 = _interopRequireDefault(_xfindIndex2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */
var findIndex = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)([], _xfindIndex3.default, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}));
exports.default = findIndex;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xfindIndex":556}],555:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XFindLast = /*#__PURE__*/function () {
  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFindLast.prototype['@@transducer/init'] = _xfBase3.default.init;
  XFindLast.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };
  XFindLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.last = input;
    }
    return result;
  };

  return XFindLast;
}();

var _xfindLast = /*#__PURE__*/(0, _curry3.default)(function _xfindLast(f, xf) {
  return new XFindLast(f, xf);
});
exports.default = _xfindLast;
},{"./_curry2":520,"./_xfBase":585}],156:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xfindLast2 = require('./internal/_xfindLast');

var _xfindLast3 = _interopRequireDefault(_xfindLast2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */
var findLast = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)([], _xfindLast3.default, function findLast(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx -= 1;
  }
}));
exports.default = findLast;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xfindLast":555}],557:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XFindLastIndex = /*#__PURE__*/function () {
  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }
  XFindLastIndex.prototype['@@transducer/init'] = _xfBase3.default.init;
  XFindLastIndex.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };
  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.lastIdx = this.idx;
    }
    return result;
  };

  return XFindLastIndex;
}();

var _xfindLastIndex = /*#__PURE__*/(0, _curry3.default)(function _xfindLastIndex(f, xf) {
  return new XFindLastIndex(f, xf);
});
exports.default = _xfindLastIndex;
},{"./_curry2":520,"./_xfBase":585}],158:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xfindLastIndex2 = require('./internal/_xfindLastIndex');

var _xfindLastIndex3 = _interopRequireDefault(_xfindLastIndex2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */
var findLastIndex = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)([], _xfindLastIndex3.default, function findLastIndex(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }
    idx -= 1;
  }
  return -1;
}));
exports.default = findLastIndex;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xfindLastIndex":557}],160:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _makeFlat2 = require('./internal/_makeFlat');

var _makeFlat3 = _interopRequireDefault(_makeFlat2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
var flatten = /*#__PURE__*/(0, _curry2.default)( /*#__PURE__*/(0, _makeFlat3.default)(true));
exports.default = flatten;
},{"./internal/_curry1":525,"./internal/_makeFlat":535}],162:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      var mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */
var flip = /*#__PURE__*/(0, _curry2.default)(function flip(fn) {
  return (0, _curryN2.default)(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});
exports.default = flip;
},{"./internal/_curry1":525,"./curryN":106}],164:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkForMethod2 = require('./internal/_checkForMethod');

var _checkForMethod3 = _interopRequireDefault(_checkForMethod2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      var printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */
var forEach = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _checkForMethod3.default)('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;
  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }
  return list;
}));
exports.default = forEach;
},{"./internal/_checkForMethod":558,"./internal/_curry2":520}],166:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      var printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */
var forEachObjIndexed = /*#__PURE__*/(0, _curry3.default)(function forEachObjIndexed(fn, obj) {
  var keyList = (0, _keys2.default)(obj);
  var idx = 0;
  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }
  return obj;
});
exports.default = forEachObjIndexed;
},{"./internal/_curry2":520,"./keys":226}],168:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */
var fromPairs = /*#__PURE__*/(0, _curry2.default)(function fromPairs(pairs) {
  var result = {};
  var idx = 0;
  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }
  return result;
});
exports.default = fromPairs;
},{"./internal/_curry1":525}],170:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkForMethod2 = require('./internal/_checkForMethod');

var _checkForMethod3 = _interopRequireDefault(_checkForMethod2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduceBy = require('./reduceBy');

var _reduceBy2 = _interopRequireDefault(_reduceBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> String) -> [a] -> {String: [a]}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.transduce
 * @example
 *
 *      var byGrade = R.groupBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */
var groupBy = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _checkForMethod3.default)('groupBy', /*#__PURE__*/(0, _reduceBy2.default)(function (acc, item) {
  if (acc == null) {
    acc = [];
  }
  acc.push(item);
  return acc;
}, null)));
exports.default = groupBy;
},{"./internal/_checkForMethod":558,"./internal/_curry2":520,"./reduceBy":378}],172:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */
var groupWith = /*#__PURE__*/(0, _curry3.default)(function (fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    var nextidx = idx + 1;
    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }
    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }
  return res;
});
exports.default = groupWith;
},{"./internal/_curry2":520}],174:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */
var gt = /*#__PURE__*/(0, _curry3.default)(function gt(a, b) {
  return a > b;
});
exports.default = gt;
},{"./internal/_curry2":520}],176:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */
var gte = /*#__PURE__*/(0, _curry3.default)(function gte(a, b) {
  return a >= b;
});
exports.default = gte;
},{"./internal/_curry2":520}],178:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _has2 = require('./internal/_has');

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      var hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      var point = {x: 0, y: 0};
 *      var pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */
var has = /*#__PURE__*/(0, _curry3.default)(_has3.default);
exports.default = has;
},{"./internal/_curry2":520,"./internal/_has":530}],180:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      var square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */
var hasIn = /*#__PURE__*/(0, _curry3.default)(function hasIn(prop, obj) {
  return prop in obj;
});
exports.default = hasIn;
},{"./internal/_curry2":520}],182:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nth = require('./nth');

var _nth2 = _interopRequireDefault(_nth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */
var head = /*#__PURE__*/(0, _nth2.default)(0);
exports.default = head;
},{"./nth":308}],560:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _identity;
function _identity(x) {
  return x;
}
},{}],186:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _identity2 = require('./internal/_identity');

var _identity3 = _interopRequireDefault(_identity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      var obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */
var identity = /*#__PURE__*/(0, _curry2.default)(_identity3.default);
exports.default = identity;
},{"./internal/_curry1":525,"./internal/_identity":560}],188:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when
 * @example
 *
 *      var incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */
var ifElse = /*#__PURE__*/(0, _curry2.default)(function ifElse(condition, onTrue, onFalse) {
  return (0, _curryN2.default)(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});
exports.default = ifElse;
},{"./internal/_curry3":524,"./curryN":106}],190:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */
var inc = /*#__PURE__*/(0, _add2.default)(1);
exports.default = inc;
},{"./add":30}],192:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduceBy = require('./reduceBy');

var _reduceBy2 = _interopRequireDefault(_reduceBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
 * @param {Function} fn Function :: a -> String
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */
var indexBy = /*#__PURE__*/(0, _reduceBy2.default)(function (acc, elem) {
  return elem;
}, null);
exports.default = indexBy;
},{"./reduceBy":378}],194:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _indexOf2 = require('./internal/_indexOf');

var _indexOf3 = _interopRequireDefault(_indexOf2);

var _isArray2 = require('./internal/_isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */
var indexOf = /*#__PURE__*/(0, _curry3.default)(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !(0, _isArray3.default)(xs) ? xs.indexOf(target) : (0, _indexOf3.default)(xs, target, 0);
});
exports.default = indexOf;
},{"./internal/_curry2":520,"./internal/_indexOf":561,"./internal/_isArray":531}],196:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slice = require('./slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */
var init = /*#__PURE__*/(0, _slice2.default)(0, -1);
exports.default = init;
},{"./slice":402}],198:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _containsWith2 = require('./internal/_containsWith');

var _containsWith3 = _interopRequireDefault(_containsWith2);

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _filter2 = require('./internal/_filter');

var _filter3 = _interopRequireDefault(_filter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 *
 * `pred` must be a binary function expecting an element from each list.
 *
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Relation
 * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]
 * @param {Function} pred
 * @param {Array} xs
 * @param {Array} ys
 * @return {Array}
 * @see R.intersection
 * @example
 *
 *      R.innerJoin(
 *        (record, id) => record.id === id,
 *        [{id: 824, name: 'Richie Furay'},
 *         {id: 956, name: 'Dewey Martin'},
 *         {id: 313, name: 'Bruce Palmer'},
 *         {id: 456, name: 'Stephen Stills'},
 *         {id: 177, name: 'Neil Young'}],
 *        [177, 456, 999]
 *      );
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */
var innerJoin = /*#__PURE__*/(0, _curry2.default)(function innerJoin(pred, xs, ys) {
  return (0, _filter3.default)(function (x) {
    return (0, _containsWith3.default)(pred, x, ys);
  }, xs);
});
exports.default = innerJoin;
},{"./internal/_containsWith":542,"./internal/_curry3":524,"./internal/_filter":552}],200:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that

 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */
var insert = /*#__PURE__*/(0, _curry2.default)(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});
exports.default = insert;
},{"./internal/_curry3":524}],202:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */
var insertAll = /*#__PURE__*/(0, _curry2.default)(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});
exports.default = insertAll;
},{"./internal/_curry3":524}],581:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contains2 = require('./_contains');

var _contains3 = _interopRequireDefault(_contains2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Set = /*#__PURE__*/function () {
  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  }

  // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //
  _Set.prototype.add = function (item) {
    return !hasOrAdd(item, true, this);
  };

  //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //
  _Set.prototype.has = function (item) {
    return hasOrAdd(item, false, this);
  };

  //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //
  return _Set;
}();

function hasOrAdd(item, shouldAdd, set) {
  var type = typeof item;
  var prevSize, newSize;
  switch (type) {
    case 'string':
    case 'number':
      // distinguish between +0 and -0
      if (item === 0 && 1 / item === -Infinity) {
        if (set._items['-0']) {
          return true;
        } else {
          if (shouldAdd) {
            set._items['-0'] = true;
          }
          return false;
        }
      }
      // these types can all utilise the native Set
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;
          set._nativeSet.add(item);
          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = {};
            set._items[type][item] = true;
          }
          return false;
        } else if (item in set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][item] = true;
          }
          return false;
        }
      }

    case 'boolean':
      // set._items['boolean'] holds a two element array
      // representing [ falseExists, trueExists ]
      if (type in set._items) {
        var bIdx = item ? 1 : 0;
        if (set._items[type][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][bIdx] = true;
          }
          return false;
        }
      } else {
        if (shouldAdd) {
          set._items[type] = item ? [false, true] : [true, false];
        }
        return false;
      }

    case 'function':
      // compare functions for reference equality
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;
          set._nativeSet.add(item);
          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }
          return false;
        }
        if (!(0, _contains3.default)(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }
          return false;
        }
        return true;
      }

    case 'undefined':
      if (set._items[type]) {
        return true;
      } else {
        if (shouldAdd) {
          set._items[type] = true;
        }
        return false;
      }

    case 'object':
      if (item === null) {
        if (!set._items['null']) {
          if (shouldAdd) {
            set._items['null'] = true;
          }
          return false;
        }
        return true;
      }
    /* falls through */
    default:
      // reduce the search size of heterogeneous sets by creating buckets
      // for each type.
      type = Object.prototype.toString.call(item);
      if (!(type in set._items)) {
        if (shouldAdd) {
          set._items[type] = [item];
        }
        return false;
      }
      // scan through all previously applied items
      if (!(0, _contains3.default)(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }
        return false;
      }
      return true;
  }
}

// A simple Set type that honours R.equals semantics
exports.default = _Set;
},{"./_contains":539}],480:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Set2 = require('./internal/_Set');

var _Set3 = _interopRequireDefault(_Set2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */
var uniqBy = /*#__PURE__*/(0, _curry3.default)(function uniqBy(fn, list) {
  var set = new _Set3.default();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (set.add(appliedItem)) {
      result.push(item);
    }
    idx += 1;
  }
  return result;
});
exports.default = uniqBy;
},{"./internal/_Set":581,"./internal/_curry2":520}],478:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _identity = require('./identity');

var _identity2 = _interopRequireDefault(_identity);

var _uniqBy = require('./uniqBy');

var _uniqBy2 = _interopRequireDefault(_uniqBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */
var uniq = /*#__PURE__*/(0, _uniqBy2.default)(_identity2.default);
exports.default = uniq;
},{"./identity":186,"./uniqBy":480}],204:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contains2 = require('./internal/_contains');

var _contains3 = _interopRequireDefault(_contains2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _filter2 = require('./internal/_filter');

var _filter3 = _interopRequireDefault(_filter2);

var _flip = require('./flip');

var _flip2 = _interopRequireDefault(_flip);

var _uniq = require('./uniq');

var _uniq2 = _interopRequireDefault(_uniq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */
var intersection = /*#__PURE__*/(0, _curry3.default)(function intersection(list1, list2) {
  var lookupList, filteredList;
  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }
  return (0, _uniq2.default)((0, _filter3.default)((0, _flip2.default)(_contains3.default)(lookupList), filteredList));
});
exports.default = intersection;
},{"./internal/_contains":539,"./internal/_curry2":520,"./internal/_filter":552,"./flip":162,"./uniq":478}],206:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkForMethod2 = require('./internal/_checkForMethod');

var _checkForMethod3 = _interopRequireDefault(_checkForMethod2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
 */
var intersperse = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _checkForMethod3.default)('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;
  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }
    idx += 1;
  }
  return out;
}));
exports.default = intersperse;
},{"./internal/_checkForMethod":558,"./internal/_curry2":520}],590:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _objectAssign;

var _has2 = require('./_has');

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;
  while (idx < length) {
    var source = arguments[idx];
    if (source != null) {
      for (var nextKey in source) {
        if ((0, _has3.default)(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}
},{"./_has":530}],566:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectAssign2 = require('./_objectAssign');

var _objectAssign3 = _interopRequireDefault(_objectAssign2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof Object.assign === 'function' ? Object.assign : _objectAssign3.default;
},{"./_objectAssign":590}],314:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      var matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */
var objOf = /*#__PURE__*/(0, _curry3.default)(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});
exports.default = objOf;
},{"./internal/_curry2":520}],563:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _stepCat;

var _assign2 = require('./_assign');

var _assign3 = _interopRequireDefault(_assign2);

var _identity2 = require('./_identity');

var _identity3 = _interopRequireDefault(_identity2);

var _isArrayLike2 = require('./_isArrayLike');

var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

var _isTransformer2 = require('./_isTransformer');

var _isTransformer3 = _interopRequireDefault(_isTransformer2);

var _objOf = require('../objOf');

var _objOf2 = _interopRequireDefault(_objOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function (xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity3.default
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function (a, b) {
    return a + b;
  },
  '@@transducer/result': _identity3.default
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function (result, input) {
    return (0, _assign3.default)(result, (0, _isArrayLike3.default)(input) ? (0, _objOf2.default)(input[0], input[1]) : input);
  },
  '@@transducer/result': _identity3.default
};

function _stepCat(obj) {
  if ((0, _isTransformer3.default)(obj)) {
    return obj;
  }
  if ((0, _isArrayLike3.default)(obj)) {
    return _stepCatArray;
  }
  if (typeof obj === 'string') {
    return _stepCatString;
  }
  if (typeof obj === 'object') {
    return _stepCatObject;
  }
  throw new Error('Cannot create transformer for ' + obj);
}
},{"./_assign":566,"./_identity":560,"./_isArrayLike":584,"./_isTransformer":562,"../objOf":314}],208:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clone2 = require('./internal/_clone');

var _clone3 = _interopRequireDefault(_clone2);

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _isTransformer2 = require('./internal/_isTransformer');

var _isTransformer3 = _interopRequireDefault(_isTransformer2);

var _reduce2 = require('./internal/_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _stepCat2 = require('./internal/_stepCat');

var _stepCat3 = _interopRequireDefault(_stepCat2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      var intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */
var into = /*#__PURE__*/(0, _curry2.default)(function into(acc, xf, list) {
  return (0, _isTransformer3.default)(acc) ? (0, _reduce3.default)(xf(acc), acc['@@transducer/init'](), list) : (0, _reduce3.default)(xf((0, _stepCat3.default)(acc)), (0, _clone3.default)(acc, [], [], false), list);
});
exports.default = into;
},{"./internal/_clone":537,"./internal/_curry3":524,"./internal/_isTransformer":562,"./internal/_reduce":527,"./internal/_stepCat":563}],210:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _has2 = require('./internal/_has');

var _has3 = _interopRequireDefault(_has2);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys in an array.
 * @see R.invertObj
 * @example
 *
 *      var raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */
var invert = /*#__PURE__*/(0, _curry2.default)(function invert(obj) {
  var props = (0, _keys2.default)(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = (0, _has3.default)(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }
  return out;
});
exports.default = invert;
},{"./internal/_curry1":525,"./internal/_has":530,"./keys":226}],212:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @see R.invert
 * @example
 *
 *      var raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      var raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */
var invertObj = /*#__PURE__*/(0, _curry2.default)(function invertObj(obj) {
  var props = (0, _keys2.default)(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }
  return out;
});
exports.default = invertObj;
},{"./internal/_curry1":525,"./keys":226}],214:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _isFunction2 = require('./internal/_isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

var _toString = require('./toString');

var _toString2 = _interopRequireDefault(_toString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of the method to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      var sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      var sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */
var invoker = /*#__PURE__*/(0, _curry3.default)(function invoker(arity, method) {
  return (0, _curryN2.default)(arity + 1, function () {
    var target = arguments[arity];
    if (target != null && (0, _isFunction3.default)(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError((0, _toString2.default)(target) + ' does not have a method named "' + method + '"');
  });
});
exports.default = invoker;
},{"./internal/_curry2":520,"./internal/_isFunction":534,"./curryN":106,"./toString":450}],216:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */
var is = /*#__PURE__*/(0, _curry3.default)(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});
exports.default = is;
},{"./internal/_curry2":520}],218:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _empty = require('./empty');

var _empty2 = _interopRequireDefault(_empty);

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */
var isEmpty = /*#__PURE__*/(0, _curry2.default)(function isEmpty(x) {
  return x != null && (0, _equals2.default)(x, (0, _empty2.default)(x));
});
exports.default = isEmpty;
},{"./internal/_curry1":525,"./empty":138,"./equals":146}],222:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invoker = require('./invoker');

var _invoker2 = _interopRequireDefault(_invoker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      var spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */
var join = /*#__PURE__*/(0, _invoker2.default)(1, 'join');
exports.default = join;
},{"./invoker":214}],224:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _converge = require('./converge');

var _converge2 = _interopRequireDefault(_converge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      var getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */
var juxt = /*#__PURE__*/(0, _curry2.default)(function juxt(fns) {
  return (0, _converge2.default)(function () {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});
exports.default = juxt;
},{"./internal/_curry1":525,"./converge":100}],228:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @see R.keys, R.valuesIn
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */
var keysIn = /*#__PURE__*/(0, _curry2.default)(function keysIn(obj) {
  var prop;
  var ks = [];
  for (prop in obj) {
    ks[ks.length] = prop;
  }
  return ks;
});
exports.default = keysIn;
},{"./internal/_curry1":525}],232:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _isArray2 = require('./internal/_isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */
var lastIndexOf = /*#__PURE__*/(0, _curry3.default)(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !(0, _isArray3.default)(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;
    while (idx >= 0) {
      if ((0, _equals2.default)(xs[idx], target)) {
        return idx;
      }
      idx -= 1;
    }
    return -1;
  }
});
exports.default = lastIndexOf;
},{"./internal/_curry2":520,"./internal/_isArray":531,"./equals":146}],564:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _isNumber;
function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}
},{}],234:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _isNumber2 = require('./internal/_isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */
var length = /*#__PURE__*/(0, _curry2.default)(function length(list) {
  return list != null && (0, _isNumber3.default)(list.length) ? list.length : NaN;
});
exports.default = length;
},{"./internal/_curry1":525,"./internal/_isNumber":564}],236:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */
var lens = /*#__PURE__*/(0, _curry3.default)(function lens(getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return (0, _map2.default)(function (focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});
exports.default = lens;
},{"./internal/_curry2":520,"./map":252}],240:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _lens = require('./lens');

var _lens2 = _interopRequireDefault(_lens);

var _nth = require('./nth');

var _nth2 = _interopRequireDefault(_nth);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */
var lensIndex = /*#__PURE__*/(0, _curry2.default)(function lensIndex(n) {
  return (0, _lens2.default)((0, _nth2.default)(n), (0, _update2.default)(n));
});
exports.default = lensIndex;
},{"./internal/_curry1":525,"./lens":236,"./nth":308,"./update":490}],238:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _assocPath = require('./assocPath');

var _assocPath2 = _interopRequireDefault(_assocPath);

var _lens = require('./lens');

var _lens2 = _interopRequireDefault(_lens);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */
var lensPath = /*#__PURE__*/(0, _curry2.default)(function lensPath(p) {
  return (0, _lens2.default)((0, _path2.default)(p), (0, _assocPath2.default)(p));
});
exports.default = lensPath;
},{"./internal/_curry1":525,"./assocPath":64,"./lens":236,"./path":334}],242:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _assoc = require('./assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _lens = require('./lens');

var _lens2 = _interopRequireDefault(_lens);

var _prop = require('./prop');

var _prop2 = _interopRequireDefault(_prop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */
var lensProp = /*#__PURE__*/(0, _curry2.default)(function lensProp(k) {
  return (0, _lens2.default)((0, _prop2.default)(k), (0, _assoc2.default)(k));
});
exports.default = lensProp;
},{"./internal/_curry1":525,"./assoc":62,"./lens":236,"./prop":362}],248:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */
var lt = /*#__PURE__*/(0, _curry3.default)(function lt(a, b) {
  return a < b;
});
exports.default = lt;
},{"./internal/_curry2":520}],250:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */
var lte = /*#__PURE__*/(0, _curry3.default)(function lte(a, b) {
  return a <= b;
});
exports.default = lte;
},{"./internal/_curry2":520}],254:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccumRight
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */
var mapAccum = /*#__PURE__*/(0, _curry2.default)(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];
  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }
  return [tuple[0], result];
});
exports.default = mapAccum;
},{"./internal/_curry3":524}],256:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 *
 * The iterator function receives two arguments, *value* and *acc*, and should
 * return a tuple *[value, acc]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((x, acc) -> (y, acc)) -> acc -> [x] -> ([y], acc)
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var append = (a, b) => [a + b, a + b];
 *
 *      R.mapAccumRight(append, 5, digits); //=> [['12345', '2345', '345', '45'], '12345']
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   [
 *     f(b, f(c, f(d, a)[0])[0])[1],
 *     f(c, f(d, a)[0])[1],
 *     f(d, a)[1],
 *   ]
 *   f(b, f(c, f(d, a)[0])[0])[0],
 * ]
 */
var mapAccumRight = /*#__PURE__*/(0, _curry2.default)(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];
  while (idx >= 0) {
    tuple = fn(list[idx], tuple[0]);
    result[idx] = tuple[1];
    idx -= 1;
  }
  return [result, tuple[0]];
});
exports.default = mapAccumRight;
},{"./internal/_curry3":524}],258:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduce2 = require('./internal/_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      var values = { x: 1, y: 2, z: 3 };
 *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */
var mapObjIndexed = /*#__PURE__*/(0, _curry3.default)(function mapObjIndexed(fn, obj) {
  return (0, _reduce3.default)(function (acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, (0, _keys2.default)(obj));
});
exports.default = mapObjIndexed;
},{"./internal/_curry2":520,"./internal/_reduce":527,"./keys":226}],260:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */
var match = /*#__PURE__*/(0, _curry3.default)(function match(rx, str) {
  return str.match(rx) || [];
});
exports.default = match;
},{"./internal/_curry2":520}],262:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _isInteger2 = require('./internal/_isInteger');

var _isInteger3 = _interopRequireDefault(_isInteger2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @see R.modulo
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      var clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      var seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */
var mathMod = /*#__PURE__*/(0, _curry3.default)(function mathMod(m, p) {
  if (!(0, _isInteger3.default)(m)) {
    return NaN;
  }
  if (!(0, _isInteger3.default)(p) || p < 1) {
    return NaN;
  }
  return (m % p + p) % p;
});
exports.default = mathMod;
},{"./internal/_curry2":520,"./internal/_isInteger":532}],266:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */
var maxBy = /*#__PURE__*/(0, _curry2.default)(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});
exports.default = maxBy;
},{"./internal/_curry3":524}],422:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */
var sum = /*#__PURE__*/(0, _reduce2.default)(_add2.default, 0);
exports.default = sum;
},{"./add":30,"./reduce":376}],268:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _sum = require('./sum');

var _sum2 = _interopRequireDefault(_sum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.median
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */
var mean = /*#__PURE__*/(0, _curry2.default)(function mean(list) {
  return (0, _sum2.default)(list) / list.length;
});
exports.default = mean;
},{"./internal/_curry1":525,"./sum":422}],270:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _mean = require('./mean');

var _mean2 = _interopRequireDefault(_mean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.mean
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */
var median = /*#__PURE__*/(0, _curry2.default)(function median(list) {
  var len = list.length;
  if (len === 0) {
    return NaN;
  }
  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return (0, _mean2.default)(Array.prototype.slice.call(list, 0).sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});
exports.default = median;
},{"./internal/_curry1":525,"./mean":268}],274:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arity2 = require('./internal/_arity');

var _arity3 = _interopRequireDefault(_arity2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _has2 = require('./internal/_has');

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A customisable version of [`R.memoize`](#memoize). `memoizeWith` takes an
 * additional function that will be applied to a given argument set and used to
 * create the cache key under which the results of the function to be memoized
 * will be stored. Care must be taken when implementing key generation to avoid
 * clashes that may overwrite previous entries erroneously.
 *
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @see R.memoize
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoizeWith(R.identity, n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */
var memoizeWith = /*#__PURE__*/(0, _curry3.default)(function memoizeWith(mFn, fn) {
  var cache = {};
  return (0, _arity3.default)(fn.length, function () {
    var key = mFn.apply(this, arguments);
    if (!(0, _has3.default)(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  });
});
exports.default = memoizeWith;
},{"./internal/_arity":533,"./internal/_curry2":520,"./internal/_has":530}],272:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoizeWith = require('./memoizeWith');

var _memoizeWith2 = _interopRequireDefault(_memoizeWith);

var _toString = require('./toString');

var _toString2 = _interopRequireDefault(_toString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @see R.memoizeWith
 * @deprecated since v0.25.0
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoize(n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */
var memoize = /*#__PURE__*/(0, _memoizeWith2.default)(function () {
  return (0, _toString2.default)(arguments);
});
exports.default = memoize;
},{"./memoizeWith":274,"./toString":450}],276:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('./internal/_assign');

var _assign3 = _interopRequireDefault(_assign2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      var resetToDefault = R.merge(R.__, {x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.merge({ x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: 5, z: 3 }
 */
var merge = /*#__PURE__*/(0, _curry3.default)(function merge(l, r) {
  return (0, _assign3.default)({}, l, r);
});
exports.default = merge;
},{"./internal/_assign":566,"./internal/_curry2":520}],278:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('./internal/_assign');

var _assign3 = _interopRequireDefault(_assign2);

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Merges a list of objects together into one object.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */
var mergeAll = /*#__PURE__*/(0, _curry2.default)(function mergeAll(list) {
  return _assign3.default.apply(null, [{}].concat(list));
});
exports.default = mergeAll;
},{"./internal/_assign":566,"./internal/_curry1":525}],290:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _has2 = require('./internal/_has');

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */
var mergeWithKey = /*#__PURE__*/(0, _curry2.default)(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if ((0, _has3.default)(k, l)) {
      result[k] = (0, _has3.default)(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if ((0, _has3.default)(k, r) && !(0, _has3.default)(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
});
exports.default = mergeWithKey;
},{"./internal/_curry3":524,"./internal/_has":530}],286:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _isObject2 = require('./internal/_isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _mergeWithKey = require('./mergeWithKey');

var _mergeWithKey2 = _interopRequireDefault(_mergeWithKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeep, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */
var mergeDeepWithKey = /*#__PURE__*/(0, _curry2.default)(function mergeDeepWithKey(fn, lObj, rObj) {
  return (0, _mergeWithKey2.default)(function (k, lVal, rVal) {
    if ((0, _isObject3.default)(lVal) && (0, _isObject3.default)(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});
exports.default = mergeDeepWithKey;
},{"./internal/_curry3":524,"./internal/_isObject":551,"./mergeWithKey":290}],280:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _mergeDeepWithKey = require('./mergeDeepWithKey');

var _mergeDeepWithKey2 = _interopRequireDefault(_mergeDeepWithKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                      { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */
var mergeDeepLeft = /*#__PURE__*/(0, _curry3.default)(function mergeDeepLeft(lObj, rObj) {
  return (0, _mergeDeepWithKey2.default)(function (k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});
exports.default = mergeDeepLeft;
},{"./internal/_curry2":520,"./mergeDeepWithKey":286}],282:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _mergeDeepWithKey = require('./mergeDeepWithKey');

var _mergeDeepWithKey2 = _interopRequireDefault(_mergeDeepWithKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */
var mergeDeepRight = /*#__PURE__*/(0, _curry3.default)(function mergeDeepRight(lObj, rObj) {
  return (0, _mergeDeepWithKey2.default)(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});
exports.default = mergeDeepRight;
},{"./internal/_curry2":520,"./mergeDeepWithKey":286}],284:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _mergeDeepWithKey = require('./mergeDeepWithKey');

var _mergeDeepWithKey2 = _interopRequireDefault(_mergeDeepWithKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWith, R.mergeDeep, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepWith(R.concat,
 *                      { a: true, c: { values: [10, 20] }},
 *                      { b: true, c: { values: [15, 35] }});
 *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */
var mergeDeepWith = /*#__PURE__*/(0, _curry2.default)(function mergeDeepWith(fn, lObj, rObj) {
  return (0, _mergeDeepWithKey2.default)(function (k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});
exports.default = mergeDeepWith;
},{"./internal/_curry3":524,"./mergeDeepWithKey":286}],288:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _mergeWithKey = require('./mergeWithKey');

var _mergeWithKey2 = _interopRequireDefault(_mergeWithKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWith, R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */
var mergeWith = /*#__PURE__*/(0, _curry2.default)(function mergeWith(fn, l, r) {
  return (0, _mergeWithKey2.default)(function (_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});
exports.default = mergeWith;
},{"./internal/_curry3":524,"./mergeWithKey":290}],292:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */
var min = /*#__PURE__*/(0, _curry3.default)(function min(a, b) {
  return b < a ? b : a;
});
exports.default = min;
},{"./internal/_curry2":520}],294:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */
var minBy = /*#__PURE__*/(0, _curry2.default)(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});
exports.default = minBy;
},{"./internal/_curry3":524}],296:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      var isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */
var modulo = /*#__PURE__*/(0, _curry3.default)(function modulo(a, b) {
  return a % b;
});
exports.default = modulo;
},{"./internal/_curry2":520}],298:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      var double = R.multiply(2);
 *      var triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */
var multiply = /*#__PURE__*/(0, _curry3.default)(function multiply(a, b) {
  return a * b;
});
exports.default = multiply;
},{"./internal/_curry2":520}],302:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */
var negate = /*#__PURE__*/(0, _curry2.default)(function negate(n) {
  return -n;
});
exports.default = negate;
},{"./internal/_curry1":525}],304:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _complement2 = require('./internal/_complement');

var _complement3 = _interopRequireDefault(_complement2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xany2 = require('./internal/_xany');

var _xany3 = _interopRequireDefault(_xany2);

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *      var isOdd = n => n % 2 === 1;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 */
var none = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _complement3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['any'], _xany3.default, _any2.default)));
exports.default = none;
},{"./internal/_complement":567,"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xany":526,"./any":44}],310:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

var _nth = require('./nth');

var _nth2 = _interopRequireDefault(_nth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */
var nthArg = /*#__PURE__*/(0, _curry2.default)(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return (0, _curryN2.default)(arity, function () {
    return (0, _nth2.default)(n, arguments);
  });
});
exports.default = nthArg;
},{"./internal/_curry1":525,"./curryN":106,"./nth":308}],312:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      var classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      var yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */
var o = /*#__PURE__*/(0, _curry2.default)(function o(f, g, x) {
  return f(g(x));
});
exports.default = o;
},{"./internal/_curry3":524}],568:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _of;
function _of(x) {
  return [x];
}
},{}],316:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _of2 = require('./internal/_of');

var _of3 = _interopRequireDefault(_of2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */
var of = /*#__PURE__*/(0, _curry2.default)(_of3.default);
exports.default = of;
},{"./internal/_curry1":525,"./internal/_of":568}],318:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */
var omit = /*#__PURE__*/(0, _curry3.default)(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
exports.default = omit;
},{"./internal/_curry2":520}],320:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arity2 = require('./internal/_arity');

var _arity3 = _interopRequireDefault(_arity2);

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */
var once = /*#__PURE__*/(0, _curry2.default)(function once(fn) {
  var called = false;
  var result;
  return (0, _arity3.default)(fn.length, function () {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});
exports.default = once;
},{"./internal/_arity":533,"./internal/_curry1":525}],324:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `Identity` is a functor that holds a single value, where `map` simply
// transforms the held value with the provided function.
var Identity = function (x) {
  return { value: x, map: function (f) {
      return Identity(f(x));
    } };
};

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */
var over = /*#__PURE__*/(0, _curry2.default)(function over(lens, f, x) {
  // The value returned by the getter function is first transformed with `f`,
  // then set as the value of an `Identity`. This is then mapped over with the
  // setter function of the lens.
  return lens(function (y) {
    return Identity(f(y));
  })(x).value;
});
exports.default = over;
},{"./internal/_curry3":524}],326:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */
var pair = /*#__PURE__*/(0, _curry3.default)(function pair(fst, snd) {
  return [fst, snd];
});
exports.default = pair;
},{"./internal/_curry2":520}],569:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _createPartialApplicator;

var _arity2 = require('./_arity');

var _arity3 = _interopRequireDefault(_arity2);

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createPartialApplicator(concat) {
  return (0, _curry3.default)(function (fn, args) {
    return (0, _arity3.default)(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}
},{"./_arity":533,"./_curry2":520}],328:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat2 = require('./internal/_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _createPartialApplicator2 = require('./internal/_createPartialApplicator');

var _createPartialApplicator3 = _interopRequireDefault(_createPartialApplicator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight
 * @example
 *
 *      var multiply2 = (a, b) => a * b;
 *      var double = R.partial(multiply2, [2]);
 *      double(2); //=> 4
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var sayHello = R.partial(greet, ['Hello']);
 *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */
var partial = /*#__PURE__*/(0, _createPartialApplicator3.default)(_concat3.default);
exports.default = partial;
},{"./internal/_concat":523,"./internal/_createPartialApplicator":569}],330:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat2 = require('./internal/_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _createPartialApplicator2 = require('./internal/_createPartialApplicator');

var _createPartialApplicator3 = _interopRequireDefault(_createPartialApplicator2);

var _flip = require('./flip');

var _flip2 = _interopRequireDefault(_flip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */
var partialRight = /*#__PURE__*/(0, _createPartialApplicator3.default)( /*#__PURE__*/(0, _flip2.default)(_concat3.default));
exports.default = partialRight;
},{"./internal/_concat":523,"./internal/_createPartialApplicator":569,"./flip":162}],332:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _juxt = require('./juxt');

var _juxt2 = _interopRequireDefault(_juxt);

var _reject = require('./reject');

var _reject2 = _interopRequireDefault(_reject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */
var partition = /*#__PURE__*/(0, _juxt2.default)([_filter2.default, _reject2.default]);
exports.default = partition;
},{"./filter":150,"./juxt":224,"./reject":386}],336:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

var _path2 = require('./path');

var _path3 = _interopRequireDefault(_path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      var user1 = { address: { zipCode: 90210 } };
 *      var user2 = { address: { zipCode: 55555 } };
 *      var user3 = { name: 'Bob' };
 *      var users = [ user1, user2, user3 ];
 *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */
var pathEq = /*#__PURE__*/(0, _curry2.default)(function pathEq(_path, val, obj) {
  return (0, _equals2.default)((0, _path3.default)(_path, obj), val);
});
exports.default = pathEq;
},{"./internal/_curry3":524,"./equals":146,"./path":334}],338:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _defaultTo = require('./defaultTo');

var _defaultTo2 = _interopRequireDefault(_defaultTo);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */
var pathOr = /*#__PURE__*/(0, _curry2.default)(function pathOr(d, p, obj) {
  return (0, _defaultTo2.default)(d, (0, _path2.default)(p, obj));
});
exports.default = pathOr;
},{"./internal/_curry3":524,"./defaultTo":110,"./path":334}],340:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 */
var pathSatisfies = /*#__PURE__*/(0, _curry2.default)(function pathSatisfies(pred, propPath, obj) {
  return propPath.length > 0 && pred((0, _path2.default)(propPath, obj));
});
exports.default = pathSatisfies;
},{"./internal/_curry3":524,"./path":334}],342:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */
var pick = /*#__PURE__*/(0, _curry3.default)(function pick(names, obj) {
  var result = {};
  var idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
});
exports.default = pick;
},{"./internal/_curry2":520}],344:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */
var pickAll = /*#__PURE__*/(0, _curry3.default)(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }
  return result;
});
exports.default = pickAll;
},{"./internal/_curry2":520}],346:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      var isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */
var pickBy = /*#__PURE__*/(0, _curry3.default)(function pickBy(test, obj) {
  var result = {};
  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
exports.default = pickBy;
},{"./internal/_curry2":520}],350:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipeK;

var _composeK = require('./composeK');

var _composeK2 = _interopRequireDefault(_composeK);

var _reverse = require('./reverse');

var _reverse2 = _interopRequireDefault(_reverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the left-to-right Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.pipeK(f, g, h)` is equivalent to `R.pipe(f, R.chain(g), R.chain(h))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)
 * @param {...Function}
 * @return {Function}
 * @see R.composeK
 * @example
 *
 *      //  parseJson :: String -> Maybe *
 *      //  get :: String -> Object -> Maybe *
 *
 *      //  getStateCode :: Maybe String -> Maybe String
 *      var getStateCode = R.pipeK(
 *        parseJson,
 *        get('user'),
 *        get('address'),
 *        get('state'),
 *        R.compose(Maybe.of, R.toUpper)
 *      );
 *
 *      getStateCode('{"user":{"address":{"state":"ny"}}}');
 *      //=> Just('NY')
 *      getStateCode('[Invalid JSON]');
 *      //=> Nothing()
 * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))
 */
function pipeK() {
  if (arguments.length === 0) {
    throw new Error('pipeK requires at least one argument');
  }
  return _composeK2.default.apply(this, (0, _reverse2.default)(arguments));
}
},{"./composeK":86,"./reverse":394}],356:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat2 = require('./internal/_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */
var prepend = /*#__PURE__*/(0, _curry3.default)(function prepend(el, list) {
  return (0, _concat3.default)([el], list);
});
exports.default = prepend;
},{"./internal/_concat":523,"./internal/_curry2":520}],358:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multiply = require('./multiply');

var _multiply2 = _interopRequireDefault(_multiply);

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */
var product = /*#__PURE__*/(0, _reduce2.default)(_multiply2.default, 1);
exports.default = product;
},{"./multiply":298,"./reduce":376}],492:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */
var useWith = /*#__PURE__*/(0, _curry3.default)(function useWith(fn, transformers) {
  return (0, _curryN2.default)(transformers.length, function () {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});
exports.default = useWith;
},{"./internal/_curry2":520,"./curryN":106}],360:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map2 = require('./internal/_map');

var _map3 = _interopRequireDefault(_map2);

var _identity = require('./identity');

var _identity2 = _interopRequireDefault(_identity);

var _pickAll = require('./pickAll');

var _pickAll2 = _interopRequireDefault(_pickAll);

var _useWith = require('./useWith');

var _useWith2 = _interopRequireDefault(_useWith);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      var kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */
var project = /*#__PURE__*/(0, _useWith2.default)(_map3.default, [_pickAll2.default, _identity2.default]); // passing `identity` gives correct arity
exports.default = project;
},{"./internal/_map":540,"./identity":186,"./pickAll":344,"./useWith":492}],364:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.whereEq, R.propSatisfies, R.equals
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      var kids = [abby, fred, rusty, alois];
 *      var hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */
var propEq = /*#__PURE__*/(0, _curry2.default)(function propEq(name, val, obj) {
  return (0, _equals2.default)(val, obj[name]);
});
exports.default = propEq;
},{"./internal/_curry3":524,"./equals":146}],366:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */
var propIs = /*#__PURE__*/(0, _curry2.default)(function propIs(type, name, obj) {
  return (0, _is2.default)(type, obj[name]);
});
exports.default = propIs;
},{"./internal/_curry3":524,"./is":216}],368:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _has2 = require('./internal/_has');

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var favorite = R.prop('favoriteLibrary');
 *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */
var propOr = /*#__PURE__*/(0, _curry2.default)(function propOr(val, p, obj) {
  return obj != null && (0, _has3.default)(p, obj) ? obj[p] : val;
});
exports.default = propOr;
},{"./internal/_curry3":524,"./internal/_has":530}],370:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.where, R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */
var propSatisfies = /*#__PURE__*/(0, _curry2.default)(function propSatisfies(pred, name, obj) {
  return pred(obj[name]);
});
exports.default = propSatisfies;
},{"./internal/_curry3":524}],372:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */
var props = /*#__PURE__*/(0, _curry3.default)(function props(ps, obj) {
  var len = ps.length;
  var out = [];
  var idx = 0;

  while (idx < len) {
    out[idx] = obj[ps[idx]];
    idx += 1;
  }

  return out;
});
exports.default = props;
},{"./internal/_curry2":520}],374:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _isNumber2 = require('./internal/_isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in tthe set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */
var range = /*#__PURE__*/(0, _curry3.default)(function range(from, to) {
  if (!((0, _isNumber3.default)(from) && (0, _isNumber3.default)(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;
  while (n < to) {
    result.push(n);
    n += 1;
  }
  return result;
});
exports.default = range;
},{"./internal/_curry2":520,"./internal/_isNumber":564}],380:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *      //    -               -2
 *      //   / \              / \
 *      //  1   -            1   3
 *      //     / \              / \
 *      //    2   -     ==>    2  -1
 *      //       / \              / \
 *      //      3   -            3   4
 *      //         / \              / \
 *      //        4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */
var reduceRight = /*#__PURE__*/(0, _curry2.default)(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }
  return acc;
});
exports.default = reduceRight;
},{"./internal/_curry3":524}],382:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curryN2 = require('./internal/_curryN');

var _curryN3 = _interopRequireDefault(_curryN2);

var _reduce2 = require('./internal/_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _reduced2 = require('./internal/_reduced');

var _reduced3 = _interopRequireDefault(_reduced2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator.
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      var isOdd = (acc, x) => x % 2 === 1;
 *      var xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      var ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */
var reduceWhile = /*#__PURE__*/(0, _curryN3.default)(4, [], function _reduceWhile(pred, fn, a, list) {
  return (0, _reduce3.default)(function (acc, x) {
    return pred(acc, x) ? fn(acc, x) : (0, _reduced3.default)(acc);
  }, a, list);
});
exports.default = reduceWhile;
},{"./internal/_curryN":541,"./internal/_reduce":527,"./internal/_reduced":573}],384:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _reduced2 = require('./internal/_reduced');

var _reduced3 = _interopRequireDefault(_reduced2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * Note: this optimization is unavailable to functions not explicitly listed
 * above. For instance, it is not currently supported by
 * [`reduceRight`](#reduceRight).
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.transduce
 * @example
 *
 *     R.reduce(
 *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *       [],
 *       [1, 2, 3, 4, 5]) // [1, 2, 3]
 */
var reduced = /*#__PURE__*/(0, _curry2.default)(_reduced3.default);
exports.default = reduced;
},{"./internal/_curry1":525,"./internal/_reduced":573}],442:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */
var times = /*#__PURE__*/(0, _curry3.default)(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }
  list = new Array(len);
  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }
  return list;
});
exports.default = times;
},{"./internal/_curry2":520}],390:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _always = require('./always');

var _always2 = _interopRequireDefault(_always);

var _times = require('./times');

var _times2 = _interopRequireDefault(_times);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @see R.times
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      var obj = {};
 *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */
var repeat = /*#__PURE__*/(0, _curry3.default)(function repeat(value, n) {
  return (0, _times2.default)((0, _always2.default)(value), n);
});
exports.default = repeat;
},{"./internal/_curry2":520,"./always":40,"./times":442}],392:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */
var replace = /*#__PURE__*/(0, _curry2.default)(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});
exports.default = replace;
},{"./internal/_curry3":524}],396:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @see R.reduce
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */
var scan = /*#__PURE__*/(0, _curry2.default)(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];
  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }
  return result;
});
exports.default = scan;
},{"./internal/_curry3":524}],398:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _ap = require('./ap');

var _ap2 = _interopRequireDefault(_ap);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _prepend = require('./prepend');

var _prepend2 = _interopRequireDefault(_prepend);

var _reduceRight = require('./reduceRight');

var _reduceRight2 = _interopRequireDefault(_reduceRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */
var sequence = /*#__PURE__*/(0, _curry3.default)(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : (0, _reduceRight2.default)(function (x, acc) {
    return (0, _ap2.default)((0, _map2.default)(_prepend2.default, x), acc);
  }, of([]), traversable);
});
exports.default = sequence;
},{"./internal/_curry2":520,"./ap":48,"./map":252,"./prepend":356,"./reduceRight":380}],400:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _always = require('./always');

var _always2 = _interopRequireDefault(_always);

var _over = require('./over');

var _over2 = _interopRequireDefault(_over);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */
var set = /*#__PURE__*/(0, _curry2.default)(function set(lens, v, x) {
  return (0, _over2.default)(lens, (0, _always2.default)(v), x);
});
exports.default = set;
},{"./internal/_curry3":524,"./always":40,"./over":324}],404:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, a) -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      var diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */
var sort = /*#__PURE__*/(0, _curry3.default)(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});
exports.default = sort;
},{"./internal/_curry2":520}],406:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      var sortByFirstItem = R.sortBy(R.prop(0));
 *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      var people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */
var sortBy = /*#__PURE__*/(0, _curry3.default)(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});
exports.default = sortBy;
},{"./internal/_curry2":520}],408:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [(a, a) -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @example
 *
 *      var alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      var bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      var people = [clara, bob, alice];
 *      var ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */
var sortWith = /*#__PURE__*/(0, _curry3.default)(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var result = 0;
    var i = 0;
    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }
    return result;
  });
});
exports.default = sortWith;
},{"./internal/_curry2":520}],410:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invoker = require('./invoker');

var _invoker2 = _interopRequireDefault(_invoker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `str`.
 * @see R.join
 * @example
 *
 *      var pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */
var split = /*#__PURE__*/(0, _invoker2.default)(1, 'split');
exports.default = split;
},{"./invoker":214}],412:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _length = require('./length');

var _length2 = _interopRequireDefault(_length);

var _slice = require('./slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */
var splitAt = /*#__PURE__*/(0, _curry3.default)(function splitAt(index, array) {
  return [(0, _slice2.default)(0, index, array), (0, _slice2.default)(index, (0, _length2.default)(array), array)];
});
exports.default = splitAt;
},{"./internal/_curry2":520,"./length":234,"./slice":402}],414:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _slice = require('./slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */
var splitEvery = /*#__PURE__*/(0, _curry3.default)(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }
  var result = [];
  var idx = 0;
  while (idx < list.length) {
    result.push((0, _slice2.default)(idx, idx += n, list));
  }
  return result;
});
exports.default = splitEvery;
},{"./internal/_curry2":520,"./slice":402}],416:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */
var splitWhen = /*#__PURE__*/(0, _curry3.default)(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});
exports.default = splitWhen;
},{"./internal/_curry2":520}],418:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

var _take = require('./take');

var _take2 = _interopRequireDefault(_take);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if a list starts with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */
var startsWith = /*#__PURE__*/(0, _curry3.default)(function (prefix, list) {
  return (0, _equals2.default)((0, _take2.default)(prefix.length, list), prefix);
});
exports.default = startsWith;
},{"./internal/_curry2":520,"./equals":146,"./take":430}],420:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      var minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      var complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */
var subtract = /*#__PURE__*/(0, _curry3.default)(function subtract(a, b) {
  return Number(a) - Number(b);
});
exports.default = subtract;
},{"./internal/_curry2":520}],424:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _concat = require('./concat');

var _concat2 = _interopRequireDefault(_concat);

var _difference = require('./difference');

var _difference2 = _interopRequireDefault(_difference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */
var symmetricDifference = /*#__PURE__*/(0, _curry3.default)(function symmetricDifference(list1, list2) {
  return (0, _concat2.default)((0, _difference2.default)(list1, list2), (0, _difference2.default)(list2, list1));
});
exports.default = symmetricDifference;
},{"./internal/_curry2":520,"./concat":90,"./difference":114}],426:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _concat = require('./concat');

var _concat2 = _interopRequireDefault(_concat);

var _differenceWith = require('./differenceWith');

var _differenceWith2 = _interopRequireDefault(_differenceWith);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      var eqA = R.eqBy(R.prop('a'));
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */
var symmetricDifferenceWith = /*#__PURE__*/(0, _curry2.default)(function symmetricDifferenceWith(pred, list1, list2) {
  return (0, _concat2.default)((0, _differenceWith2.default)(pred, list1, list2), (0, _differenceWith2.default)(pred, list2, list1));
});
exports.default = symmetricDifferenceWith;
},{"./internal/_curry3":524,"./concat":90,"./differenceWith":116}],434:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _slice = require('./slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      var isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 *
 *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 */
var takeLastWhile = /*#__PURE__*/(0, _curry3.default)(function takeLastWhile(fn, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }
  return (0, _slice2.default)(idx + 1, Infinity, xs);
});
exports.default = takeLastWhile;
},{"./internal/_curry2":520,"./slice":402}],578:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _reduced2 = require('./_reduced');

var _reduced3 = _interopRequireDefault(_reduced2);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XTakeWhile = /*#__PURE__*/function () {
  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTakeWhile.prototype['@@transducer/init'] = _xfBase3.default.init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase3.default.result;
  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : (0, _reduced3.default)(result);
  };

  return XTakeWhile;
}();

var _xtakeWhile = /*#__PURE__*/(0, _curry3.default)(function _xtakeWhile(f, xf) {
  return new XTakeWhile(f, xf);
});
exports.default = _xtakeWhile;
},{"./_curry2":520,"./_reduced":573,"./_xfBase":585}],436:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xtakeWhile2 = require('./internal/_xtakeWhile');

var _xtakeWhile3 = _interopRequireDefault(_xtakeWhile2);

var _slice = require('./slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      var isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 */
var takeWhile = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)(['takeWhile'], _xtakeWhile3.default, function takeWhile(fn, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }
  return (0, _slice2.default)(0, idx, xs);
}));
exports.default = takeWhile;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xtakeWhile":578,"./slice":402}],575:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _xfBase2 = require('./_xfBase');

var _xfBase3 = _interopRequireDefault(_xfBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XTap = /*#__PURE__*/function () {
  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTap.prototype['@@transducer/init'] = _xfBase3.default.init;
  XTap.prototype['@@transducer/result'] = _xfBase3.default.result;
  XTap.prototype['@@transducer/step'] = function (result, input) {
    this.f(input);
    return this.xf['@@transducer/step'](result, input);
  };

  return XTap;
}();

var _xtap = /*#__PURE__*/(0, _curry3.default)(function _xtap(f, xf) {
  return new XTap(f, xf);
});
exports.default = _xtap;
},{"./_curry2":520,"./_xfBase":585}],438:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _dispatchable2 = require('./internal/_dispatchable');

var _dispatchable3 = _interopRequireDefault(_dispatchable2);

var _xtap2 = require('./internal/_xtap');

var _xtap3 = _interopRequireDefault(_xtap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      var sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */
var tap = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _dispatchable3.default)([], _xtap3.default, function tap(fn, x) {
  fn(x);
  return x;
}));
exports.default = tap;
},{"./internal/_curry2":520,"./internal/_dispatchable":521,"./internal/_xtap":575}],577:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _isRegExp;
function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}
},{}],440:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloneRegExp2 = require('./internal/_cloneRegExp');

var _cloneRegExp3 = _interopRequireDefault(_cloneRegExp2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _isRegExp2 = require('./internal/_isRegExp');

var _isRegExp3 = _interopRequireDefault(_isRegExp2);

var _toString = require('./toString');

var _toString2 = _interopRequireDefault(_toString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */
var test = /*#__PURE__*/(0, _curry3.default)(function test(pattern, str) {
  if (!(0, _isRegExp3.default)(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + (0, _toString2.default)(pattern));
  }
  return (0, _cloneRegExp3.default)(pattern).test(str);
});
exports.default = test;
},{"./internal/_cloneRegExp":576,"./internal/_curry2":520,"./internal/_isRegExp":577,"./toString":450}],444:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invoker = require('./invoker');

var _invoker2 = _interopRequireDefault(_invoker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */
var toLower = /*#__PURE__*/(0, _invoker2.default)(0, 'toLowerCase');
exports.default = toLower;
},{"./invoker":214}],446:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _has2 = require('./internal/_has');

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */
var toPairs = /*#__PURE__*/(0, _curry2.default)(function toPairs(obj) {
  var pairs = [];
  for (var prop in obj) {
    if ((0, _has3.default)(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }
  return pairs;
});
exports.default = toPairs;
},{"./internal/_curry1":525,"./internal/_has":530}],448:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */
var toPairsIn = /*#__PURE__*/(0, _curry2.default)(function toPairsIn(obj) {
  var pairs = [];
  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }
  return pairs;
});
exports.default = toPairsIn;
},{"./internal/_curry1":525}],452:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invoker = require('./invoker');

var _invoker2 = _interopRequireDefault(_invoker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */
var toUpper = /*#__PURE__*/(0, _invoker2.default)(0, 'toUpperCase');
exports.default = toUpper;
},{"./invoker":214}],454:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduce2 = require('./internal/_reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _xwrap2 = require('./internal/_xwrap');

var _xwrap3 = _interopRequireDefault(_xwrap2);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      var isOdd = (x) => x % 2 === 1;
 *      var firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 */
var transduce = /*#__PURE__*/(0, _curryN2.default)(4, function transduce(xf, fn, acc, list) {
  return (0, _reduce3.default)(xf(typeof fn === 'function' ? (0, _xwrap3.default)(fn) : fn), acc, list);
});
exports.default = transduce;
},{"./internal/_reduce":527,"./internal/_xwrap":580,"./curryN":106}],456:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 *      // If some of the rows are shorter than the following rows, their elements are skipped:
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */
var transpose = /*#__PURE__*/(0, _curry2.default)(function transpose(outerlist) {
  var i = 0;
  var result = [];
  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;
    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }
      result[j].push(innerlist[j]);
      j += 1;
    }
    i += 1;
  }
  return result;
});
exports.default = transpose;
},{"./internal/_curry1":525}],458:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _sequence = require('./sequence');

var _sequence2 = _interopRequireDefault(_sequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Nothing` if the given divisor is `0`
 *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
 */
var traverse = /*#__PURE__*/(0, _curry2.default)(function traverse(of, f, traversable) {
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](f, of) : (0, _sequence2.default)(of, (0, _map2.default)(f, traversable));
});
exports.default = traverse;
},{"./internal/_curry3":524,"./map":252,"./sequence":398}],460:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = typeof String.prototype.trim === 'function';
/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */
var _trim = !hasProtoTrim || /*#__PURE__*/ws.trim() || ! /*#__PURE__*/zeroWidth.trim() ? function trim(str) {
  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
  return str.replace(beginRx, '').replace(endRx, '');
} : function trim(str) {
  return str.trim();
};
var trim = /*#__PURE__*/(0, _curry2.default)(_trim);
exports.default = trim;
},{"./internal/_curry1":525}],462:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arity2 = require('./internal/_arity');

var _arity3 = _interopRequireDefault(_arity2);

var _concat2 = require('./internal/_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send then to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false
 */
var tryCatch = /*#__PURE__*/(0, _curry3.default)(function _tryCatch(tryer, catcher) {
  return (0, _arity3.default)(tryer.length, function () {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, (0, _concat3.default)([e], arguments));
    }
  });
});
exports.default = tryCatch;
},{"./internal/_arity":533,"./internal/_concat":523,"./internal/_curry2":520}],466:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */
var unapply = /*#__PURE__*/(0, _curry2.default)(function unapply(fn) {
  return function () {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});
exports.default = unapply;
},{"./internal/_curry1":525}],468:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

var _nAry = require('./nAry');

var _nAry2 = _interopRequireDefault(_nAry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> b) -> (a -> b)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @see R.binary, R.nAry
 * @example
 *
 *      var takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */
var unary = /*#__PURE__*/(0, _curry2.default)(function unary(fn) {
  return (0, _nAry2.default)(1, fn);
});
exports.default = unary;
},{"./internal/_curry1":525,"./nAry":300}],470:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _curryN = require('./curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      var addFour = a => b => c => d => a + b + c + d;
 *
 *      var uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */
var uncurryN = /*#__PURE__*/(0, _curry3.default)(function uncurryN(depth, fn) {
  return (0, _curryN2.default)(depth, function () {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;
    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }
    return value;
  });
});
exports.default = uncurryN;
},{"./internal/_curry2":520,"./curryN":106}],472:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      var f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */
var unfold = /*#__PURE__*/(0, _curry3.default)(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];
  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }
  return result;
});
exports.default = unfold;
},{"./internal/_curry2":520}],474:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat2 = require('./internal/_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _uniq = require('./uniq');

var _uniq2 = _interopRequireDefault(_uniq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */
var union = /*#__PURE__*/(0, _curry3.default)( /*#__PURE__*/(0, _compose2.default)(_uniq2.default, _concat3.default));
exports.default = union;
},{"./internal/_concat":523,"./internal/_curry2":520,"./compose":84,"./uniq":478}],482:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _containsWith2 = require('./internal/_containsWith');

var _containsWith3 = _interopRequireDefault(_containsWith2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      var strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */
var uniqWith = /*#__PURE__*/(0, _curry3.default)(function uniqWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;
  while (idx < len) {
    item = list[idx];
    if (!(0, _containsWith3.default)(pred, item, result)) {
      result[result.length] = item;
    }
    idx += 1;
  }
  return result;
});
exports.default = uniqWith;
},{"./internal/_containsWith":542,"./internal/_curry2":520}],476:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat2 = require('./internal/_concat');

var _concat3 = _interopRequireDefault(_concat2);

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

var _uniqWith = require('./uniqWith');

var _uniqWith2 = _interopRequireDefault(_uniqWith);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      var l1 = [{a: 1}, {a: 2}];
 *      var l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */
var unionWith = /*#__PURE__*/(0, _curry2.default)(function unionWith(pred, list1, list2) {
  return (0, _uniqWith2.default)(pred, (0, _concat3.default)(list1, list2));
});
exports.default = unionWith;
},{"./internal/_concat":523,"./internal/_curry3":524,"./uniqWith":482}],484:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when
 * @example
 *
 *      let safeInc = R.unless(R.isNil, R.inc);
 *      safeInc(null); //=> null
 *      safeInc(1); //=> 2
 */
var unless = /*#__PURE__*/(0, _curry2.default)(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});
exports.default = unless;
},{"./internal/_curry3":524}],486:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _identity2 = require('./internal/_identity');

var _identity3 = _interopRequireDefault(_identity2);

var _chain = require('./chain');

var _chain2 = _interopRequireDefault(_chain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */
var unnest = /*#__PURE__*/(0, _chain2.default)(_identity3.default);
exports.default = unnest;
},{"./internal/_identity":560,"./chain":74}],488:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */
var until = /*#__PURE__*/(0, _curry2.default)(function until(pred, fn, init) {
  var val = init;
  while (!pred(val)) {
    val = fn(val);
  }
  return val;
});
exports.default = until;
},{"./internal/_curry3":524}],496:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry1');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @see R.values, R.keysIn
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */
var valuesIn = /*#__PURE__*/(0, _curry2.default)(function valuesIn(obj) {
  var prop;
  var vs = [];
  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }
  return vs;
});
exports.default = valuesIn;
},{"./internal/_curry1":525}],498:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `Const` is a functor that effectively ignores the function given to `map`.
var Const = function (x) {
  return { value: x, 'fantasy-land/map': function () {
      return this;
    } };
};

/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */
var view = /*#__PURE__*/(0, _curry3.default)(function view(lens, x) {
  // Using `Const` effectively ignores the setter function of the `lens`,
  // leaving the value returned by the getter function unmodified.
  return lens(Const)(x).value;
});
exports.default = view;
},{"./internal/_curry2":520}],500:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless
 * @example
 *
 *      // truncate :: String -> String
 *      var truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */
var when = /*#__PURE__*/(0, _curry2.default)(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});
exports.default = when;
},{"./internal/_curry3":524}],502:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _has2 = require('./internal/_has');

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */
var where = /*#__PURE__*/(0, _curry3.default)(function where(spec, testObj) {
  for (var prop in spec) {
    if ((0, _has3.default)(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }
  return true;
});
exports.default = where;
},{"./internal/_curry2":520,"./internal/_has":530}],504:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _equals = require('./equals');

var _equals2 = _interopRequireDefault(_equals);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _where = require('./where');

var _where2 = _interopRequireDefault(_where);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propEq, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */
var whereEq = /*#__PURE__*/(0, _curry3.default)(function whereEq(spec, testObj) {
  return (0, _where2.default)((0, _map2.default)(_equals2.default, spec), testObj);
});
exports.default = whereEq;
},{"./internal/_curry2":520,"./equals":146,"./map":252,"./where":502}],506:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contains2 = require('./internal/_contains');

var _contains3 = _interopRequireDefault(_contains2);

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

var _flip = require('./flip');

var _flip2 = _interopRequireDefault(_flip);

var _reject = require('./reject');

var _reject2 = _interopRequireDefault(_reject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */
var without = /*#__PURE__*/(0, _curry3.default)(function (xs, list) {
  return (0, _reject2.default)((0, _flip2.default)(_contains3.default)(xs), list);
});
exports.default = without;
},{"./internal/_contains":539,"./internal/_curry2":520,"./flip":162,"./reject":386}],508:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */
var xprod = /*#__PURE__*/(0, _curry3.default)(function xprod(a, b) {
  // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];
  while (idx < ilen) {
    j = 0;
    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }
    idx += 1;
  }
  return result;
});
exports.default = xprod;
},{"./internal/_curry2":520}],510:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */
var zip = /*#__PURE__*/(0, _curry3.default)(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }
  return rv;
});
exports.default = zip;
},{"./internal/_curry2":520}],512:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry2');

var _curry3 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */
var zipObj = /*#__PURE__*/(0, _curry3.default)(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};
  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }
  return out;
});
exports.default = zipObj;
},{"./internal/_curry2":520}],514:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = require('./internal/_curry3');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      var f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */
var zipWith = /*#__PURE__*/(0, _curry2.default)(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }
  return rv;
});
exports.default = zipWith;
},{"./internal/_curry3":524}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _F = require('./F');

Object.defineProperty(exports, 'F', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_F).default;
  }
});

var _T = require('./T');

Object.defineProperty(exports, 'T', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_T).default;
  }
});

var _ = require('./__');

Object.defineProperty(exports, '__', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_).default;
  }
});

var _add = require('./add');

Object.defineProperty(exports, 'add', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_add).default;
  }
});

var _addIndex = require('./addIndex');

Object.defineProperty(exports, 'addIndex', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_addIndex).default;
  }
});

var _adjust = require('./adjust');

Object.defineProperty(exports, 'adjust', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_adjust).default;
  }
});

var _all = require('./all');

Object.defineProperty(exports, 'all', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_all).default;
  }
});

var _allPass = require('./allPass');

Object.defineProperty(exports, 'allPass', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_allPass).default;
  }
});

var _always = require('./always');

Object.defineProperty(exports, 'always', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_always).default;
  }
});

var _and = require('./and');

Object.defineProperty(exports, 'and', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_and).default;
  }
});

var _any = require('./any');

Object.defineProperty(exports, 'any', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_any).default;
  }
});

var _anyPass = require('./anyPass');

Object.defineProperty(exports, 'anyPass', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_anyPass).default;
  }
});

var _ap = require('./ap');

Object.defineProperty(exports, 'ap', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_ap).default;
  }
});

var _aperture = require('./aperture');

Object.defineProperty(exports, 'aperture', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_aperture).default;
  }
});

var _append = require('./append');

Object.defineProperty(exports, 'append', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_append).default;
  }
});

var _apply = require('./apply');

Object.defineProperty(exports, 'apply', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_apply).default;
  }
});

var _applySpec = require('./applySpec');

Object.defineProperty(exports, 'applySpec', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_applySpec).default;
  }
});

var _applyTo = require('./applyTo');

Object.defineProperty(exports, 'applyTo', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_applyTo).default;
  }
});

var _ascend = require('./ascend');

Object.defineProperty(exports, 'ascend', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_ascend).default;
  }
});

var _assoc = require('./assoc');

Object.defineProperty(exports, 'assoc', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_assoc).default;
  }
});

var _assocPath = require('./assocPath');

Object.defineProperty(exports, 'assocPath', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_assocPath).default;
  }
});

var _binary = require('./binary');

Object.defineProperty(exports, 'binary', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_binary).default;
  }
});

var _bind = require('./bind');

Object.defineProperty(exports, 'bind', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_bind).default;
  }
});

var _both = require('./both');

Object.defineProperty(exports, 'both', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_both).default;
  }
});

var _call = require('./call');

Object.defineProperty(exports, 'call', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_call).default;
  }
});

var _chain = require('./chain');

Object.defineProperty(exports, 'chain', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_chain).default;
  }
});

var _clamp = require('./clamp');

Object.defineProperty(exports, 'clamp', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_clamp).default;
  }
});

var _clone = require('./clone');

Object.defineProperty(exports, 'clone', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_clone).default;
  }
});

var _comparator = require('./comparator');

Object.defineProperty(exports, 'comparator', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_comparator).default;
  }
});

var _complement = require('./complement');

Object.defineProperty(exports, 'complement', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_complement).default;
  }
});

var _compose = require('./compose');

Object.defineProperty(exports, 'compose', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_compose).default;
  }
});

var _composeK = require('./composeK');

Object.defineProperty(exports, 'composeK', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_composeK).default;
  }
});

var _composeP = require('./composeP');

Object.defineProperty(exports, 'composeP', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_composeP).default;
  }
});

var _concat = require('./concat');

Object.defineProperty(exports, 'concat', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_concat).default;
  }
});

var _cond = require('./cond');

Object.defineProperty(exports, 'cond', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_cond).default;
  }
});

var _construct = require('./construct');

Object.defineProperty(exports, 'construct', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_construct).default;
  }
});

var _constructN = require('./constructN');

Object.defineProperty(exports, 'constructN', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_constructN).default;
  }
});

var _contains = require('./contains');

Object.defineProperty(exports, 'contains', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_contains).default;
  }
});

var _converge = require('./converge');

Object.defineProperty(exports, 'converge', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_converge).default;
  }
});

var _countBy = require('./countBy');

Object.defineProperty(exports, 'countBy', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_countBy).default;
  }
});

var _curry = require('./curry');

Object.defineProperty(exports, 'curry', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_curry).default;
  }
});

var _curryN = require('./curryN');

Object.defineProperty(exports, 'curryN', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_curryN).default;
  }
});

var _dec = require('./dec');

Object.defineProperty(exports, 'dec', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_dec).default;
  }
});

var _defaultTo = require('./defaultTo');

Object.defineProperty(exports, 'defaultTo', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_defaultTo).default;
  }
});

var _descend = require('./descend');

Object.defineProperty(exports, 'descend', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_descend).default;
  }
});

var _difference = require('./difference');

Object.defineProperty(exports, 'difference', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_difference).default;
  }
});

var _differenceWith = require('./differenceWith');

Object.defineProperty(exports, 'differenceWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_differenceWith).default;
  }
});

var _dissoc = require('./dissoc');

Object.defineProperty(exports, 'dissoc', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_dissoc).default;
  }
});

var _dissocPath = require('./dissocPath');

Object.defineProperty(exports, 'dissocPath', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_dissocPath).default;
  }
});

var _divide = require('./divide');

Object.defineProperty(exports, 'divide', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_divide).default;
  }
});

var _drop = require('./drop');

Object.defineProperty(exports, 'drop', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_drop).default;
  }
});

var _dropLast = require('./dropLast');

Object.defineProperty(exports, 'dropLast', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_dropLast).default;
  }
});

var _dropLastWhile = require('./dropLastWhile');

Object.defineProperty(exports, 'dropLastWhile', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_dropLastWhile).default;
  }
});

var _dropRepeats = require('./dropRepeats');

Object.defineProperty(exports, 'dropRepeats', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_dropRepeats).default;
  }
});

var _dropRepeatsWith = require('./dropRepeatsWith');

Object.defineProperty(exports, 'dropRepeatsWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_dropRepeatsWith).default;
  }
});

var _dropWhile = require('./dropWhile');

Object.defineProperty(exports, 'dropWhile', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_dropWhile).default;
  }
});

var _either = require('./either');

Object.defineProperty(exports, 'either', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_either).default;
  }
});

var _empty = require('./empty');

Object.defineProperty(exports, 'empty', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_empty).default;
  }
});

var _endsWith = require('./endsWith');

Object.defineProperty(exports, 'endsWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_endsWith).default;
  }
});

var _eqBy = require('./eqBy');

Object.defineProperty(exports, 'eqBy', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_eqBy).default;
  }
});

var _eqProps = require('./eqProps');

Object.defineProperty(exports, 'eqProps', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_eqProps).default;
  }
});

var _equals = require('./equals');

Object.defineProperty(exports, 'equals', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_equals).default;
  }
});

var _evolve = require('./evolve');

Object.defineProperty(exports, 'evolve', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_evolve).default;
  }
});

var _filter = require('./filter');

Object.defineProperty(exports, 'filter', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_filter).default;
  }
});

var _find = require('./find');

Object.defineProperty(exports, 'find', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_find).default;
  }
});

var _findIndex = require('./findIndex');

Object.defineProperty(exports, 'findIndex', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_findIndex).default;
  }
});

var _findLast = require('./findLast');

Object.defineProperty(exports, 'findLast', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_findLast).default;
  }
});

var _findLastIndex = require('./findLastIndex');

Object.defineProperty(exports, 'findLastIndex', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_findLastIndex).default;
  }
});

var _flatten = require('./flatten');

Object.defineProperty(exports, 'flatten', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_flatten).default;
  }
});

var _flip = require('./flip');

Object.defineProperty(exports, 'flip', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_flip).default;
  }
});

var _forEach = require('./forEach');

Object.defineProperty(exports, 'forEach', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_forEach).default;
  }
});

var _forEachObjIndexed = require('./forEachObjIndexed');

Object.defineProperty(exports, 'forEachObjIndexed', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_forEachObjIndexed).default;
  }
});

var _fromPairs = require('./fromPairs');

Object.defineProperty(exports, 'fromPairs', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_fromPairs).default;
  }
});

var _groupBy = require('./groupBy');

Object.defineProperty(exports, 'groupBy', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_groupBy).default;
  }
});

var _groupWith = require('./groupWith');

Object.defineProperty(exports, 'groupWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_groupWith).default;
  }
});

var _gt = require('./gt');

Object.defineProperty(exports, 'gt', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_gt).default;
  }
});

var _gte = require('./gte');

Object.defineProperty(exports, 'gte', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_gte).default;
  }
});

var _has = require('./has');

Object.defineProperty(exports, 'has', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_has).default;
  }
});

var _hasIn = require('./hasIn');

Object.defineProperty(exports, 'hasIn', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_hasIn).default;
  }
});

var _head = require('./head');

Object.defineProperty(exports, 'head', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_head).default;
  }
});

var _identical = require('./identical');

Object.defineProperty(exports, 'identical', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_identical).default;
  }
});

var _identity = require('./identity');

Object.defineProperty(exports, 'identity', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_identity).default;
  }
});

var _ifElse = require('./ifElse');

Object.defineProperty(exports, 'ifElse', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_ifElse).default;
  }
});

var _inc = require('./inc');

Object.defineProperty(exports, 'inc', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_inc).default;
  }
});

var _indexBy = require('./indexBy');

Object.defineProperty(exports, 'indexBy', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_indexBy).default;
  }
});

var _indexOf = require('./indexOf');

Object.defineProperty(exports, 'indexOf', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_indexOf).default;
  }
});

var _init = require('./init');

Object.defineProperty(exports, 'init', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_init).default;
  }
});

var _innerJoin = require('./innerJoin');

Object.defineProperty(exports, 'innerJoin', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_innerJoin).default;
  }
});

var _insert = require('./insert');

Object.defineProperty(exports, 'insert', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_insert).default;
  }
});

var _insertAll = require('./insertAll');

Object.defineProperty(exports, 'insertAll', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_insertAll).default;
  }
});

var _intersection = require('./intersection');

Object.defineProperty(exports, 'intersection', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_intersection).default;
  }
});

var _intersperse = require('./intersperse');

Object.defineProperty(exports, 'intersperse', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_intersperse).default;
  }
});

var _into = require('./into');

Object.defineProperty(exports, 'into', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_into).default;
  }
});

var _invert = require('./invert');

Object.defineProperty(exports, 'invert', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_invert).default;
  }
});

var _invertObj = require('./invertObj');

Object.defineProperty(exports, 'invertObj', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_invertObj).default;
  }
});

var _invoker = require('./invoker');

Object.defineProperty(exports, 'invoker', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_invoker).default;
  }
});

var _is = require('./is');

Object.defineProperty(exports, 'is', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_is).default;
  }
});

var _isEmpty = require('./isEmpty');

Object.defineProperty(exports, 'isEmpty', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isEmpty).default;
  }
});

var _isNil = require('./isNil');

Object.defineProperty(exports, 'isNil', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_isNil).default;
  }
});

var _join = require('./join');

Object.defineProperty(exports, 'join', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_join).default;
  }
});

var _juxt = require('./juxt');

Object.defineProperty(exports, 'juxt', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_juxt).default;
  }
});

var _keys = require('./keys');

Object.defineProperty(exports, 'keys', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_keys).default;
  }
});

var _keysIn = require('./keysIn');

Object.defineProperty(exports, 'keysIn', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_keysIn).default;
  }
});

var _last = require('./last');

Object.defineProperty(exports, 'last', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_last).default;
  }
});

var _lastIndexOf = require('./lastIndexOf');

Object.defineProperty(exports, 'lastIndexOf', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_lastIndexOf).default;
  }
});

var _length = require('./length');

Object.defineProperty(exports, 'length', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_length).default;
  }
});

var _lens = require('./lens');

Object.defineProperty(exports, 'lens', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_lens).default;
  }
});

var _lensIndex = require('./lensIndex');

Object.defineProperty(exports, 'lensIndex', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_lensIndex).default;
  }
});

var _lensPath = require('./lensPath');

Object.defineProperty(exports, 'lensPath', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_lensPath).default;
  }
});

var _lensProp = require('./lensProp');

Object.defineProperty(exports, 'lensProp', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_lensProp).default;
  }
});

var _lift = require('./lift');

Object.defineProperty(exports, 'lift', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_lift).default;
  }
});

var _liftN = require('./liftN');

Object.defineProperty(exports, 'liftN', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_liftN).default;
  }
});

var _lt = require('./lt');

Object.defineProperty(exports, 'lt', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_lt).default;
  }
});

var _lte = require('./lte');

Object.defineProperty(exports, 'lte', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_lte).default;
  }
});

var _map = require('./map');

Object.defineProperty(exports, 'map', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_map).default;
  }
});

var _mapAccum = require('./mapAccum');

Object.defineProperty(exports, 'mapAccum', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mapAccum).default;
  }
});

var _mapAccumRight = require('./mapAccumRight');

Object.defineProperty(exports, 'mapAccumRight', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mapAccumRight).default;
  }
});

var _mapObjIndexed = require('./mapObjIndexed');

Object.defineProperty(exports, 'mapObjIndexed', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mapObjIndexed).default;
  }
});

var _match = require('./match');

Object.defineProperty(exports, 'match', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_match).default;
  }
});

var _mathMod = require('./mathMod');

Object.defineProperty(exports, 'mathMod', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mathMod).default;
  }
});

var _max = require('./max');

Object.defineProperty(exports, 'max', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_max).default;
  }
});

var _maxBy = require('./maxBy');

Object.defineProperty(exports, 'maxBy', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_maxBy).default;
  }
});

var _mean = require('./mean');

Object.defineProperty(exports, 'mean', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mean).default;
  }
});

var _median = require('./median');

Object.defineProperty(exports, 'median', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_median).default;
  }
});

var _memoize = require('./memoize');

Object.defineProperty(exports, 'memoize', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_memoize).default;
  }
});

var _memoizeWith = require('./memoizeWith');

Object.defineProperty(exports, 'memoizeWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_memoizeWith).default;
  }
});

var _merge = require('./merge');

Object.defineProperty(exports, 'merge', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_merge).default;
  }
});

var _mergeAll = require('./mergeAll');

Object.defineProperty(exports, 'mergeAll', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mergeAll).default;
  }
});

var _mergeDeepLeft = require('./mergeDeepLeft');

Object.defineProperty(exports, 'mergeDeepLeft', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mergeDeepLeft).default;
  }
});

var _mergeDeepRight = require('./mergeDeepRight');

Object.defineProperty(exports, 'mergeDeepRight', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mergeDeepRight).default;
  }
});

var _mergeDeepWith = require('./mergeDeepWith');

Object.defineProperty(exports, 'mergeDeepWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mergeDeepWith).default;
  }
});

var _mergeDeepWithKey = require('./mergeDeepWithKey');

Object.defineProperty(exports, 'mergeDeepWithKey', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mergeDeepWithKey).default;
  }
});

var _mergeWith = require('./mergeWith');

Object.defineProperty(exports, 'mergeWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mergeWith).default;
  }
});

var _mergeWithKey = require('./mergeWithKey');

Object.defineProperty(exports, 'mergeWithKey', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_mergeWithKey).default;
  }
});

var _min = require('./min');

Object.defineProperty(exports, 'min', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_min).default;
  }
});

var _minBy = require('./minBy');

Object.defineProperty(exports, 'minBy', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_minBy).default;
  }
});

var _modulo = require('./modulo');

Object.defineProperty(exports, 'modulo', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_modulo).default;
  }
});

var _multiply = require('./multiply');

Object.defineProperty(exports, 'multiply', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_multiply).default;
  }
});

var _nAry = require('./nAry');

Object.defineProperty(exports, 'nAry', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_nAry).default;
  }
});

var _negate = require('./negate');

Object.defineProperty(exports, 'negate', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_negate).default;
  }
});

var _none = require('./none');

Object.defineProperty(exports, 'none', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_none).default;
  }
});

var _not = require('./not');

Object.defineProperty(exports, 'not', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_not).default;
  }
});

var _nth = require('./nth');

Object.defineProperty(exports, 'nth', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_nth).default;
  }
});

var _nthArg = require('./nthArg');

Object.defineProperty(exports, 'nthArg', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_nthArg).default;
  }
});

var _o = require('./o');

Object.defineProperty(exports, 'o', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_o).default;
  }
});

var _objOf = require('./objOf');

Object.defineProperty(exports, 'objOf', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_objOf).default;
  }
});

var _of = require('./of');

Object.defineProperty(exports, 'of', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_of).default;
  }
});

var _omit = require('./omit');

Object.defineProperty(exports, 'omit', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_omit).default;
  }
});

var _once = require('./once');

Object.defineProperty(exports, 'once', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_once).default;
  }
});

var _or = require('./or');

Object.defineProperty(exports, 'or', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_or).default;
  }
});

var _over = require('./over');

Object.defineProperty(exports, 'over', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_over).default;
  }
});

var _pair = require('./pair');

Object.defineProperty(exports, 'pair', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pair).default;
  }
});

var _partial = require('./partial');

Object.defineProperty(exports, 'partial', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_partial).default;
  }
});

var _partialRight = require('./partialRight');

Object.defineProperty(exports, 'partialRight', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_partialRight).default;
  }
});

var _partition = require('./partition');

Object.defineProperty(exports, 'partition', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_partition).default;
  }
});

var _path = require('./path');

Object.defineProperty(exports, 'path', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_path).default;
  }
});

var _pathEq = require('./pathEq');

Object.defineProperty(exports, 'pathEq', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pathEq).default;
  }
});

var _pathOr = require('./pathOr');

Object.defineProperty(exports, 'pathOr', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pathOr).default;
  }
});

var _pathSatisfies = require('./pathSatisfies');

Object.defineProperty(exports, 'pathSatisfies', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pathSatisfies).default;
  }
});

var _pick = require('./pick');

Object.defineProperty(exports, 'pick', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pick).default;
  }
});

var _pickAll = require('./pickAll');

Object.defineProperty(exports, 'pickAll', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pickAll).default;
  }
});

var _pickBy = require('./pickBy');

Object.defineProperty(exports, 'pickBy', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pickBy).default;
  }
});

var _pipe = require('./pipe');

Object.defineProperty(exports, 'pipe', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pipe).default;
  }
});

var _pipeK = require('./pipeK');

Object.defineProperty(exports, 'pipeK', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pipeK).default;
  }
});

var _pipeP = require('./pipeP');

Object.defineProperty(exports, 'pipeP', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pipeP).default;
  }
});

var _pluck = require('./pluck');

Object.defineProperty(exports, 'pluck', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_pluck).default;
  }
});

var _prepend = require('./prepend');

Object.defineProperty(exports, 'prepend', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_prepend).default;
  }
});

var _product = require('./product');

Object.defineProperty(exports, 'product', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_product).default;
  }
});

var _project = require('./project');

Object.defineProperty(exports, 'project', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_project).default;
  }
});

var _prop = require('./prop');

Object.defineProperty(exports, 'prop', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_prop).default;
  }
});

var _propEq = require('./propEq');

Object.defineProperty(exports, 'propEq', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_propEq).default;
  }
});

var _propIs = require('./propIs');

Object.defineProperty(exports, 'propIs', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_propIs).default;
  }
});

var _propOr = require('./propOr');

Object.defineProperty(exports, 'propOr', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_propOr).default;
  }
});

var _propSatisfies = require('./propSatisfies');

Object.defineProperty(exports, 'propSatisfies', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_propSatisfies).default;
  }
});

var _props = require('./props');

Object.defineProperty(exports, 'props', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_props).default;
  }
});

var _range = require('./range');

Object.defineProperty(exports, 'range', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_range).default;
  }
});

var _reduce = require('./reduce');

Object.defineProperty(exports, 'reduce', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_reduce).default;
  }
});

var _reduceBy = require('./reduceBy');

Object.defineProperty(exports, 'reduceBy', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_reduceBy).default;
  }
});

var _reduceRight = require('./reduceRight');

Object.defineProperty(exports, 'reduceRight', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_reduceRight).default;
  }
});

var _reduceWhile = require('./reduceWhile');

Object.defineProperty(exports, 'reduceWhile', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_reduceWhile).default;
  }
});

var _reduced = require('./reduced');

Object.defineProperty(exports, 'reduced', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_reduced).default;
  }
});

var _reject = require('./reject');

Object.defineProperty(exports, 'reject', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_reject).default;
  }
});

var _remove = require('./remove');

Object.defineProperty(exports, 'remove', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_remove).default;
  }
});

var _repeat = require('./repeat');

Object.defineProperty(exports, 'repeat', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_repeat).default;
  }
});

var _replace = require('./replace');

Object.defineProperty(exports, 'replace', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_replace).default;
  }
});

var _reverse = require('./reverse');

Object.defineProperty(exports, 'reverse', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_reverse).default;
  }
});

var _scan = require('./scan');

Object.defineProperty(exports, 'scan', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_scan).default;
  }
});

var _sequence = require('./sequence');

Object.defineProperty(exports, 'sequence', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_sequence).default;
  }
});

var _set = require('./set');

Object.defineProperty(exports, 'set', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_set).default;
  }
});

var _slice = require('./slice');

Object.defineProperty(exports, 'slice', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_slice).default;
  }
});

var _sort = require('./sort');

Object.defineProperty(exports, 'sort', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_sort).default;
  }
});

var _sortBy = require('./sortBy');

Object.defineProperty(exports, 'sortBy', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_sortBy).default;
  }
});

var _sortWith = require('./sortWith');

Object.defineProperty(exports, 'sortWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_sortWith).default;
  }
});

var _split = require('./split');

Object.defineProperty(exports, 'split', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_split).default;
  }
});

var _splitAt = require('./splitAt');

Object.defineProperty(exports, 'splitAt', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_splitAt).default;
  }
});

var _splitEvery = require('./splitEvery');

Object.defineProperty(exports, 'splitEvery', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_splitEvery).default;
  }
});

var _splitWhen = require('./splitWhen');

Object.defineProperty(exports, 'splitWhen', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_splitWhen).default;
  }
});

var _startsWith = require('./startsWith');

Object.defineProperty(exports, 'startsWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_startsWith).default;
  }
});

var _subtract = require('./subtract');

Object.defineProperty(exports, 'subtract', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_subtract).default;
  }
});

var _sum = require('./sum');

Object.defineProperty(exports, 'sum', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_sum).default;
  }
});

var _symmetricDifference = require('./symmetricDifference');

Object.defineProperty(exports, 'symmetricDifference', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_symmetricDifference).default;
  }
});

var _symmetricDifferenceWith = require('./symmetricDifferenceWith');

Object.defineProperty(exports, 'symmetricDifferenceWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_symmetricDifferenceWith).default;
  }
});

var _tail = require('./tail');

Object.defineProperty(exports, 'tail', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_tail).default;
  }
});

var _take = require('./take');

Object.defineProperty(exports, 'take', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_take).default;
  }
});

var _takeLast = require('./takeLast');

Object.defineProperty(exports, 'takeLast', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_takeLast).default;
  }
});

var _takeLastWhile = require('./takeLastWhile');

Object.defineProperty(exports, 'takeLastWhile', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_takeLastWhile).default;
  }
});

var _takeWhile = require('./takeWhile');

Object.defineProperty(exports, 'takeWhile', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_takeWhile).default;
  }
});

var _tap = require('./tap');

Object.defineProperty(exports, 'tap', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_tap).default;
  }
});

var _test = require('./test');

Object.defineProperty(exports, 'test', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_test).default;
  }
});

var _times = require('./times');

Object.defineProperty(exports, 'times', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_times).default;
  }
});

var _toLower = require('./toLower');

Object.defineProperty(exports, 'toLower', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_toLower).default;
  }
});

var _toPairs = require('./toPairs');

Object.defineProperty(exports, 'toPairs', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_toPairs).default;
  }
});

var _toPairsIn = require('./toPairsIn');

Object.defineProperty(exports, 'toPairsIn', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_toPairsIn).default;
  }
});

var _toString = require('./toString');

Object.defineProperty(exports, 'toString', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_toString).default;
  }
});

var _toUpper = require('./toUpper');

Object.defineProperty(exports, 'toUpper', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_toUpper).default;
  }
});

var _transduce = require('./transduce');

Object.defineProperty(exports, 'transduce', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_transduce).default;
  }
});

var _transpose = require('./transpose');

Object.defineProperty(exports, 'transpose', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_transpose).default;
  }
});

var _traverse = require('./traverse');

Object.defineProperty(exports, 'traverse', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_traverse).default;
  }
});

var _trim = require('./trim');

Object.defineProperty(exports, 'trim', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_trim).default;
  }
});

var _tryCatch = require('./tryCatch');

Object.defineProperty(exports, 'tryCatch', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_tryCatch).default;
  }
});

var _type = require('./type');

Object.defineProperty(exports, 'type', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_type).default;
  }
});

var _unapply = require('./unapply');

Object.defineProperty(exports, 'unapply', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_unapply).default;
  }
});

var _unary = require('./unary');

Object.defineProperty(exports, 'unary', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_unary).default;
  }
});

var _uncurryN = require('./uncurryN');

Object.defineProperty(exports, 'uncurryN', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_uncurryN).default;
  }
});

var _unfold = require('./unfold');

Object.defineProperty(exports, 'unfold', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_unfold).default;
  }
});

var _union = require('./union');

Object.defineProperty(exports, 'union', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_union).default;
  }
});

var _unionWith = require('./unionWith');

Object.defineProperty(exports, 'unionWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_unionWith).default;
  }
});

var _uniq = require('./uniq');

Object.defineProperty(exports, 'uniq', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_uniq).default;
  }
});

var _uniqBy = require('./uniqBy');

Object.defineProperty(exports, 'uniqBy', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_uniqBy).default;
  }
});

var _uniqWith = require('./uniqWith');

Object.defineProperty(exports, 'uniqWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_uniqWith).default;
  }
});

var _unless = require('./unless');

Object.defineProperty(exports, 'unless', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_unless).default;
  }
});

var _unnest = require('./unnest');

Object.defineProperty(exports, 'unnest', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_unnest).default;
  }
});

var _until = require('./until');

Object.defineProperty(exports, 'until', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_until).default;
  }
});

var _update = require('./update');

Object.defineProperty(exports, 'update', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_update).default;
  }
});

var _useWith = require('./useWith');

Object.defineProperty(exports, 'useWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_useWith).default;
  }
});

var _values = require('./values');

Object.defineProperty(exports, 'values', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_values).default;
  }
});

var _valuesIn = require('./valuesIn');

Object.defineProperty(exports, 'valuesIn', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_valuesIn).default;
  }
});

var _view = require('./view');

Object.defineProperty(exports, 'view', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_view).default;
  }
});

var _when = require('./when');

Object.defineProperty(exports, 'when', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_when).default;
  }
});

var _where = require('./where');

Object.defineProperty(exports, 'where', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_where).default;
  }
});

var _whereEq = require('./whereEq');

Object.defineProperty(exports, 'whereEq', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_whereEq).default;
  }
});

var _without = require('./without');

Object.defineProperty(exports, 'without', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_without).default;
  }
});

var _xprod = require('./xprod');

Object.defineProperty(exports, 'xprod', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_xprod).default;
  }
});

var _zip = require('./zip');

Object.defineProperty(exports, 'zip', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_zip).default;
  }
});

var _zipObj = require('./zipObj');

Object.defineProperty(exports, 'zipObj', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_zipObj).default;
  }
});

var _zipWith = require('./zipWith');

Object.defineProperty(exports, 'zipWith', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_zipWith).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./F":24,"./T":26,"./__":28,"./add":30,"./addIndex":32,"./adjust":34,"./all":36,"./allPass":38,"./always":40,"./and":42,"./any":44,"./anyPass":46,"./ap":48,"./aperture":50,"./append":52,"./apply":54,"./applySpec":56,"./applyTo":58,"./ascend":60,"./assoc":62,"./assocPath":64,"./binary":66,"./bind":68,"./both":70,"./call":72,"./chain":74,"./clamp":76,"./clone":78,"./comparator":80,"./complement":82,"./compose":84,"./composeK":86,"./composeP":88,"./concat":90,"./cond":92,"./construct":94,"./constructN":96,"./contains":98,"./converge":100,"./countBy":102,"./curry":104,"./curryN":106,"./dec":108,"./defaultTo":110,"./descend":112,"./difference":114,"./differenceWith":116,"./dissoc":118,"./dissocPath":120,"./divide":122,"./drop":124,"./dropLast":126,"./dropLastWhile":130,"./dropRepeats":128,"./dropRepeatsWith":132,"./dropWhile":134,"./either":136,"./empty":138,"./endsWith":140,"./eqBy":142,"./eqProps":144,"./equals":146,"./evolve":148,"./filter":150,"./find":152,"./findIndex":154,"./findLast":156,"./findLastIndex":158,"./flatten":160,"./flip":162,"./forEach":164,"./forEachObjIndexed":166,"./fromPairs":168,"./groupBy":170,"./groupWith":172,"./gt":174,"./gte":176,"./has":178,"./hasIn":180,"./head":182,"./identical":184,"./identity":186,"./ifElse":188,"./inc":190,"./indexBy":192,"./indexOf":194,"./init":196,"./innerJoin":198,"./insert":200,"./insertAll":202,"./intersection":204,"./intersperse":206,"./into":208,"./invert":210,"./invertObj":212,"./invoker":214,"./is":216,"./isEmpty":218,"./isNil":220,"./join":222,"./juxt":224,"./keys":226,"./keysIn":228,"./last":230,"./lastIndexOf":232,"./length":234,"./lens":236,"./lensIndex":240,"./lensPath":238,"./lensProp":242,"./lift":244,"./liftN":246,"./lt":248,"./lte":250,"./map":252,"./mapAccum":254,"./mapAccumRight":256,"./mapObjIndexed":258,"./match":260,"./mathMod":262,"./max":264,"./maxBy":266,"./mean":268,"./median":270,"./memoize":272,"./memoizeWith":274,"./merge":276,"./mergeAll":278,"./mergeDeepLeft":280,"./mergeDeepRight":282,"./mergeDeepWith":284,"./mergeDeepWithKey":286,"./mergeWith":288,"./mergeWithKey":290,"./min":292,"./minBy":294,"./modulo":296,"./multiply":298,"./nAry":300,"./negate":302,"./none":304,"./not":306,"./nth":308,"./nthArg":310,"./o":312,"./objOf":314,"./of":316,"./omit":318,"./once":320,"./or":322,"./over":324,"./pair":326,"./partial":328,"./partialRight":330,"./partition":332,"./path":334,"./pathEq":336,"./pathOr":338,"./pathSatisfies":340,"./pick":342,"./pickAll":344,"./pickBy":346,"./pipe":348,"./pipeK":350,"./pipeP":352,"./pluck":354,"./prepend":356,"./product":358,"./project":360,"./prop":362,"./propEq":364,"./propIs":366,"./propOr":368,"./propSatisfies":370,"./props":372,"./range":374,"./reduce":376,"./reduceBy":378,"./reduceRight":380,"./reduceWhile":382,"./reduced":384,"./reject":386,"./remove":388,"./repeat":390,"./replace":392,"./reverse":394,"./scan":396,"./sequence":398,"./set":400,"./slice":402,"./sort":404,"./sortBy":406,"./sortWith":408,"./split":410,"./splitAt":412,"./splitEvery":414,"./splitWhen":416,"./startsWith":418,"./subtract":420,"./sum":422,"./symmetricDifference":424,"./symmetricDifferenceWith":426,"./tail":428,"./take":430,"./takeLast":432,"./takeLastWhile":434,"./takeWhile":436,"./tap":438,"./test":440,"./times":442,"./toLower":444,"./toPairs":446,"./toPairsIn":448,"./toString":450,"./toUpper":452,"./transduce":454,"./transpose":456,"./traverse":458,"./trim":460,"./tryCatch":462,"./type":464,"./unapply":466,"./unary":468,"./uncurryN":470,"./unfold":472,"./union":474,"./unionWith":476,"./uniq":478,"./uniqBy":480,"./uniqWith":482,"./unless":484,"./unnest":486,"./until":488,"./update":490,"./useWith":492,"./values":494,"./valuesIn":496,"./view":498,"./when":500,"./where":502,"./whereEq":504,"./without":506,"./xprod":508,"./zip":510,"./zipObj":512,"./zipWith":514}],587:[function(require,module,exports) {
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],588:[function(require,module,exports) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],586:[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};
},{}],518:[function(require,module,exports) {
var global = (1,eval)("this");
var process = require("process");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;
exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = undefined || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }
  return debugs[set];
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};

  array.forEach(function (val, idx) {
    hash[val] = true;
  });

  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) &&
  // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect &&
  // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
},{"./support/isBuffer":587,"inherits":588,"process":586}],519:[function(require,module,exports) {
'use strict';

module.exports = function isArrayish(obj) {
	if (!obj) {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && obj.splice instanceof Function);
};

},{}],20:[function(require,module,exports) {
'use strict';

var util = require('util');
var isArrayish = require('is-arrayish');

var errorEx = function errorEx(name, properties) {
	if (!name || name.constructor !== String) {
		properties = name || {};
		name = Error.name;
	}

	var errorExError = function ErrorEXError(message) {
		if (!this) {
			return new ErrorEXError(message);
		}

		message = message instanceof Error
			? message.message
			: (message || this.message);

		Error.call(this, message);
		Error.captureStackTrace(this, errorExError);

		this.name = name;

		Object.defineProperty(this, 'message', {
			configurable: true,
			enumerable: false,
			get: function () {
				var newMessage = message.split(/\r?\n/g);

				for (var key in properties) {
					if (!properties.hasOwnProperty(key)) {
						continue;
					}

					var modifier = properties[key];

					if ('message' in modifier) {
						newMessage = modifier.message(this[key], newMessage) || newMessage;
						if (!isArrayish(newMessage)) {
							newMessage = [newMessage];
						}
					}
				}

				return newMessage.join('\n');
			},
			set: function (v) {
				message = v;
			}
		});

		var stackDescriptor = Object.getOwnPropertyDescriptor(this, 'stack');
		var stackGetter = stackDescriptor.get;
		var stackValue = stackDescriptor.value;
		delete stackDescriptor.value;
		delete stackDescriptor.writable;

		stackDescriptor.get = function () {
			var stack = (stackGetter)
				? stackGetter.call(this).split(/\r?\n+/g)
				: stackValue.split(/\r?\n+/g);

			// starting in Node 7, the stack builder caches the message.
			// just replace it.
			stack[0] = this.name + ': ' + this.message;

			var lineCount = 1;
			for (var key in properties) {
				if (!properties.hasOwnProperty(key)) {
					continue;
				}

				var modifier = properties[key];

				if ('line' in modifier) {
					var line = modifier.line(this[key]);
					if (line) {
						stack.splice(lineCount++, 0, '    ' + line);
					}
				}

				if ('stack' in modifier) {
					modifier.stack(this[key], stack);
				}
			}

			return stack.join('\n');
		};

		Object.defineProperty(this, 'stack', stackDescriptor);
	};

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(errorExError.prototype, Error.prototype);
		Object.setPrototypeOf(errorExError, Error);
	} else {
		util.inherits(errorExError, Error);
	}

	return errorExError;
};

errorEx.append = function (str, def) {
	return {
		message: function (v, message) {
			v = v || def;

			if (v) {
				message[0] += ' ' + str.replace('%s', v.toString());
			}

			return message;
		}
	};
};

errorEx.line = function (str, def) {
	return {
		line: function (v) {
			v = v || def;

			if (v) {
				return str.replace('%s', v.toString());
			}

			return null;
		}
	};
};

module.exports = errorEx;

},{"util":518,"is-arrayish":519}],8:[function(require,module,exports) {
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Predefined errors that ui-predicate-core will yield from rejected promises
 * @namespace errors
 * @since 1.0.0
 * @note errors are 100% tested from PredicateCore.test.js
 */

var _require = require('ramda'),
    mergeAll = _require.mergeAll;

var errorEx = require('error-ex');

function err(name) {
  return _defineProperty({}, name, errorEx(name));
}

module.exports = mergeAll([
/**
 * Error when a Predicate is created without
 * @typedef {Error} InvalidPredicateType
 * @memberof errors
 * @since 1.0.0
 */
err('InvalidPredicateType'),

/**
 * Error when someone tried to remove the last remaining predicate from a CompoundPredicate
 * @typedef {Error} CompoundPredicateMustHaveAtLeastOneSubPredicate
 * @memberof errors
 * @since 1.0.0
 */
err('CompoundPredicateMustHaveAtLeastOneSubPredicate'),

/**
 * Error when setData `data` parameter is called with something else than a  {@link dataclasses.CompoundPredicate}
 * @typedef {Error} RootPredicateMustBeACompoundPredicate
 * @memberof errors
 * @since 1.0.0
 */
err('RootPredicateMustBeACompoundPredicate'),

/**
 * Error when a function was requiring a {@link dataclasses.CompoundPredicate} as a parameter
 * @typedef {Error} RootPredicateMustBeACompoundPredicate
 * @memberof errors
 * @since 1.0.0
 */
err('PredicateMustBeACompoundPredicate'),

/**
 * Error when a function was requiring a {@link dataclasses.ComparisonPredicate} as a parameter
 * @typedef {Error} PredicateMustBeAComparisonPredicate
 * @memberof errors
 * @since 1.0.0
 */
err('PredicateMustBeAComparisonPredicate'),

/**
 * Error add is called with something else than "after" parameter
 * @typedef {Error} AddCurrentlyOnlySupportAfterInsertion
 * @memberof errors
 * @since 1.0.0
 */
err('AddCurrentlyOnlySupportAfterInsertion'),

/**
 * Thrown when a specified target refers to a undefined type.
 * It means the user has missed a type definition in `types`.
 * @typedef {Error} TargetMustReferToADefinedType
 * @memberof errors
 * @since 1.0.0
 */
err('TargetMustReferToADefinedType'),

/**
 * Thrown when a user asked for a logic change on a {@link dataclasses.CompoundPredicate}
 * but the logicalType_id was invalid because it referred to no existing targets
 * @typedef {Error} LogicalType_idMustReferToADefinedLogicalType
 * @memberof errors
 * @since 1.0.0
 */
err('LogicalType_idMustReferToADefinedLogicalType'),

/**
 * Thrown when a user asked for a target change on a predicate
 * but the target_id was invalid because it referred to no existing targets
 * @typedef {Error} Target_idMustReferToADefinedTarget
 * @memberof errors
 * @since 1.0.0
 */
err('Target_idMustReferToADefinedTarget'),

/**
 * Thrown when a user asked for a operator change on a predicate
 * but the operator_id was invalid because it referred
 * to no existing operators for the currently selected predicate's target
 * @typedef {Error} Operator_idMustReferToADefinedOperator
 * @memberof errors
 * @since 1.0.0
 */
err('Operator_idMustReferToADefinedOperator'),

/**
 * Thrown when remove is called on root {@link dataclasses.CompoundPredicate}
 * @typedef {Error} ForbiddenCannotRemoveRootCompoundPredicate
 * @memberof errors
 * @since 1.0.0
 */
err('ForbiddenCannotRemoveRootCompoundPredicate'),

/**
 * Thrown when remove is called on root CompoundPredicate
 * @typedef {Error} ForbiddenCannotRemoveLastComparisonPredicate
 * @memberof errors
 * @since 1.0.0
 */
err('ForbiddenCannotRemoveLastComparisonPredicate'),

/**
 * Thrown when remove is called with an invalid type of predicate
 * @typedef {Error} CannotRemoveSomethingElseThanACompoundPredicateOrAComparisonPredicate
 * @memberof errors
 * @since 1.0.0
 */
err('CannotRemoveSomethingElseThanACompoundPredicateOrAComparisonPredicate'),

/**
 * Thrown when add is called with an invalid type of predicate
 * @typedef {Error} CannotAddSomethingElseThanACompoundPredicateOrAComparisonPredicate
 * @memberof errors
 * @since 1.0.0
 */
err('CannotAddSomethingElseThanACompoundPredicateOrAComparisonPredicate')]);
},{"ramda":16,"error-ex":20}],10:[function(require,module,exports) {
/**
 * Rules
 * @namespace rules
 * @since 1.0.0
 * @note rules are 100% tested from PredicateCore.test.js
 */

module.exports = {
  /**
   * @param {CompoundPredicate} root      root predicate
   * @param {Predicate} predicateToRemove predicate to remove
   * @return {boolean} true if the predicate to remove is the root predicate
   * @memberof rules
   */
  predicateToRemoveIsRootPredicate: function predicateToRemoveIsRootPredicate(root, predicateToRemove) {
    return root === predicateToRemove;
  },

  /**
   * @param {CompoundPredicate} root      root predicate
   * @param {Predicate} predicateToRemove predicate to remove
   * @param {Function} CompoundPredicate CompoundPredicate constructor function
   * @param {Function} ComparisonPredicate ComparisonPredicate constructor function
   * @return {boolean} true if the predicate to remove is the last ComparisonPredicate
   * @memberof rules
   */
  predicateToRemoveIsTheLastComparisonPredicate: function predicateToRemoveIsTheLastComparisonPredicate(root, CompoundPredicate, ComparisonPredicate) {
    var comparisonPredicateCount = CompoundPredicate.reduce(root, function (acc, el) {
      return ComparisonPredicate.is(el) ? acc + 1 : acc;
    }, 0);

    return comparisonPredicateCount === 1;
  }
};
},{}],12:[function(require,module,exports) {
/**
 * Invariants
 * @namespace invariants
 * @since 1.0.0
 * @note invariants are 100% tested from PredicateCore.test.js
 */

var _require = require('ramda'),
    is = _require.is;

module.exports = function (_ref) {
  var errors = _ref.errors,
      rules = _ref.rules;
  return {
    /**
     * [CompoundPredicateMustHaveAtLeastOneSubPredicate description]
     * @param {?Array<Predicate>} predicates list of predicates to add to a CompoundPredicate at creation time
     * @return {Promise<undefined, errors.CompoundPredicateMustHaveAtLeastOneSubPredicate>} resolve the promise if the invariant pass or yield a `CompoundPredicateMustHaveAtLeastOneSubPredicate` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    CompoundPredicateMustHaveAtLeastOneSubPredicate: function CompoundPredicateMustHaveAtLeastOneSubPredicate(predicates) {
      return !Array.isArray(predicates) || predicates.length === 0 ? Promise.reject(new errors.CompoundPredicateMustHaveAtLeastOneSubPredicate()) : Promise.resolve();
    },
    /**
     * @param {String} type Predicate type
     * @param {Object} acceptedTypes list of accepted types
     * @return {Promise<undefined, errors.InvalidPredicateType>} resolve the promise if the invariant pass or yield a `InvalidPredicateType` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    PredicateTypeMustBeValid: function PredicateTypeMustBeValid(type, acceptedTypes) {
      return !Object.keys(acceptedTypes).includes(type) ? Promise.reject(new errors.InvalidPredicateType()) : Promise.resolve();
    },
    /**
     * @param {dataclasses.CompoundPredicate} root root
     * @return {Promise<dataclasses.CompoundPredicate, errors.RootPredicateMustBeACompoundPredicate>} resolve the promise if the invariant pass or yield a `RootPredicateMustBeACompoundPredicate` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    RootPredicateMustBeACompoundPredicate: function RootPredicateMustBeACompoundPredicate(root, CompoundPredicate) {
      return !CompoundPredicate.is(root) ? Promise.reject(new errors.RootPredicateMustBeACompoundPredicate()) : Promise.resolve(root);
    },
    /**
     * @param {dataclasses.Predicate} predicate predicate
     * @param {dataclasses.ComparisonPredicate} ComparisonPredicate ComparisonPredicate constructor
     * @return {Promise<undefined, errors.PredicateMustBeAComparisonPredicate>} resolve the promise if the invariant pass or yield a `PredicateMustBeAComparisonPredicate` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    PredicateMustBeAComparisonPredicate: function PredicateMustBeAComparisonPredicate(predicate, ComparisonPredicate) {
      return !ComparisonPredicate.is(predicate) ? Promise.reject(new errors.PredicateMustBeAComparisonPredicate()) : Promise.resolve();
    },
    /**
     * @param {dataclasses.Predicate} predicate
     * @param {dataclasses.CompoundPredicate} CompoundPredicate CompoundPredicate constructor
     * @return {Promise<undefined, errors.PredicateMustBeACompoundPredicate>} resolve the promise if the invariant pass or yield a `PredicateMustBeACompoundPredicate` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    PredicateMustBeACompoundPredicate: function PredicateMustBeACompoundPredicate(predicate, CompoundPredicate) {
      return !CompoundPredicate.is(predicate) ? Promise.reject(new errors.PredicateMustBeACompoundPredicate()) : Promise.resolve();
    },
    /**
     * @param {dataclasses.CompoundPredicate} root root
     * @return {Promise<undefined, errors.AddCurrentlyOnlySupportAfterInsertion>} resolve the promise if the invariant pass or yield a `AddCurrentlyOnlySupportAfterInsertion` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    AddOnlySupportsAfter: function AddOnlySupportsAfter(how) {
      return how !== 'after' ? Promise.reject(new errors.AddCurrentlyOnlySupportAfterInsertion()) : Promise.resolve();
    },
    /**
     * @param {dataclasses.CompoundPredicate} root root
     * @return {Promise<dataclasses.Type, errors.TargetMustReferToADefinedType>} resolve the promise if the invariant pass or yield a `TargetMustReferToADefinedType` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    TargetMustReferToADefinedType: function TargetMustReferToADefinedType(type, target) {
      if (type.isNone()) {
        return Promise.reject(new errors.TargetMustReferToADefinedType('target ' + JSON.stringify(target.target_id) + ' does not refer to a defined type, target.type_id=' + JSON.stringify(target.type_id)));
      }
      return Promise.resolve(type.value());
    },

    /**
     * @param {Option<dataclasses.LogicalType>} logicalType logicalType
     * @return {Promise<dataclasses.LogicalType, errors.LogicalType_idMustReferToADefinedLogicalType>} resolve the promise if the invariant pass or yield a `LogicalType_idMustReferToADefinedLogicalType` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    LogicalType_idMustReferToADefinedLogicalType: function LogicalType_idMustReferToADefinedLogicalType(logicalType) {
      return logicalType.isNone() ? Promise.reject(new errors.LogicalType_idMustReferToADefinedLogicalType()) : Promise.resolve(logicalType);
    },
    /**
     * @param {Option<dataclasses.Target>} target target
     * @return {Promise<dataclasses.Target, errors.Target_idMustReferToADefinedTarget>} resolve the promise if the invariant pass or yield a `Target_idMustReferToADefinedTarget` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    Target_idMustReferToADefinedTarget: function Target_idMustReferToADefinedTarget(target) {
      return target.isNone() ? Promise.reject(new errors.Target_idMustReferToADefinedTarget()) : Promise.resolve(target);
    },
    /**
     * @param {Option<dataclasses.Operator>} operator
     * @return {Promise<dataclasses.Operator, errors.Operator_idMustReferToADefinedOperator>} resolve the promise if the invariant pass or yield a `Operator_idMustReferToADefinedOperator` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    Operator_idMustReferToADefinedOperator: function Operator_idMustReferToADefinedOperator(operator) {
      return operator.isNone() ? Promise.reject(new errors.Operator_idMustReferToADefinedOperator()) : Promise.resolve(operator);
    },
    /**
     * @param {dataclasses.CompoundPredicate} root root
     * @param {dataclasses.Predicate} predicateToRemove predicateToRemove
     * @return {Promise<predicateToRemove, errors.ForbiddenCannotRemoveRootCompoundPredicate>} resolve the promise if the invariant pass or yield a `ForbiddenCannotRemoveRootCompoundPredicate` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    RemovePredicateMustDifferFromRootPredicate: function RemovePredicateMustDifferFromRootPredicate(root, predicateToRemove) {
      return rules.predicateToRemoveIsRootPredicate(root, predicateToRemove) ? Promise.reject(new errors.ForbiddenCannotRemoveRootCompoundPredicate()) : Promise.resolve(predicateToRemove);
    },
    /**
     * @param {dataclasses.CompoundPredicate} root root
     * @param {dataclasses.Predicate} predicateToRemove
     * @param {dataclasses.CompoundPredicate} CompoundPredicate
     * @param {dataclasses.ComparisonPredicate} ComparisonPredicate
     * @return {Promise<undefined, errors.ForbiddenCannotRemoveLastComparisonPredicate>} resolve the promise if the invariant pass or yield a `RootPredicateMustBeACompoundPredicate` error otherwise
     * @memberof invariants
     * @since 1.0.0
     */
    RemovePredicateCannotBeTheLastComparisonPredicate: function RemovePredicateCannotBeTheLastComparisonPredicate(root, predicateToRemove, CompoundPredicate, ComparisonPredicate) {
      return ComparisonPredicate.is(predicateToRemove) && rules.predicateToRemoveIsTheLastComparisonPredicate(root, CompoundPredicate, ComparisonPredicate) ? Promise.reject(new errors.ForbiddenCannotRemoveLastComparisonPredicate()) : Promise.resolve();
    }
  };
};
},{"ramda":16}],582:[function(require,module,exports) {
module.exports = function $_type(name) {
  return {
    $_type: name
  };
};
},{}],516:[function(require,module,exports) {
var _require = require('ramda'),
    mergeAll = _require.mergeAll;

var $_type = require('./$_type');

/**
 * Target type definition
 * @typedef {Object} Target
 * @memberof dataclasses
 */

/**
 * Create a new target
 * @param {object} target
 * @param {string} target.target_id - unique id for this target
 * @param {string} target.label - label that will be displayed for this target
 * @param {string} target.type_id - the type_id name this target has
 * @return {Target} {@link dataclasses.Target}
 * @memberof dataclasses
 */
function Target(target) {
  // target MUST at least have the attributes bellow
  var target_id = target.target_id,
      label = target.label,
      type_id = target.type_id;

  return mergeAll([$_type('Target'), { target_id: target_id, label: label, type_id: type_id }, target]);
}

/**
 * A type operator
 * @typedef Operator
 * @memberof dataclasses
 */

/**
 * Create a new operator
 * @param {object} operator
 * @param {string} operator.operator_id - unique id for this operator
 * @param {string} operator.label - label that will be displayed for this operator
 * @return {Operator} {@link dataclasses.Operator}
 * @memberof dataclasses
 */
function Operator(operator) {
  // operator MUST at least have the attributes bellow
  var operator_id = operator.operator_id,
      label = operator.label;

  return mergeAll([$_type('Operator'), {
    operator_id: operator_id,
    label: label
  }, operator]);
}

/**
 * Defines a target type
 * @typedef Type
 * @memberof dataclasses
 */

/**
 * Create a new type
 * @param {Object} type
 * @param {string} type.type_id
 * @param {string[]} type.operator_ids
 * @return {Type} {@link dataclasses.Type}
 * @memberof dataclasses
 */
function Type(type) {
  // operator MUST at least have the attributes bellow
  var type_id = type.type_id,
      operator_ids = type.operator_ids;

  return mergeAll([$_type('Type'), {
    type_id: type_id,
    operator_ids: operator_ids
  }, type]);
}

/**
 * Create a new type logical type
 * Logical types or used in CompoundPredicates
 * @param {Object} logic The predicate logic
 * @param {string} type.logicalType_id
 * @param {string} type.label
 * @memberof dataclasses
 */
function LogicalType(logicalType) {
  // logicalType MUST at least have the attributes bellow
  var logicalType_id = logicalType.logicalType_id,
      label = logicalType.label;

  return mergeAll([$_type('LogicalType'), {
    logicalType_id: logicalType_id,
    label: label
  }, logicalType]);
}

module.exports = { Type: Type, Target: Target, Operator: Operator, LogicalType: LogicalType };
},{"ramda":16,"./$_type":582}],517:[function(require,module,exports) {
var _require = require('ramda'),
    merge = _require.merge;

var $_type = require('./$_type');

module.exports = function (_ref) {
  var invariants = _ref.invariants;

  /**
   * Abstract Predicate type, a Predicate is the union type of CompoundPredicate | ComparisonPredicate
   * @typedef {object} Predicate
   * @memberof dataclasses
   */

  /**
   * Abstract Predicate type, a Predicate is the union type of CompoundPredicate | ComparisonPredicate
   * @param {Function} type - Predicate subtype function constructor
   * @return {dataclasses.Predicate}
   * @memberof dataclasses
   */
  function Predicate(type) {
    return invariants.PredicateTypeMustBeValid(type.name, Predicate.Types).then(function () {
      return merge($_type(type.name), {
        /**
         * $canBeRemoved specify if the predicate can be removed or not from the Predicates tree
         * @type {Boolean}
         *  @memberof Predicate
         */
        $canBeRemoved: true
      });
    });
  }

  Predicate.Types = {
    ComparisonPredicate: 'ComparisonPredicate',
    CompoundPredicate: 'CompoundPredicate'
  };

  /**
   * Abstract Predicate type, a Predicate is the union type of CompoundPredicate | ComparisonPredicate
   * @typedef {object} ComparisonPredicate
   * @param {string} target - unique id for this target
   * @param {string} operator - label that will be displayed for this target
   * @param {string} arguments - the type_id name this target has
   * @memberof dataclasses
   */

  /**
   * A specialized predicate that you use to compare expressions.
   * @param  {dataclasses.Target} target
   * @param  {dataclasses.Operator} operator
   * @param  {Array<*>} args
   * @return {Promise<dataclasses.ComparisonPredicate>} yield a ComparisonPredicate or a rejected promise
   * @memberof dataclasses
   */
  function ComparisonPredicate(target, operator, args) {
    return Predicate(ComparisonPredicate).then(function (predicate) {
      return merge(predicate, {
        target: target,
        operator: operator,
        arguments: args
      });
    });
  }

  /**
   * Yield true if `predicate` is a ComparisonPredicate
   * @param  {dataclasses.Predicate}  predicate {@link dataclasses.Predicate}
   * @return {Boolean}
   * @memberof dataclasses
   */
  ComparisonPredicate.is = function (predicate) {
    return predicate && predicate.$_type === Predicate.Types.ComparisonPredicate;
  };

  /**
   * A specialized predicate that evaluates logical combinations of other predicates.
   * @param {dataclasses.LogicalType} logic The predicate logic
   * @param {Array<dataclasses.Predicate>} predicates predicates
   * @return {Promise<dataclasses.CompoundPredicate>} yield a {@link dataclasses.CompoundPredicate} or a {@link errors.CompoundPredicateMustHaveAtLeastOneSubPredicate} rejected promise
   * @memberof dataclasses
   */
  function CompoundPredicate(logic, predicates) {
    return invariants.CompoundPredicateMustHaveAtLeastOneSubPredicate(predicates, CompoundPredicate).then(function () {
      return Predicate(CompoundPredicate);
    }).then(function (predicate) {
      return merge(predicate, {
        logic: logic,
        predicates: predicates
      });
    });
  }

  /**
   * Reduce through the predicates tree
   * @param       {dataclasses.CompoundPredicate} compoundPredicate starter node
   * @param       {function} f accumulation function, f(acc, predicate, parents)
   * @param       {T} acc               accumulator
   * @param       {Array}  [parents=[]]      path to the node, array of parents
   * @return      {T} yield the accumulator
   * @memberof dataclasses
   */
  CompoundPredicate.reduce = function (compoundPredicate, f, acc) {
    var parents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    acc = f(acc, compoundPredicate, parents);
    return compoundPredicate.predicates.reduce(function (_acc, predicate, i) {
      var _parents = parents.concat([compoundPredicate, [predicate, i]]);
      return CompoundPredicate.is(predicate) ? CompoundPredicate.reduce(predicate, f, _acc, _parents) : f(_acc, predicate, _parents);
    }, acc);
  };

  /**
   * Walk through the predicates tree
   * @param       {dataclasses.CompoundPredicate} compoundPredicate starter node
   * @param       {Function} f(predicate) iterator function
   * @memberof dataclasses
   */
  CompoundPredicate.forEach = function (compoundPredicate, f) {
    CompoundPredicate.reduce(compoundPredicate, function (_, predicate, __) {
      f(predicate);
    }, null);
  };

  /**
   * Yield true if `predicate` is a CompoundPredicate
   * @param  {dataclasses.Predicate}  predicate
   * @return {Boolean}
   * @memberof dataclasses
   */
  CompoundPredicate.is = function (predicate) {
    return predicate && predicate.$_type === Predicate.Types.CompoundPredicate;
  };

  return {
    Predicate: Predicate,
    ComparisonPredicate: ComparisonPredicate,
    CompoundPredicate: CompoundPredicate
  };
};
},{"ramda":16,"./$_type":582}],18:[function(require,module,exports) {
var _require = require('ramda'),
    merge = _require.merge;

/**
 * Data classes
 * @namespace dataclasses
 * @since 1.0.0
 */


module.exports = function (errors) {
  return merge(require('./columns'), require('./predicates')(errors));
};
},{"ramda":16,"./columns":516,"./predicates":517}],22:[function(require,module,exports) {
exports.none = Object.create({
    value: function() {
        throw new Error('Called value on none');
    },
    isNone: function() {
        return true;
    },
    isSome: function() {
        return false;
    },
    map: function() {
        return exports.none;
    },
    flatMap: function() {
        return exports.none;
    },
    filter: function() {
        return exports.none;
    },
    toArray: function() {
        return [];
    },
    orElse: callOrReturn,
    valueOrElse: callOrReturn
});

function callOrReturn(value) {
    if (typeof(value) == "function") {
        return value();
    } else {
        return value;
    }
}

exports.some = function(value) {
    return new Some(value);
};

var Some = function(value) {
    this._value = value;
};

Some.prototype.value = function() {
    return this._value;
};

Some.prototype.isNone = function() {
    return false;
};

Some.prototype.isSome = function() {
    return true;
};

Some.prototype.map = function(func) {
    return new Some(func(this._value));
};

Some.prototype.flatMap = function(func) {
    return func(this._value);
};

Some.prototype.filter = function(predicate) {
    return predicate(this._value) ? this : exports.none;
};

Some.prototype.toArray = function() {
    return [this._value];
};

Some.prototype.orElse = function(value) {
    return this;
};

Some.prototype.valueOrElse = function(value) {
    return this._value;
};

exports.isOption = function(value) {
    return value === exports.none || value instanceof Some;
};

exports.fromNullable = function(value) {
    if (value == null) {
        return exports.none;
    }
    return new Some(value);
}

},{}],14:[function(require,module,exports) {
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Rules
 * @module core
 * @namespace core
 * @since 1.0.0
 * @note rules are 100% tested from PredicateCore.test.js
 */

var _require = require('ramda'),
    merge = _require.merge,
    find = _require.find,
    curry = _require.curry,
    prop = _require.prop,
    tap = _require.tap,
    pipe = _require.pipe,
    filter = _require.filter,
    map = _require.map,
    over = _require.over,
    lens = _require.lens,
    lensPath = _require.lensPath,
    takeLast = _require.takeLast,
    set = _require.set,
    differenceWith = _require.differenceWith,
    lensProp = _require.lensProp,
    insert = _require.insert;

var option = require('option');

function head(list) {
  return option.fromNullable(list[0]).value();
}

module.exports = function (_ref) {
  var dataclasses = _ref.dataclasses,
      invariants = _ref.invariants,
      errors = _ref.errors,
      rules = _ref.rules;
  var CompoundPredicate = dataclasses.CompoundPredicate,
      ComparisonPredicate = dataclasses.ComparisonPredicate,
      Predicate = dataclasses.Predicate,
      Target = dataclasses.Target,
      LogicalType = dataclasses.LogicalType;

  /**
   * Get a type by its type_id
   * @param  {array} types
   * @param  {string} type_id   type id name
   * @return {?Type}  a Type
   * @private
   * @since 1.0.0
   */

  var _getTypeById = function _getTypeById(types, type_id) {
    return option.fromNullable(find(function (type) {
      return type.type_id == type_id;
    }, types));
  };

  /**
   * Get a target by its target_id
   * @param  {array} targets
   * @param  {string} target_id target id name
   * @return {?dataclasses.Target}
   * @private
   * @since 1.0.0
   */
  var _getTargetById = function _getTargetById(targets, target_id) {
    return option.fromNullable(find(function (target) {
      return target.target_id == target_id;
    }, targets));
  };

  /**
   * Get a logical type by its logicalType_id
   * @param  {array} logicalTypes
   * @param  {string} logicalType_id logicalType id name
   * @return {?dataclasses.Target}
   * @private
   * @since 1.0.0
   */
  var _getLogicalTypeById = function _getLogicalTypeById(logicalTypes, logicalType_id) {
    return option.fromNullable(find(function (logicalType) {
      return logicalType.logicalType_id == logicalType_id;
    }, logicalTypes));
  };

  /**
   * _getOperatorsByIds
   * @param  {Object} columns
   * @param  {string[]} operator_ids
   * @return {Array<dataclasses.operator>}
   * @private
   * @since 1.0.0
   */
  var _getOperatorsByIds = curry(function (operators, operator_ids) {
    return pipe(filter(function (_ref2) {
      var operator_id = _ref2.operator_id;
      return operator_ids.includes(operator_id);
    }))(operators);
  });

  var _set$operatorsToType = curry(function (columns, type) {
    type.$operators = _getOperatorsByIds(columns.operators, type.operator_ids);
    return type;
  });

  var _set$typeToTarget = curry(function (columns, target) {
    var typeOption = _getTypeById(columns.types, target.type_id);
    return invariants.TargetMustReferToADefinedType(typeOption, target).then(function (type) {
      target.$type = type;
      return target;
    });
  });

  /**
   * Tap for Promise
   * @param  {Function} f
   * @return {Function}
   * @private
   */
  var _tapPromise = function _tapPromise(f) {
    return function (promise) {
      return promise.then(function (result) {
        f();
        return result;
      });
    };
  };

  /**
   * Run `fAfter()` (without any arguments) after `fBefore`, it will yield the promise yield from fBefore
   * @param  {Function} fBefore
   * @param  {Function} fAfter
   * @return {Promise} promise from fBefore
   * @private
   */
  var _afterPromise = function _afterPromise(fBefore, fAfter) {
    return pipe(fBefore, _tapPromise(fAfter));
  };

  // columns => Promise[columns]
  var initializeColumns = function initializeColumns(columns) {
    // at first I used lenses, but the code was way harder to read so it's better that way :)

    // wrap operators
    columns.operators = map(dataclasses.Operator, columns.operators);

    // wrap logicalTypes
    columns.logicalTypes = map(dataclasses.LogicalType, columns.logicalTypes);

    // wrap types and set `$operators` attribute on each type
    var wrapType = pipe(dataclasses.Type, _set$operatorsToType(columns));
    columns.types = map(wrapType, columns.types);

    // wrap targets and set `$type` attribut on each target
    var wrapTarget = pipe(dataclasses.Target, _set$typeToTarget(columns));
    return Promise.all(map(wrapTarget, columns.targets)).then(function (targets) {
      columns.targets = targets;
      return columns;
    });
  };

  /**
   * Create a new PredicateCore
   * @param       {?dataclasses.CompoundPredicate} [data=PredicateCore.defaults.options.getDefaultData]
   * @param       {Object} [columns=PredicateCore.defaults.columns]
   * @param       {Object} [options=PredicateCore.defaults.options]
   * @return {Promise<core.PredicateCoreAPI>}
   * @memberof core
   */
  function PredicateCore() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        data = _ref3.data,
        columns = _ref3.columns,
        options = _ref3.options;

    return initializeColumns(columns || PredicateCore.defaults.columns).then(function (_columns) {
      var _root = void 0;
      var _options = merge(PredicateCore.defaults.options, options);

      /**
       * Loop through the predicate tree and update flags (e.g. $canBeRemoved)
       * @private
       */
      function _apply$flags() {
        var canRemoveAnyPredicate = !rules.predicateToRemoveIsTheLastComparisonPredicate(_root, CompoundPredicate, ComparisonPredicate);

        CompoundPredicate.forEach(_root, function (predicate) {
          predicate.$canBeRemoved = canRemoveAnyPredicate && !rules.predicateToRemoveIsRootPredicate(_root, predicate);
        });
      }

      /**
       * Set PredicateCore data
       * @param {dataclasses.CompoundPredicate} root CompoundPredicate
       * @return {Promise<undefined, errors.RootPredicateMustBeACompoundPredicate>} resolved promise yield nothing, rejected promise yield RootPredicateMustBeACompoundPredicate error
       * @since 1.0.0
       * @memberof core.api
       */
      function setData(root) {
        return invariants.RootPredicateMustBeACompoundPredicate(root, CompoundPredicate).then(function () {
          _root = root;
        });
      }

      /**
       * Add a ComparisonPredicate or CompoundPredicate
       * @param  {Object} option
       * @param  {string} options.type what type of Predicate to add
       * @param  {string} [options.how=after] should we insert it before, after or instead of? (currently only after is supported)
       * @param  {dataclasses.Predicate} options.where current element
       * @return {Promise<dataclasses.Predicate>} inserted predicate
       * @since 1.0.0
       * @memberof core.api
       */
      function add(_ref4) {
        var where = _ref4.where,
            _ref4$how = _ref4.how,
            how = _ref4$how === undefined ? 'after' : _ref4$how,
            type = _ref4.type;

        // currently only after is supported
        return Promise.resolve().then(function () {
          return invariants.AddOnlySupportsAfter(how);
        }).then(function () {
          return invariants.PredicateTypeMustBeValid(type, Predicate.Types);
        })
        // generate the Predicates
        .then(function () {
          return _options['getDefault' + type](_columns, _options);
        })
        // then add it
        .then(function (predicate) {
          var isComparisonPredicate = ComparisonPredicate.is(where);

          if (isComparisonPredicate || CompoundPredicate.is(where)) {
            if (isComparisonPredicate) {
              // it's a comparisonpredicate
              // first find predicates array that contains the element
              var path = _find(where);
              // we are starting from a ComparisonPredicate that always live inside a CompoundPredicate.predicates array

              var _takeLast = takeLast(2, path),
                  _takeLast2 = _slicedToArray(_takeLast, 2),
                  compoundpredicate = _takeLast2[0],
                  _takeLast2$ = _slicedToArray(_takeLast2[1], 2),
                  _ = _takeLast2$[0],
                  index = _takeLast2$[1];

              compoundpredicate.predicates = insert(index + 1, predicate, compoundpredicate.predicates);
            } else {
              // it's a compoundpredicate
              // we want to add a CompoundPredicate after a compound predicate
              // so we need to add it as its first .predicates entry
              where.predicates.unshift(predicate);
            }

            return predicate;
          }

          return Promise.reject(new errors.CannotAddSomethingElseThanACompoundPredicateOrAComparisonPredicate());
        });
      }

      /**
       * Remove a ComparisonPredicate or CompoundPredicate
       * @param  {(dataclasses.ComparisonPredicate|dataclasses.CompoundPredicate)} predicate
       * @return {Promise<dataclasses.Predicate>} yield the removed predicate, will reject the promise if remove was called with the root CompoundPredicate or the last ComparisonPredicate of the root CompoundPredicate
       * @since 1.0.0
       * @memberof core.api
       */
      function remove(predicate) {
        return Promise.resolve().then(function () {
          return invariants.RemovePredicateMustDifferFromRootPredicate(_root, predicate);
        }).then(function () {
          return invariants.RemovePredicateCannotBeTheLastComparisonPredicate(_root, predicate, CompoundPredicate, ComparisonPredicate);
        }).then(function () {
          if (CompoundPredicate.is(predicate) || ComparisonPredicate.is(predicate)) {
            var path = _find(predicate);
            // we are starting from a ComparisonPredicate that always live
            // inside a CompoundPredicate.predicates array

            var _takeLast3 = takeLast(2, path),
                _takeLast4 = _slicedToArray(_takeLast3, 2),
                parentCompoundpredicate = _takeLast4[0],
                _takeLast4$ = _slicedToArray(_takeLast4[1], 2),
                _ = _takeLast4$[0],
                index = _takeLast4$[1];

            parentCompoundpredicate.predicates.splice(index, 1);

            if (parentCompoundpredicate.predicates.length === 0) {
              // if there are not any more predicates
              // inside the parentCompoundpredicate, we should also remove it
              return remove(parentCompoundpredicate);
            }

            return predicate;
          }

          return Promise.reject(new errors.CannotRemoveSomethingElseThanACompoundPredicateOrAComparisonPredicate());
        });
      }

      /**
       * Change a CompoundPredicate logical
       * @param {dataclasses.CompoundPredicate} predicate
       * @param {string} newLogicalType_id
       * @return {Promise<undefined, errors.PredicateMustBeACompoundPredicate>} yield nothing if everything went right, otherwise yield a reject promise with the PredicateMustBeACompoundPredicate error
       * @since 1.0.0
       * @memberof core.api
       */
      function setPredicateLogicalType_id(predicate, newLogicalType_id) {
        return invariants.PredicateMustBeACompoundPredicate(predicate, CompoundPredicate).then(function () {
          // first change the logical type
          return _getLogicalTypeById(_columns.logicalTypes, newLogicalType_id);
        }).then(function (logicalTypeOption) {
          return invariants.LogicalType_idMustReferToADefinedLogicalType(logicalTypeOption);
        }).then(function (logicalTypeOption) {
          predicate.logic = logicalTypeOption.value(); // safe
        });
      }

      /**
       * Change a predicate's target
       * @param {dataclasses.ComparisonPredicate} predicate
       * @param {string} newTarget_id
       * @return {Promise} yield nothing if everything went right, otherwise yield a reject promise with the PredicateMustBeAComparisonPredicate error
       * @since 1.0.0
       * @memberof core.api
       */
      function setPredicateTarget_id(predicate, newTarget_id) {
        return invariants.PredicateMustBeAComparisonPredicate(predicate, ComparisonPredicate).then(function () {
          // first change the target
          return _getTargetById(_columns.targets, newTarget_id);
        }).then(function (targetOption) {
          return invariants.Target_idMustReferToADefinedTarget(targetOption);
        }).then(function (targetOption) {
          predicate.target = targetOption.value(); // safe

          // then change the operator to the first operator for this target
          return setPredicateOperator_id(predicate, head(predicate.target.$type.$operators).operator_id);
        });
      }

      /**
       * Change a predicate's operator
       * @param {dataclasses.ComparisonPredicate} predicate
       * @param {string} newTarget_id
       * @return {Promise<undefined, errors.PredicateMustBeAComparisonPredicate>} yield nothing if everything went right, otherwise yield a reject promise with the PredicateMustBeAComparisonPredicate error
       * @since 1.0.0
       * @memberof core.api
       */
      function setPredicateOperator_id(predicate, newOperator_id) {
        return Promise.resolve()
        // find operator
        .then(function () {
          return option.fromNullable(predicate.target.$type.$operators.find(function (operator) {
            return operator.operator_id === newOperator_id;
          }));
        }).then(function (operatorOption) {
          return invariants.Operator_idMustReferToADefinedOperator(operatorOption);
        })
        // change the operator
        .then(function (operatorOption) {
          predicate.operator = operatorOption.value(); // safe

          // then reset arguments to array
          predicate.arguments = [];
        });
      }

      /**
       * Compute the JSON pointer path the element
       * @param  {Object} element (http://jsonpatch.com/)
       * @return {?Array} null if not found
       * @readonly
       * @since 1.0.0
       */
      function _find(element) {
        return CompoundPredicate.reduce(_root, function (acc, predicate, parents) {
          return element === predicate ? parents : acc;
        }, null);
      }

      // get data for initialization
      return (data ? Promise.resolve(data) : _options.getDefaultData(_columns, _options)).
      // setup PredicateCore data
      then(_afterPromise(setData, _apply$flags))
      // expose public API
      .then(function () {
        /**
         * ui-predicate core public API
         * @typedef {object} PredicateCoreAPI
         * @namespace core.api
         */
        return {
          setData: _afterPromise(setData, _apply$flags),
          add: _afterPromise(add, _apply$flags),
          remove: _afterPromise(remove, _apply$flags),
          setPredicateTarget_id: _afterPromise(setPredicateTarget_id, _apply$flags),
          setPredicateOperator_id: _afterPromise(setPredicateOperator_id, _apply$flags),
          setPredicateLogicalType_id: _afterPromise(setPredicateLogicalType_id, _apply$flags),

          /**
           * Get root CompoundPredicate
           * @return {dataclasses.CompoundPredicate}
           * @memberof core.api
           */
          get root() {
            return _root;
          },

          toJSON: function toJSON() {
            return _root;
          },


          // used for testing
          get columns() {
            return _columns;
          },

          // used for testing
          get options() {
            return _options;
          }
        };
      });
    });
  }

  /**
   * Defaults configuration of PredicateCore
   * @type {Object}
   * @namespace core.defaults
   */
  PredicateCore.defaults = {
    options: {
      /**
       * When data is not set at construction time PredicateCore default behavior will be to use the first target and its first operator with empty argument
       * @param  {Object} dataclasses every necessary data class
       * @param  {Object} columns every necessary data class
       * @param  {Object} options PredicateCore available options
       * @return {Promise<dataclasses.CompoundPredicate>}  root CompoundPredicate
       * @since 1.0.0
       * @memberof core.defaults
       */
      getDefaultData: function getDefaultData(columns, options) {
        return options.getDefaultComparisonPredicate(columns, options).then(function (comparisonPredicate) {
          return options.getDefaultCompoundPredicate(columns, options, [comparisonPredicate]);
        });
      },


      /**
       * Default compount predicate to use
       *
       * This function is called whenever a new CompoundPredicate is added to the UIPredicate
       * @param  {Array<dataclasses.Predicate>} predicates
       * @param  {Object} columns specified columns
       * @param  {Object} options PredicateCore available options
       * @return {Promise<dataclasses.CompoundPredicate>} a CompoundPredicate
       * @since 1.0.0
       * @memberof core.defaults
       */
      getDefaultCompoundPredicate: function getDefaultCompoundPredicate(columns, options, predicates) {
        return (!Array.isArray(predicates) || predicates.length === 0 ? options.getDefaultComparisonPredicate(columns, options).then(function (comparisonPredicate) {
          return [comparisonPredicate];
        }) : Promise.resolve(predicates)).then(function (predicates) {
          return options.getDefaultLogicalType(predicates, columns, options).then(function (logicalType) {
            return CompoundPredicate(logicalType, predicates);
          });
        });
      },


      /**
       * Default comparison predicate to use
       *
       * This function is called whenever a new ComparisonPredicate is added to the UIPredicate
       * @param  {Object} columns specified columns
       * @param  {Object} [options=PredicateCore.defaults.options] PredicateCore available options
       * @return {Promise<dataclasses.ComparisonPredicate>} a Comparison
       * @since 1.0.0
       * @memberof core.defaults
       */
      getDefaultComparisonPredicate: function getDefaultComparisonPredicate(columns, options) {
        var firstTarget = head(columns.targets);
        return ComparisonPredicate(firstTarget, head(firstTarget.$type.$operators), []);
      },


      /**
       * Default logical type to use when a new comparison predicate is created
       *
       * This function is called whenever a new ComparisonPredicate is added to the UIPredicate
       * @param  {Array<dataclasses.Predicate>} predicates specified columns
       * @param  {Object} columns specified columns
       * @param  {Object} [options=PredicateCore.defaults.options] PredicateCore available options
       * @return {Promise<dataclasses.LogicalType>} a logical type
       * @since 1.0.0
       * @memberof core.defaults
       */
      getDefaultLogicalType: function getDefaultLogicalType(predicates, columns, options) {
        return Promise.resolve(head(columns.logicalTypes));
      }
    },
    columns: {
      // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
      operators: [{
        operator_id: 'is',
        label: 'Est'
      }, {
        operator_id: 'contains',
        label: 'Contient'
      }, {
        operator_id: 'isLowerThan',
        label: '<'
      }, {
        operator_id: 'isEqualTo',
        label: '='
      }, {
        operator_id: 'isHigherThan',
        label: '>'
      }, {
        operator_id: 'isBetween',
        label: 'est compris entre'
      }],
      types: [{
        type_id: 'int',
        operator_ids: ['isLowerThan', 'isEqualTo', 'isHigherThan']
      }, {
        type_id: 'string',
        operator_ids: ['is', 'contains']
      }, {
        type_id: 'datetime',
        operator_ids: ['is', 'isBetween']
      }],
      targets: [{
        target_id: 'article.title',
        label: 'Titre article',
        type_id: 'string'
      }, {
        target_id: 'videoCount',
        label: 'Nombre de vidéo',
        type_id: 'int'
      }, {
        target_id: 'publishingAt',
        label: 'Date de publication',
        type_id: 'datetime'
      }],
      logicalTypes: [{
        logicalType_id: 'any',
        label: 'Any'
      }, {
        logicalType_id: 'all',
        label: 'All'
      }, {
        logicalType_id: 'none',
        label: 'None'
      }]
    }
  };

  return PredicateCore;
};
},{"ramda":16,"option":22}],6:[function(require,module,exports) {
var _require = require('ramda'),
    merge = _require.merge;

var errors = require('./errors');

var rules = require('./rules');
var invariants = require('./invariants')({ errors: errors, rules: rules });
var dataclasses = require('./dataclasses')({ invariants: invariants });

var PredicateCore = require('./PredicateCore')({
  dataclasses: dataclasses,
  invariants: invariants,
  errors: errors,
  rules: rules
});

module.exports = { PredicateCore: PredicateCore, errors: errors, invariants: invariants, dataclasses: dataclasses };
},{"ramda":16,"./errors":8,"./rules":10,"./invariants":12,"./dataclasses":18,"./PredicateCore":14}],4:[function(require,module,exports) {
// const PredicateCore = require('ui-predicate-core');
var PredicateCore = require('..');

PredicateCore({
  // data:{},
  // columns:{},
  options: {
    // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
    operators: [{
      operator_id: 'is',
      label: 'Est',
      ploplop: [1, 2, 3]
    }, {
      operator_id: 'contains',
      label: 'Contient'
    }, {
      operator_id: 'isLowerThan',
      label: '<'
    }, {
      operator_id: 'isEqualTo',
      label: '='
    }, {
      operator_id: 'isHigherThan',
      label: '>'
    }, {
      operator_id: 'isBetween',
      label: 'est compris entre'
    }],
    types: [{
      type_id: 'int',
      operator_ids: ['isLowerThan', 'isEqualTo', 'isHigherThan']
    }, {
      type_id: 'string',
      operator_ids: ['is', 'contains']
    }, {
      type_id: 'datetime',
      operator_ids: ['is', 'isBetween']
    }],
    targets: [{
      target_id: 'article.title',
      label: 'Titre article',
      type_id: 'string'
    }, {
      target_id: 'article.videoCount',
      label: 'Nombre de vidéos',
      type_id: 'int'
    }, {
      target_id: 'article.publishingAt',
      label: 'Date publication',
      type_id: 'datetime'
    }],
    logicalTypes: [{
      logicalType_id: 'any',
      label: 'Any'
    }, {
      logicalType_id: 'all',
      label: 'All'
    }, {
      logicalType_id: 'none',
      label: 'None'
    }]
  }
}).then(function (core) {
  console.log('🎉 You can play with `core` global variable');
});
},{"..":6}]},{},[4])
//# sourceMappingURL=examples.6322cca3.map