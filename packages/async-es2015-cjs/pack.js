"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pack;
function pack(promise) {
  return promise.then(result => [null, result]).catch(err => [err]);
}
module.exports = exports["default"];