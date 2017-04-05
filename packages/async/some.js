import filter from './filter';

export default (async function some(items, fn) {
  return (await filter(items, fn)).length > 0;
});