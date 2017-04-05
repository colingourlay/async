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

async function reduceRightSeries(items, fn, acc) {
  return reduceSeries([].concat(items).reverse(), fn, acc);
}

export default reduceRightSeries;
