function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

export default (() => {
  var _ref = _asyncToGenerator(function* (items, fn, acc) {
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