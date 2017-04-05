'use strict';

async function reduceSeries(items, fn, acc) {
  let index = 0;
  const len = items.length;

  if (typeof acc === 'undefined') {
    acc = items[index++];
  }

  for (; index < len; index++) {
    acc = await fn(acc, items[index], index, items);
  }

  return acc;
}

async function mapSeries(items, fn) {
  return reduceSeries(items, (acc, item, index, items) => {
    acc[index] = fn(item, index, items);

    return acc;
  });
}

async function eachSeries(items, fn) {
  await mapSeries(items, fn);
}

async function eachRightSeries(items, fn) {
  await eachSeries([].concat(items).reverse(), fn);
}

module.exports = eachRightSeries;
