const test = require('tape');

const sequence = require('../packages/async-cjs/sequence');
const {
  SUM,
  NUMBER_ADDING_FNS,
  SENTENCE,
  WORD_JOINING_FNS
} = require('./constants');

test('sequence', function (t) {
  t.plan(3);

  sequence(NUMBER_ADDING_FNS, 0)
  .then(result => t.equal(result, SUM, 'Added all numbers together.'))
  .catch(err => t.fail(err));

  sequence(NUMBER_ADDING_FNS, 15)
  .then(result => t.equal(result, SUM + 15, 'Added all numbers to input.'))
  .catch(err => t.fail(err));

  sequence(WORD_JOINING_FNS, 'A sentence:')
  .then(result => t.equal(result, `A sentence: ${SENTENCE}`, 'Joined all words to accumulator.'))
  .catch(err => t.fail(err));
});
