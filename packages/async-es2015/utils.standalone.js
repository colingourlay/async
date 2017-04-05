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

function invoke(fn, ...args) {
  return fn(args);
}

function not(fn) {
  return (() => {
    var _ref = asyncToGenerator(function* (...args) {
      return !(yield fn(...args));
    });

    return function () {
      return _ref.apply(this, arguments);
    };
  })();
}

function proxy(items) {
  return (_, key) => items[key];
}

export { invoke, not, proxy };
