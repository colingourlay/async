'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee2(items, fn) {
    var reducer = function () {
      var _ref2 = asyncToGenerator(regeneratorRuntime.mark(function _callee(acc, item, index, items) {
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
            return _context2.abrupt('return', reduceSeries(items, reducer, []));

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
})();

var eachSeries = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return mapSeries(items, fn);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function eachSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return eachSeries;
})();

var eachRightSeries = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return eachSeries([].concat(items).reverse(), fn);

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
})();

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

function invoke(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return fn(args);
}

function not(fn) {
  return asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fn.apply(undefined, _args);

          case 2:
            return _context.abrupt("return", !_context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
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

var each = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return map(items, fn);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function each(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return each;
})();

var eachRight = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return each([].concat(items).reverse(), fn);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function eachRight(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return eachRight;
})();

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

var everySeries = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return filterSeries(items, fn);

          case 2:
            _context.t0 = _context.sent.length;
            _context.t1 = items.length;
            return _context.abrupt('return', _context.t0 === _context.t1);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function everySeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return everySeries;
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

var every = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return filter(items, fn);

          case 2:
            _context.t0 = _context.sent.length;
            _context.t1 = items.length;
            return _context.abrupt('return', _context.t0 === _context.t1);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function every(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return every;
})();

function pack(promise) {
  return promise.then(function (result) {
    return [null, result];
  }).catch(function (err) {
    return [err];
  });
}

function packs(fn) {
  return function () {
    return pack(fn.apply(undefined, arguments));
  };
}

var parallel = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(fns) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', map(fns, invoke));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function parallel(_x) {
    return _ref.apply(this, arguments);
  }

  return parallel;
})();

var reduceRightSeries = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn, acc) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', reduceSeries([].concat(items).reverse(), fn, acc));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function reduceRightSeries(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return reduceRightSeries;
})();

var reduceRight = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn, acc) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', reduce([].concat(items).reverse(), fn, acc));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function reduceRight(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return reduceRight;
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

var sequence = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(fns, input) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', reduceSeries(fns, function (acc, fn) {
              return fn(acc);
            }, input));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function sequence(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return sequence;
})();

var series = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(fns) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', mapSeries(fns, invoke));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function series(_x) {
    return _ref.apply(this, arguments);
  }

  return series;
})();

var someSeries = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return filterSeries(items, fn);

          case 2:
            _context.t0 = _context.sent.length;
            return _context.abrupt('return', _context.t0 > 0);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function someSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return someSeries;
})();

var some = (function () {
  var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(items, fn) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return filter(items, fn);

          case 2:
            _context.t0 = _context.sent.length;
            return _context.abrupt('return', _context.t0 > 0);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function some(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return some;
})();

function throws(packed) {
  if (packed[0]) {
    throw packed[0];
  }

  return packed;
}

function unpack(packed, ignoreErrors) {
  return ignoreErrors ? packed[1] : throws(packed)[1];
}

exports.eachRightSeries = eachRightSeries;
exports.eachRight = eachRight;
exports.eachSeries = eachSeries;
exports.each = each;
exports.everySeries = everySeries;
exports.every = every;
exports.filterSeries = filterSeries;
exports.filter = filter;
exports.mapSeries = mapSeries;
exports.map = map;
exports.pack = pack;
exports.packs = packs;
exports.parallel = parallel;
exports.reduceRightSeries = reduceRightSeries;
exports.reduceRight = reduceRight;
exports.reduceSeries = reduceSeries;
exports.reduce = reduce;
exports.rejectSeries = rejectSeries;
exports.reject = reject;
exports.sequence = sequence;
exports.series = series;
exports.someSeries = someSeries;
exports.some = some;
exports.throws = throws;
exports.unpack = unpack;
