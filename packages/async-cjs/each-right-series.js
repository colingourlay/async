'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eachSeries = require('./each-series');

var _eachSeries2 = _interopRequireDefault(_eachSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function eachRightSeries(items, fn) {
  await (0, _eachSeries2.default)([].concat(items).reverse(), fn);
};

module.exports = exports['default'];