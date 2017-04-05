'use strict';

function pack(promise) {
  return promise.then(function (result) {
    return [null, result];
  }).catch(function (err) {
    return [err];
  });
}

function packs(fn) {
  return function () {
    return pack(fn.apply(undefined, arguments));
  };
}

module.exports = packs;
