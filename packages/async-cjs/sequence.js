'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduceSeries = require('./reduce-series');

var _reduceSeries2 = _interopRequireDefault(_reduceSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function sequence(fns, input) {
  return (0, _reduceSeries2.default)(fns, (acc, fn) => {
    return fn(acc);
  }, input);
};

module.exports = exports['default'];