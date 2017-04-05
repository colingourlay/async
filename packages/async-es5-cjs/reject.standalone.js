'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









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

var reduce = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn, acc) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof acc === 'undefined' || acc === null || (typeof acc === 'undefined' ? 'undefined' : _typeof(acc)) !== 'object')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', acc);

          case 2:
            _context.next = 4;
            return Promise.all(items.map(function (item, index) {
              return fn(acc, item, index, items);
            }, acc));

          case 4:
            return _context.abrupt('return', acc);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function reduce(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return reduce;
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

var map = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = items;
            _context.t1 = proxy;
            _context.next = 4;
            return reduce(items, function (acc, item, index, items) {
              acc[index] = fn(item, index, items);

              return acc;
            }, {});

          case 4:
            _context.t2 = _context.sent;
            _context.t3 = (0, _context.t1)(_context.t2);
            return _context.abrupt('return', _context.t0.map.call(_context.t0, _context.t3));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function map(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return map;
})();

var filter = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = items;
            _context.t1 = proxy;
            _context.next = 4;
            return map(items, fn);

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

  function filter(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return filter;
})();

var reject = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', filter(items, not(fn)));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function reject(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return reject;
})();

module.exports = reject;
