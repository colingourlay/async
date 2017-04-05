'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _each = require('./each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function eachRight(items, fn) {
  await (0, _each2.default)([].concat(items).reverse(), fn);
};

module.exports = exports['default'];