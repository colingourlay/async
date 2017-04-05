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

function not(fn) {
  return (...args) => !fn(...args);
}

function proxy(items) {
  return (_, key) => items[key];
}

async function filterSeries(items, fn) {
  return items.filter(proxy(await mapSeries(items, fn)));
}

async function rejectSeries(items, fn) {
  return filterSeries(items, not(fn));
}

export default rejectSeries;
