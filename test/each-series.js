const test = require('tape');

const mapSeries = require('../packages/async-cjs/each-series');
const {
  identity
} = require('./functions');
const {
  WORDS,
  SENTENCE
} = require('./constants');

test('each-series', function (t) {
  t.plan(1);

  const result = [];

  mapSeries(WORDS, word => result.push(word))
  .then(() => t.equal(result.join(' '), SENTENCE, 'Mapped words, once joined together, match sentence.'))
  .catch(err => t.fail(err));
});
