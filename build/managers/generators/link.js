'use strict';

var config = require('../../../config');

module.exports = function () {
  var generator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  generator.link = '/generadores/' + generator.slug + '/' + generator.id;
  generator.shortLink = config.host + '/rg/' + generator.id;
  return generator;
};