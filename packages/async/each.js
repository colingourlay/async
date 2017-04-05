import map from './map';

export default (async function each(items, fn) {
  await map(items, fn);
});