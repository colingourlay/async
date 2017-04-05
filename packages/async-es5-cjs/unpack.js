'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unpack;

var _throws = require('./throws');

var _throws2 = _interopRequireDefault(_throws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unpack(packed, ignoreErrors) {
  return ignoreErrors ? packed[1] : (0, _throws2.default)(packed)[1];
}
module.exports = exports['default'];