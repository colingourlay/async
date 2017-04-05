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

var reduceSeries = (() => {
  var _ref = asyncToGenerator(function* (items, fn, acc) {
    let index = 0;
    const len = items.length;

    if (typeof acc === 'undefined') {
      acc = items[index++];
    }

    for (; index < len; index++) {
      acc = yield fn(acc, items[index], index, items);
    }

    return acc;
  });

  function reduceSeries(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return reduceSeries;
})();

var mapSeries = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return reduceSeries(items, function (acc, item, index, items) {
      acc[index] = fn(item, index, items);

      return acc;
    });
  });

  function mapSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return mapSeries;
})();

function invoke(fn, ...args) {
  return fn(args);
}

function not(fn) {
  return (...args) => !fn(...args);
}

function proxy(items) {
  return (_, key) => items[key];
}

var filterSeries = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return items.filter(proxy((yield mapSeries(items, fn))));
  });

  function filterSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return filterSeries;
})();

var anySeries = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return (yield filterSeries(items, fn)).length > 0;
  });

  function anySeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return anySeries;
})();

var reduce = (() => {
  var _ref = asyncToGenerator(function* (items, fn, acc) {
    if (typeof acc === 'undefined' || acc === null || typeof acc !== 'object') {
      return acc;
    }

    yield Promise.all(items.map(function (item, index) {
      return fn(acc, item, index, items);
    }, acc));

    return acc;
  });

  function reduce(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return reduce;
})();

var map = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return items.map(proxy((yield reduce(items, function (acc, item, index, items) {
      acc[index] = fn(item, index, items);

      return acc;
    }, {}))));
  });

  function map(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return map;
})();

var filter = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return items.filter(proxy((yield map(items, fn))));
  });

  function filter(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return filter;
})();

var any = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return (yield filter(items, fn)).length > 0;
  });

  function any(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return any;
})();

var eachSeries = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    yield mapSeries(items, fn);
  });

  function eachSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return eachSeries;
})();

var eachRightSeries = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    yield eachSeries([].concat(items).reverse(), fn);
  });

  function eachRightSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return eachRightSeries;
})();

var each = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    yield map(items, fn);
  });

  function each(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return each;
})();

var eachRight = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    yield each([].concat(items).reverse(), fn);
  });

  function eachRight(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return eachRight;
})();

var everySeries = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return (yield filterSeries(items, fn)).length === items.length;
  });

  function everySeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return everySeries;
})();

var every = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return (yield filter(items, fn)).length === items.length;
  });

  function every(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return every;
})();

function pack(promise) {
  return promise.then(result => [null, result]).catch(err => [err]);
}

function packs(fn) {
  return (...args) => pack(fn(...args));
}

var parallel = (() => {
  var _ref = asyncToGenerator(function* (fns) {
    return map(fns, invoke);
  });

  function parallel(_x) {
    return _ref.apply(this, arguments);
  }

  return parallel;
})();

var reduceRightSeries = (() => {
  var _ref = asyncToGenerator(function* (items, fn, acc) {
    return reduceSeries([].concat(items).reverse(), fn, acc);
  });

  function reduceRightSeries(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return reduceRightSeries;
})();

var reduceRight = (() => {
  var _ref = asyncToGenerator(function* (items, fn, acc) {
    return reduce([].concat(items).reverse(), fn, acc);
  });

  function reduceRight(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return reduceRight;
})();

var rejectSeries = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return filterSeries(items, not(fn));
  });

  function rejectSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return rejectSeries;
})();

var reject = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return filter(items, not(fn));
  });

  function reject(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return reject;
})();

var sequence = (() => {
  var _ref = asyncToGenerator(function* (fns, input) {
    return reduceSeries(fns, function (acc, fn) {
      return fn(acc);
    }, input);
  });

  function sequence(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return sequence;
})();

var series = (() => {
  var _ref = asyncToGenerator(function* (fns) {
    return mapSeries(fns, invoke);
  });

  function series(_x) {
    return _ref.apply(this, arguments);
  }

  return series;
})();

var someSeries = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return (yield filterSeries(items, fn)).length > 0;
  });

  function someSeries(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return someSeries;
})();

var some = (() => {
  var _ref = asyncToGenerator(function* (items, fn) {
    return (yield filter(items, fn)).length > 0;
  });

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

export { anySeries, any, eachRightSeries, eachRight, eachSeries, each, everySeries, every, filterSeries, filter, mapSeries, map, pack, packs, parallel, reduceRightSeries, reduceRight, reduceSeries, reduce, rejectSeries, reject, sequence, series, someSeries, some, throws, unpack };
