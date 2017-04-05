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

export { invoke, not, proxy };
