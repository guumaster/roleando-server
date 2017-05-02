'use strict';

var _lodash = require('lodash');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = require('./db');
var auth0 = require('./auth0');
var tokenManager = require('./token');

var PUBLIC_PROFILE_KEYS = 'name email picture'.split(' ');

var users = db.get('users');

var auth0login = function auth0login(accessToken) {
  return auth0.getUserInfo(accessToken).then(updateProfile);
};

var updateProfile = function updateProfile(profile) {
  return users.findOneAndUpdate({
    profileId: profile.user_id
  }, {
    $set: {
      profile: profile,
      updatedAt: new Date()
    }
  }, { upsert: true });
};

var generateTokens = function generateTokens(user) {
  if (!user) throw new Error('Missing user info');

  var publicProfile = (0, _lodash.pick)(user.profile, PUBLIC_PROFILE_KEYS);
  publicProfile.id = user.profileId;
  publicProfile.isAdmin = (0, _lodash.get)(user, 'profile.app_metadata.isAdmin', false);
  var response = tokenManager.createTokens(user.profileId, publicProfile);
  response.profile = publicProfile;
  return response;
};

var findByProfileId = function findByProfileId(profileId) {
  return users.findOne({ profileId: profileId });
};

var isAdmin = function isAdmin(user) {
  return !!_config2.default.admin.users.match(user.profileId);
};

module.exports = {
  isAdmin: isAdmin,
  auth0login: auth0login,
  findByProfileId: findByProfileId,
  generateTokens: generateTokens
};