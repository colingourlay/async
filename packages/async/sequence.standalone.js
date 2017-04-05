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

async function sequence(fns, input) {
  return reduceSeries(fns, (acc, fn) => {
    return fn(acc);
  }, input);
}

export default sequence;
