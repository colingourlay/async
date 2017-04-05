import reduceSeries from './reduce-series';

export default (async function sequence(fns, input) {
  return reduceSeries(fns, (acc, fn) => {
    return fn(acc);
  }, input);
});