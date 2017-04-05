const test = require('tape');

const filterSeries = require('../packages/async-cjs/filter-series');
const {
  conditional
} = require('./functions');
const {
  WORDS,
  SENTENCE
} = require('./constants');

test('filter-series', function (t) {
  t.plan(1);

filterSeries(WORDS, conditional(x => x.toLowerCase() === 'the'))
  .then(result => t.equal(result.length, 2, `There are ${2} 'the's in '${SENTENCE}'`))
  .catch(err => t.fail(err));
});
