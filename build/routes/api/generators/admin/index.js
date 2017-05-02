'use strict';

var express = require('express');
var errors = require('restify-errors');
var generators = require('../../../../managers/generators');
var router = express.Router();

var setFeatured = function setFeatured(status) {
  return function (req, res, next) {
    generators.setFeatured(req.params.id, status).then(function (update) {
      if (!update.ok) {
        return next(errors.InternalServerError('Error during update'));
      }
      return res.sendStatus(204);
    });
  };
};

var setListed = function setListed(status) {
  return function (req, res, next) {
    generators.setListed(req.params.id, status).then(function (update) {
      if (!update.ok || !update.nModified) {
        return next(errors.InternalServerError('Error during update'));
      }
      return res.sendStatus(204);
    });
  };
};

router.put('/featured/:id', setFeatured(true));
router.delete('/featured/:id', setFeatured(false));

router.put('/listed/:id', setListed(true));
router.delete('/listed/:id', setListed(false));

module.exports = router;