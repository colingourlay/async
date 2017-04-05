'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduceSeries = require('./reduce-series');

var _reduceSeries2 = _interopRequireDefault(_reduceSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(items, fn) {
    var reducer = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(acc, item, index, items) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fn(item, index, items);

              case 2:
                acc[index] = _context.sent;
                return _context.abrupt('return', acc);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function reducer(_x3, _x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }();

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', (0, _reduceSeries2.default)(items, reducer, []));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function mapSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return mapSeries;
}();

module.exports = exports['default'];