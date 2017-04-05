import reduce from './reduce';

export default (async function reduceRight(items, fn, acc) {
  return reduce([].concat(items).reverse(), fn, acc);
});