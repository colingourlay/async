import eachSeries from './each-series';

export default (async function eachRightSeries(items, fn) {
  await eachSeries([].concat(items).reverse(), fn);
});