'use strict';

var generators = require('../../../managers/generators');

module.exports = function (req, res, next) {
  generators.findFeatured().then(function (list) {
    res.send(list);
  });
};