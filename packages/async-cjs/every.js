'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function every(items, fn) {
  return (await (0, _filter2.default)(items, fn)).length === items.length;
};

module.exports = exports['default'];