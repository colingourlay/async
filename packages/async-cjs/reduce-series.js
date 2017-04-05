'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function reduceSeries(items, fn, acc) {
  let index = 0;
  const len = items.length;

  if (typeof acc === 'undefined') {
    acc = items[index++];
  }

  for (; index < len; index++) {
    acc = await fn(acc, items[index], index, items);
  }

  return acc;
};

module.exports = exports['default'];