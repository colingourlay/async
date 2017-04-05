import filterSeries from './filter-series';

export default (async function anySeries(items, fn) {
  return (await filterSeries(items, fn)).length > 0;
});