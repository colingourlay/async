const test = require('tape');

const mapSeries = require('../packages/async-cjs/map-series');
const {
  identity
} = require('./functions');
const {
  WORDS,
  SENTENCE
} = require('./constants');

test('map-series', function (t) {
  t.plan(1);

  mapSeries(WORDS, identity)
  .then(result => t.equal(result.join(' '), SENTENCE, 'Mapped words, once joined together, match sentence.'))
  .catch(err => t.fail(err));
});
