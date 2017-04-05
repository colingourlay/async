import map from './map';
import { proxy } from './utils';

export default (async function filter(items, fn) {
  return items.filter(proxy((await map(items, fn))));
});