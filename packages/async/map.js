import reduce from './reduce';
import { proxy } from './utils';

export default (async function map(items, fn) {
  return items.map(proxy((await reduce(items, (acc, item, index, items) => {
    acc[index] = fn(item, index, items);

    return acc;
  }, {}))));
});