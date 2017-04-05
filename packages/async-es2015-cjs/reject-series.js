'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _filterSeries = require('./filter-series');

var _filterSeries2 = _interopRequireDefault(_filterSeries);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (items, fn) {
    return (0, _filterSeries2.default)(items, (0, _utils.not)(fn));
  });

  function rejectSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return rejectSeries;
})();

module.exports = exports['default'];