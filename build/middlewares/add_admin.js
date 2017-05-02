'use strict';

var users = require('../managers/user');

module.exports = function (req, res, next) {
  if (!req.user) {
    return next();
  }
  req.isAdmin = users.isAdmin(req.user);
  return next();
};