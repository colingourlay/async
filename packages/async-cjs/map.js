'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function map(items, fn) {
  return items.map((0, _utils.proxy)((await (0, _reduce2.default)(items, (acc, item, index, items) => {
    acc[index] = fn(item, index, items);

    return acc;
  }, {}))));
};

module.exports = exports['default'];