import filterSeries from './filter-series';

export default async function everySeries(items, fn) {
  return (await filterSeries(items, fn)).length === items.length;
}
