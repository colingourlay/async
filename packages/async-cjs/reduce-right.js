'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function reduceRight(items, fn, acc) {
  return (0, _reduce2.default)([].concat(items).reverse(), fn, acc);
};

module.exports = exports['default'];