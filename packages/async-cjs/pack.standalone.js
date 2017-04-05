'use strict';

function pack(promise) {
  return promise
  .then(result => [null, result])
  .catch(err => [err]);
}

module.exports = pack;
