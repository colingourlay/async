const test = require('tape');

const reduceSeries = require('../packages/async-cjs/reduce-series');
const {
  willReject,
  willRejectAfterTimeout,
  willThrow,
  add,
  joinSpaced
} = require('./functions');
const {
  NUMBERS,
  SUM,
  WORDS,
  SENTENCE
} = require('./constants');

test('reduce-series', function (t) {
  t.plan(7);

  reduceSeries(NUMBERS, willThrow)
  .then(result => {
    t.fail('Should have thrown.');
  })
  .catch(err => t.pass(err));

  reduceSeries(NUMBERS, willReject)
  .then(result => {
    t.fail('Should have rejected.');
  })
  .catch(err => t.pass(err));

  reduceSeries(NUMBERS, willRejectAfterTimeout)
  .then(result => {
    t.fail('Should have rejected after a timeout.');
  })
  .catch(err => t.pass(err));

  reduceSeries(NUMBERS, add)
  .then(result => t.equal(result, SUM, 'Added all numbers together.'))
  .catch(err => t.fail(err));

  reduceSeries(NUMBERS, add, 15)
  .then(result => t.equal(result, SUM + 15, 'Added all numbers to accumulator.'))
  .catch(err => t.fail(err));

  reduceSeries(WORDS, joinSpaced)
  .then(result => t.equal(result, SENTENCE, 'Joined all words together.'))
  .catch(err => t.fail(err));

  reduceSeries(WORDS, joinSpaced, 'A sentence:')
  .then(result => t.equal(result, `A sentence: ${SENTENCE}`, 'Joined all words to accumulator.'))
  .catch(err => t.fail(err));
});
