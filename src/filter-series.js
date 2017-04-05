import mapSeries from './map-series';
import {proxy} from './utils';

export default async function filterSeries(items, fn) {
  return items.filter(proxy(await mapSeries(items, fn)));
}
