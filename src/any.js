import filter from './filter';

export default async function any(items, fn) {
  return (await filter(items, fn)).length > 0;
}
