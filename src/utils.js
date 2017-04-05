export function invoke(fn, ...args) {
  return fn(args);
}

export function not(fn) {
  return async function (...args) {
    return !(await fn(...args));
  };
}

export function proxy(items) {
  return (_, key) => items[key];
}
