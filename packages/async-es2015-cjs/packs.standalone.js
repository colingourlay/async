'use strict';

function pack(promise) {
  return promise.then(result => [null, result]).catch(err => [err]);
}

function packs(fn) {
  return (...args) => pack(fn(...args));
}

module.exports = packs;
