'use strict';

var generators = require('../../../managers/generators');

module.exports = function (req, res, next) {
  generators.findAll().then(function (list) {
    res.send(list);
  });
};