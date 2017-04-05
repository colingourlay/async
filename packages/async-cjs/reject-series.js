'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _filterSeries = require('./filter-series');

var _filterSeries2 = _interopRequireDefault(_filterSeries);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function rejectSeries(items, fn) {
  return (0, _filterSeries2.default)(items, (0, _utils.not)(fn));
};

module.exports = exports['default'];