'use strict';

var errors = require('restify-errors');
var generators = require('../../../managers/generators');
var notifyFork = require('../../../managers/generators/notifier');

module.exports = function (req, res, next) {
  var author = {
    id: req.user.profileId,
    name: req.user.profile.name,
    picture: req.user.profile.picture
  };

  generators.fork(req.params.id, { author: author }).then(function (forked) {
    if (!forked) {
      return next(new errors.InternalServerError('Error during save'));
    }

    res.status(200).send(forked);
    notifyFork(forked);
  }).catch(next);
};