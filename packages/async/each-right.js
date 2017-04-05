import each from './each';

export default (async function eachRight(items, fn) {
  await each([].concat(items).reverse(), fn);
});