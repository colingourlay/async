'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _filterSeries = require('./filter-series');

var _filterSeries2 = _interopRequireDefault(_filterSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function someSeries(items, fn) {
  return (await (0, _filterSeries2.default)(items, fn)).length > 0;
};

module.exports = exports['default'];