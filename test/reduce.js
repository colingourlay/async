const test = require('tape');

const reduce = require('../packages/async-cjs/reduce');
const {
  wait,
  willResolve,
  willResolveAfterTimeout,
  willReject,
  willRejectAfterTimeout,
  willThrow,
  thirdFnWillReject,
  add,
  addProp,
  joinSpaced,
  joinSpacedProp
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

  reduce(NUMBERS, addProp, {prop: 0})
  .then(result => t.equal(result.prop, SUM, `Added all numbers together.`))
  .catch(err => t.fail(err));

  reduce(NUMBERS, addProp, {prop: 15})
  .then(result => t.equal(result.prop, SUM + 15, `Added all numbers to accumulator.`))
  .catch(err => t.fail(err));

  reduce(WORDS, joinSpacedProp, {prop: ''})
  .then(result => t.equal(result.prop.split('').sort().join(''), SENTENCE.split('').sort().join(''), `Joined all words together (in any order).`))
  .catch(err => t.fail(err));

  reduce(WORDS, joinSpacedProp, {prop: 'A sentence:'})
  .then(result => t.equal(result.prop.split('').sort().join(''), ('A sentence: ' + SENTENCE).split('').sort().join(''), `Joined all words to accumulator (in any order).`))
  .catch(err => t.fail(err));
});
