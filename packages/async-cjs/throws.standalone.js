'use strict';

function throws(packed) {
  if (packed[0]) {
    throw packed[0];
  }

  return packed;
}

module.exports = throws;
