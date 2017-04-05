async function reduce(items, fn, acc) {
  if (typeof acc === 'undefined' || acc === null || typeof acc !== 'object') {
    return acc;
  }

  await Promise.all(items.map((item, index) => {
    return fn(acc, item, index, items);
  }, acc));

  return acc;
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

async function filter(items, fn) {
  return items.filter(proxy(await map(items, fn)));
}

async function reject(items, fn) {
  return filter(items, not(fn));
}

export default reject;
