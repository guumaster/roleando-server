'use strict';

var express = require('express');
var errors = require('restify-errors');

var generators = require('../managers/generators');
var router = express.Router();

router.get('/rg/:id', function (req, res, next) {
  generators.findById(req.params.id).then(function (generator) {
    if (!generator) {
      return next(new errors.NotFoundError('Generator not found'));
    }

    return res.redirect(301, generator.link);
  });
});

module.exports = router;