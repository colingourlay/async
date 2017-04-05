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

module.exports = anySeries;
