function invoke(fn, ...args) {
  return fn(args);
}

function not(fn) {
  return (...args) => !fn(...args);
}

function proxy(items) {
  return (_, key) => items[key];
}

export { invoke, not, proxy };
