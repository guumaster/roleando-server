'use strict';

var errors = require('restify-errors');

var generators = require('../../../managers/generators');

module.exports = function (req, res, next) {
  generators.remove(req.params.id).then(function (item) {
    if (!item || !item.deleted) {
      return next(errors.InternalServerError('Error during generator remove'));
    }
    res.sendStatus(204);
  }).catch(next);
};