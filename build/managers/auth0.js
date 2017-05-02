'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _auth0Js = require('auth0-js');

var _auth0Js2 = _interopRequireDefault(_auth0Js);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _auth0Js2.default.Authentication({
  domain: _config2.default.auth0.domain,
  clientID: _config2.default.auth0.clientId
});

var getUserInfo = function getUserInfo(accessToken) {
  return new _promise2.default(function (resolve, reject) {
    client.userInfo(accessToken, function (err, profile) {
      if (err) {
        return reject(err);
      }

      return resolve(profile);
    });
  });
};

module.exports = {
  getUserInfo: getUserInfo
};