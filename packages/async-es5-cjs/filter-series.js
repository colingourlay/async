'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapSeries = require('./map-series');

var _mapSeries2 = _interopRequireDefault(_mapSeries);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = items;
            _context.t1 = _utils.proxy;
            _context.next = 4;
            return (0, _mapSeries2.default)(items, fn);

          case 4:
            _context.t2 = _context.sent;
            _context.t3 = (0, _context.t1)(_context.t2);
            return _context.abrupt('return', _context.t0.filter.call(_context.t0, _context.t3));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function filterSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return filterSeries;
}();

module.exports = exports['default'];