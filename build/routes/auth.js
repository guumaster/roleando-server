'use strict';

var express = require('express');
var errors = require('restify-errors');

var user = require('../managers/user');
var validateRefreshToken = require('../middlewares/validate_refresh_token');

var checkFound = function checkFound(user) {
  if (!user) {
    throw errors.NotFoundError('User not found');
  }
  return user;
};

var router = express.Router();

router.post('/login', function (req, res, next) {
  if (!req.accessToken) {
    return next(errors.UnauthorizedError('Missing accessToken'));
  }

  user.auth0login(req.accessToken).then(user.generateTokens).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    return next(err);
  });
});

router.post('/token/refresh', validateRefreshToken, function (req, res, next) {
  if (!req.refreshToken || !req.refreshToken.refreshToken) {
    return next(errors.UnauthorizedError('Missing refreshToken'));
  }

  user.findByProfileId(req.refreshToken.profileId).then(checkFound).then(user.generateTokens).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    return next(err);
  });
});

module.exports = router;