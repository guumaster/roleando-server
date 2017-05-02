'use strict';

var errors = require('restify-errors');

module.exports = function (req, res, next) {
  if (!req.isAdmin) {
    return next(new errors.UnauthorizedError('Only admins url'));
  }

  return next();
};