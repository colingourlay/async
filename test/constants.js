const NUMBERS = [1, 2, 3, 4, 5];
const SUM = NUMBERS.reduce((a, b) => a + b, 0);
const NUMBER_ADDING_FNS = NUMBERS.map(number => sum => sum + number);

const WORDS = ['The', 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'lazy', 'dog'];
const SENTENCE = WORDS.join(' ');
const WORD_JOINING_FNS = WORDS.map(word => sentence => [sentence, word].join(' '));

module.exports = {
  NUMBERS,
  SUM,
  NUMBER_ADDING_FNS,
  WORDS,
  SENTENCE,
  WORD_JOINING_FNS
};
