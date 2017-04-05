'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = packs;

var _pack = require('./pack');

var _pack2 = _interopRequireDefault(_pack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function packs(fn) {
  return (...args) => (0, _pack2.default)(fn(...args));
}
module.exports = exports['default'];