function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, typeof ms === 'number' ? ms : Math.random() * 100);
  });
}

function willResolve() {
  return Promise.resolve('Resolved.');
}

function willResolveAfterTimeout() {
  return new Promise(resolve => {
    wait().then(() => resolve('Resolved.'));
  });
}

function willReject() {
  return Promise.reject('Rejected.');
}

function willRejectAfterTimeout() {
  return new Promise((resolve, reject) => {
    wait().then(() => reject('Rejected.'));
  });
}

function willThrow() {
  return new Promise(() => {
    throw 'Threw.';
  });
}

const thirdFnWillReject = [
  willResolve,
  willResolve,
  willReject,
  willResolve
];

function identity(x) {
  return new Promise(resolve => {
    wait().then(() => resolve(x));
  });
}

function conditional(fn) {
  return x => new Promise(resolve => {
    wait().then(() => resolve(fn(x)));
  });
}

function add(a, b) {
  return new Promise(resolve => {
    wait().then(() => resolve(parseInt(a + b)));
  });
}

function addValue(a, b) {
  return new Promise(resolve => {
    wait().then(() => resolve(a.value = parseInt(a.value + b), a));
  });
}

function joinSpaced(a, b) {
  return new Promise(resolve => {
    wait().then(() => resolve([a, b].join(' ')));
  });
}

function joinSpacedValue(a, b) {
  return new Promise(resolve => {
    wait().then(() => resolve(a.value = [a.value, b].join(a.value.length ? ' ' : ''), a));
  });
}

module.exports = {
  wait,
  willResolve,
  willResolveAfterTimeout,
  willReject,
  willRejectAfterTimeout,
  willThrow,
  thirdFnWillReject,
  identity,
  conditional,
  add,
  addValue,
  joinSpaced,
  joinSpacedValue
};
