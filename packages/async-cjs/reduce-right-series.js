'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduceSeries = require('./reduce-series');

var _reduceSeries2 = _interopRequireDefault(_reduceSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function reduceRightSeries(items, fn, acc) {
  return (0, _reduceSeries2.default)([].concat(items).reverse(), fn, acc);
};

module.exports = exports['default'];