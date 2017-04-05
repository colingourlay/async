'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function reduce(items, fn, acc) {
  if (typeof acc === 'undefined' || acc === null || typeof acc !== 'object') {
    return acc;
  }

  await Promise.all(items.map((item, index) => {
    return fn(acc, item, index, items);
  }, acc));

  return acc;
};

module.exports = exports['default'];