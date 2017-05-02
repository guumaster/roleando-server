'use strict';

var errors = require('restify-errors');
var pick = require('lodash/pick');
var merge = require('lodash/merge');
var generators = require('../../../managers/generators');
var notifyNew = require('../../../managers/generators/notifier');

module.exports = function (req, res, next) {
  var author = {
    id: req.user.profileId,
    name: req.user.profile.name,
    picture: req.user.profile.picture
  };
  var data = {};
  var table = pick(req.body, ['name', 'desc', 'data.tables', 'data.tpls', 'data.remotes']);
  var isNew = !req.params.id;

  if (isNew) {
    data = merge({ author: author }, table);
  } else {
    data = req.isAdmin ? table : merge({ author: author }, table);
  }

  generators.save(req.params.id, data).then(function (saved) {
    if (!saved) {
      return next(new errors.InternalServerError('Error during save'));
    }

    res.status(200).send(saved);

    if (!req.params.id) {
      notifyNew(saved);
    }
  }).catch(next);
};