import reduceSeries from './reduce-series';

export default async function mapSeries(items, fn) {
  return reduceSeries(items, (acc, item, index, items) => {
    acc[index] = fn(item, index, items);

    return acc;
  });
}
