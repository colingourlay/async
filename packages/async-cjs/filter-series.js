'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapSeries = require('./map-series');

var _mapSeries2 = _interopRequireDefault(_mapSeries);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function filterSeries(items, fn) {
  return items.filter((0, _utils.proxy)((await (0, _mapSeries2.default)(items, fn))));
};

module.exports = exports['default'];