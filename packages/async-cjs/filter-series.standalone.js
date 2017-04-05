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
  async function reducer(acc, item, index, items) {
    acc[index] = await fn(item, index, items);

    return acc;
  }

  return reduceSeries(items, reducer, []);
}

function proxy(items) {
  return (_, key) => items[key];
}

async function filterSeries(items, fn) {
  return items.filter(proxy(await mapSeries(items, fn)));
}

module.exports = filterSeries;
