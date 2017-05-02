'use strict';

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = _config2.default.auth.token;

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$required = _ref.required,
      required = _ref$required === undefined ? false : _ref$required;

  return (0, _expressJwt2.default)({
    secret: options.secret,
    audience: options.audience,
    issuer: options.issuer,
    algorithms: ['HS256'],
    credentialsRequired: !!required
  });
};