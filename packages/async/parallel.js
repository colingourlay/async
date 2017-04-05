import map from './map';
import { invoke } from './utils';

export default (async function parallel(fns) {
  return map(fns, invoke);
});