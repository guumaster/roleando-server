'use strict';

var _require = require('lodash'),
    has = _require.has;

module.exports = function (req, res, next) {
  if (!has(req, 'headers.authorization')) {
    return next();
  }

  req.accessToken = req.headers.authorization.replace('Bearer ', '');
  return next();
};