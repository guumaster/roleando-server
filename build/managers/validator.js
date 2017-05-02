'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tv4 = require('tv4');

module.exports = function (obj, schema) {
  if (!schema) {
    return _promise2.default.reject(new Error('Can\'t validate against an empty schema'));
  }

  var result = tv4.validateMultiple(obj, schema);

  if (result.valid) {
    return _promise2.default.resolve(obj);
  }

  var errors = result.errors.map(function (err) {
    return (err.message + ' ' + err.dataPath).trim();
  });

  return _promise2.default.reject(new Error(errors.join(', ')));
};