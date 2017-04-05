'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function invoke(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return fn(args);
}

function not(fn) {
  return function () {
    return !fn.apply(undefined, arguments);
  };
}

function proxy(items) {
  return function (_, key) {
    return items[key];
  };
}

exports.invoke = invoke;
exports.not = not;
exports.proxy = proxy;
