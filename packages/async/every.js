import filter from './filter';

export default (async function every(items, fn) {
  return (await filter(items, fn)).length === items.length;
});