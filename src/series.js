import mapSeries from './map-series';
import {invoke} from './utils';

export default async function series(fns) {
  return mapSeries(fns, invoke);
}
