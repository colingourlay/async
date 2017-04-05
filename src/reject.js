import filter from './filter';
import {not} from './utils';

export default async function reject(items, fn) {
  return filter(items, not(fn));
}
