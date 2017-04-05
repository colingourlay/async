import filterSeries from './filter-series';

export default (async function someSeries(items, fn) {
  return (await filterSeries(items, fn)).length > 0;
});