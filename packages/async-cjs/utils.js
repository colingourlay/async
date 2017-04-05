"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invoke = invoke;
exports.not = not;
exports.proxy = proxy;
function invoke(fn, ...args) {
  return fn(args);
}

function not(fn) {
  return async function (...args) {
    return !(await fn(...args));
  };
}

function proxy(items) {
  return (_, key) => items[key];
}