'use strict';

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var reduceSeries = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn, acc) {
    var index, len;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            index = 0;
            len = items.length;


            if (typeof acc === 'undefined') {
              acc = items[index++];
            }

          case 3:
            if (!(index < len)) {
              _context.next = 10;
              break;
            }

            _context.next = 6;
            return fn(acc, items[index], index, items);

          case 6:
            acc = _context.sent;

          case 7:
            index++;
            _context.next = 3;
            break;

          case 10:
            return _context.abrupt('return', acc);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function reduceSeries(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return reduceSeries;
})();

var mapSeries = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', reduceSeries(items, function (acc, item, index, items) {
              acc[index] = fn(item, index, items);

              return acc;
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function mapSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return mapSeries;
})();

function not(fn) {
  return function () {
    return !fn.apply(undefined, arguments);
  };
}

function proxy(items) {
  return function (_, key) {
    return items[key];
  };
}

var filterSeries = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = items;
            _context.t1 = proxy;
            _context.next = 4;
            return mapSeries(items, fn);

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
})();

var rejectSeries = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', filterSeries(items, not(fn)));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function rejectSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return rejectSeries;
})();

module.exports = rejectSeries;
