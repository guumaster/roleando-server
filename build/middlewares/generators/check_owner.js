'use strict';

var errors = require('restify-errors');

var generators = require('../../managers/generators');

module.exports = function (req, res, next) {
  if (req.isAdmin) {
    return next();
  }

  generators.checkOwner(req.user, req.params.id).then(function (isOwner) {
    if (!isOwner) {
      return next(new errors.UnauthorizedError('Can\'t modify this generator'));
    }
  }).then(function () {
    return next();
  }).catch(next);
};