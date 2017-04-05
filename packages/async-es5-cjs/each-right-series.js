'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eachSeries = require('./each-series');

var _eachSeries2 = _interopRequireDefault(_eachSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _eachSeries2.default)([].concat(items).reverse(), fn);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function eachRightSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return eachRightSeries;
}();

module.exports = exports['default'];