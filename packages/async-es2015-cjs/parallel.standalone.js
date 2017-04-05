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

function invoke(fn, ...args) {
  return fn(args);
}



function proxy(items) {
  return (_, key) => items[key];
}

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

var parallel = (() => {
  var _ref = asyncToGenerator(function* (fns) {
    return map(fns, invoke);
  });

  function parallel(_x) {
    return _ref.apply(this, arguments);
  }

  return parallel;
})();

module.exports = parallel;
