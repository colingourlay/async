"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pack;
function pack(promise) {
  return promise.then(function (result) {
    return [null, result];
  }).catch(function (err) {
    return [err];
  });
}
module.exports = exports["default"];