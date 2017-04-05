import filterSeries from './filter-series';
import { not } from './utils';

export default (async function rejectSeries(items, fn) {
  return filterSeries(items, not(fn));
});