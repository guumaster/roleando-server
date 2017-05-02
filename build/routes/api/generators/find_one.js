'use strict';

var errors = require('restify-errors');

var generators = require('../../../managers/generators');

module.exports = function (req, res, next) {
  generators.findById(req.params.id).then(function (generator) {
    if (!generator) {
      return next(errors.NotFoundError('Generator not found'));
    }
    res.send(generator);
  });
};