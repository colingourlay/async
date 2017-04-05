const test = require('tape');

const rejectSeries = require('../packages/async-cjs/reject-series');
const {
  conditional
} = require('./functions');
const {
  WORDS,
  SENTENCE
} = require('./constants');

test('reject-series', function (t) {
  t.plan(1);

rejectSeries(WORDS, conditional(x => x.toLowerCase() === 'the'))
  .then(result => t.equal(result.length, WORDS.length - 2, `There are ${WORDS.length - 2} words in '${SENTENCE}' that aren't 'the'.`))
  .catch(err => t.fail(err));
});
