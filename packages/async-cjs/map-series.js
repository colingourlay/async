'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduceSeries = require('./reduce-series');

var _reduceSeries2 = _interopRequireDefault(_reduceSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function mapSeries(items, fn) {
  return (0, _reduceSeries2.default)(items, (acc, item, index, items) => {
    acc[index] = fn(item, index, items);

    return acc;
  });
};

module.exports = exports['default'];