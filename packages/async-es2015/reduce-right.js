function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import reduce from './reduce';

export default (() => {
  var _ref = _asyncToGenerator(function* (items, fn, acc) {
    return reduce([].concat(items).reverse(), fn, acc);
  });

  function reduceRight(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return reduceRight;
})();