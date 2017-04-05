import mapSeries from './map-series';

export default async function eachSeries(items, fn) {
  await mapSeries(items, fn);
}
