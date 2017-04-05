const test = require('tape');

const reduceRightSeries = require('../packages/async-cjs/reduce-right-series');
const {
  joinSpaced
} = require('./functions');
const {
  NUMBERS,
  SUM,
  WORDS,
  SENTENCE
} = require('./constants');

test('reduce-right-series', function (t) {
  t.plan(2);

  const reversedSentence = [].concat(WORDS).reverse().join(' ');

  reduceRightSeries(WORDS, joinSpaced)
  .then(result => t.equal(result, reversedSentence, 'Joined all words together in reverse.'))
  .catch(err => t.fail(err));

  reduceRightSeries(WORDS, joinSpaced, 'A reversed sentence:')
  .then(result => t.equal(result, `A reversed sentence: ${reversedSentence}`, 'Joined all words to accumulator in reverse.'))
  .catch(err => t.fail(err));
});
