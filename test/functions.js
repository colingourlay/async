function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
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

function add(a, b) {
  return new Promise(resolve => {
    wait().then(() => resolve(parseInt(a + b)));
  });
}

function addProp(a, b) {
  return new Promise(resolve => {
    wait(Math.random() * 100).then(() => resolve(a.prop = parseInt(a.prop + b), a));
  });
}

function joinSpaced(a, b) {
  return new Promise(resolve => {
    wait().then(() => resolve([a, b].join(' ')));
  });
}

function joinSpacedProp(a, b) {
  return new Promise(resolve => {
    wait(Math.random() * 100).then(() => resolve(a.prop = [a.prop, b].join(a.prop.length ? ' ' : ''), a));
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
  add,
  addProp,
  joinSpaced,
  joinSpacedProp
};
