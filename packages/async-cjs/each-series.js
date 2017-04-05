'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapSeries = require('./map-series');

var _mapSeries2 = _interopRequireDefault(_mapSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function eachSeries(items, fn) {
  await (0, _mapSeries2.default)(items, fn);
};

module.exports = exports['default'];