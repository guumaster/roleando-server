'use strict';

var _ms = require('ms');

var _ms2 = _interopRequireDefault(_ms);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTokens = function createTokens(profileId, profile) {
  var aToken = _config2.default.auth.token;
  var rToken = _config2.default.auth.refreshToken;
  var secret = aToken.secret;
  var expiresIn = (0, _ms2.default)(aToken.expiresIn) / 1000;

  var accessToken = _jsonwebtoken2.default.sign({ profileId: profileId, profile: profile }, secret, {
    expiresIn: aToken.expiresIn,
    audience: aToken.audience,
    issuer: aToken.issuer
  });

  var refreshToken = _jsonwebtoken2.default.sign({
    profileId: profileId,
    refreshToken: true
  }, secret, {
    expiresIn: rToken.expiresIn,
    audience: aToken.audience,
    issuer: aToken.issuer
  });

  return { accessToken: accessToken, refreshToken: refreshToken, expiresIn: expiresIn };
};

module.exports = {
  createTokens: createTokens
};