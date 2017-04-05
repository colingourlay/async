'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _filterSeries = require('./filter-series');

var _filterSeries2 = _interopRequireDefault(_filterSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (items, fn) {
    return (yield (0, _filterSeries2.default)(items, fn)).length > 0;
  });

  function anySeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return anySeries;
})();

module.exports = exports['default'];