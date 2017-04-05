const test = require('tape');

const reduce = require('../packages/async-cjs/reduce');
const {
  willThrow,
  addValue,
  joinSpacedValue
} = require('./functions');
const {
  NUMBERS,
  SUM,
  WORDS,
  SENTENCE
} = require('./constants');

test('reduce', function (t) {
  t.plan(5);

  reduce(NUMBERS, willThrow, {})
  .then(result => {
    t.fail('Should have thrown.');
  })
  .catch(err => t.pass(err));

  reduce(NUMBERS, addValue, {value: 0})
  .then(result => t.equal(result.value, SUM, 'Added all numbers together.'))
  .catch(err => t.fail(err));

  reduce(NUMBERS, addValue, {value: 15})
  .then(result => t.equal(result.value, SUM + 15, 'Added all numbers to accumulator.'))
  .catch(err => t.fail(err));

  reduce(WORDS, joinSpacedValue, {value: ''})
  .then(result => t.equal(result.value.split('').sort().join(''), SENTENCE.split('').sort().join(''), 'Joined all words together (in any order).'))
  .catch(err => t.fail(err));

  reduce(WORDS, joinSpacedValue, {value: 'A sentence:'})
  .then(result => t.equal(result.value.split('').sort().join(''), `A sentence: ${SENTENCE}`.split('').sort().join(''), 'Joined all words to accumulator (in any order).'))
  .catch(err => t.fail(err));
});
