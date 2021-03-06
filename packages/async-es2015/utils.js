function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

export function invoke(fn, ...args) {
  return fn(args);
}

export function not(fn) {
  return (() => {
    var _ref = _asyncToGenerator(function* (...args) {
      return !(yield fn(...args));
    });

    return function () {
      return _ref.apply(this, arguments);
    };
  })();
}

export function proxy(items) {
  return (_, key) => items[key];
}