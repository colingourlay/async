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

var reduceRight = (() => {
  var _ref = asyncToGenerator(function* (items, fn, acc) {
    return reduce([].concat(items).reverse(), fn, acc);
  });

  function reduceRight(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return reduceRight;
})();

export default reduceRight;
