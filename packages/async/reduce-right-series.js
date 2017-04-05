import reduceSeries from './reduce-series';

export default (async function reduceRightSeries(items, fn, acc) {
  return reduceSeries([].concat(items).reverse(), fn, acc);
});