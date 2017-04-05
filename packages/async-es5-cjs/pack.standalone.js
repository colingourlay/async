'use strict';

function pack(promise) {
  return promise.then(function (result) {
    return [null, result];
  }).catch(function (err) {
    return [err];
  });
}

module.exports = pack;
