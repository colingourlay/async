"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throws;
function throws(packed) {
  if (packed[0]) {
    throw packed[0];
  }

  return packed;
}
module.exports = exports["default"];