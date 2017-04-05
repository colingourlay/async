'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function parallel(fns) {
  return (0, _map2.default)(fns, _utils.invoke);
};

module.exports = exports['default'];