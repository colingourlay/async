'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

async function eachSeries(items, fn) {
  await mapSeries(items, fn);
}

async function eachRightSeries(items, fn) {
  await eachSeries([].concat(items).reverse(), fn);
}

async function reduce(items, fn, acc) {
  if (typeof acc === 'undefined' || acc === null || typeof acc !== 'object') {
    return acc;
  }

  await Promise.all(items.map((item, index) => {
    return fn(acc, item, index, items);
  }, acc));

  return acc;
}

function invoke(fn, ...args) {
  return fn(args);
}

function not(fn) {
  return async function (...args) {
    return !(await fn(...args));
  };
}

function proxy(items) {
  return (_, key) => items[key];
}

async function map(items, fn) {
  return items.map(proxy(await reduce(items, (acc, item, index, items) => {
    acc[index] = fn(item, index, items);

    return acc;
  }, {})));
}

async function each(items, fn) {
  await map(items, fn);
}

async function eachRight(items, fn) {
  await each([].concat(items).reverse(), fn);
}

async function filterSeries(items, fn) {
  return items.filter(proxy(await mapSeries(items, fn)));
}

async function everySeries(items, fn) {
  return (await filterSeries(items, fn)).length === items.length;
}

async function filter(items, fn) {
  return items.filter(proxy(await map(items, fn)));
}

async function every(items, fn) {
  return (await filter(items, fn)).length === items.length;
}

function pack(promise) {
  return promise
  .then(result => [null, result])
  .catch(err => [err]);
}

function packs(fn) {
  return (...args) => pack(fn(...args));
}

async function parallel(fns) {
  return map(fns, invoke);
}

async function reduceRightSeries(items, fn, acc) {
  return reduceSeries([].concat(items).reverse(), fn, acc);
}

async function reduceRight(items, fn, acc) {
  return reduce([].concat(items).reverse(), fn, acc);
}

async function rejectSeries(items, fn) {
  return filterSeries(items, not(fn));
}

async function reject(items, fn) {
  return filter(items, not(fn));
}

async function sequence(fns, input) {
  return reduceSeries(fns, (acc, fn) => {
    return fn(acc);
  }, input);
}

async function series(fns) {
  return mapSeries(fns, invoke);
}

async function someSeries(items, fn) {
  return (await filterSeries(items, fn)).length > 0;
}

async function some(items, fn) {
  return (await filter(items, fn)).length > 0;
}

function throws(packed) {
  if (packed[0]) {
    throw packed[0];
  }

  return packed;
}

function unpack(packed, ignoreErrors) {
  return ignoreErrors ? packed[1] : throws(packed)[1];
}

exports.eachRightSeries = eachRightSeries;
exports.eachRight = eachRight;
exports.eachSeries = eachSeries;
exports.each = each;
exports.everySeries = everySeries;
exports.every = every;
exports.filterSeries = filterSeries;
exports.filter = filter;
exports.mapSeries = mapSeries;
exports.map = map;
exports.pack = pack;
exports.packs = packs;
exports.parallel = parallel;
exports.reduceRightSeries = reduceRightSeries;
exports.reduceRight = reduceRight;
exports.reduceSeries = reduceSeries;
exports.reduce = reduce;
exports.rejectSeries = rejectSeries;
exports.reject = reject;
exports.sequence = sequence;
exports.series = series;
exports.someSeries = someSeries;
exports.some = some;
exports.throws = throws;
exports.unpack = unpack;
