'use strict';

var config = require('../../../config');
var mailer = require('../mailer');

module.exports = function (generator) {
  var status = generator.parent ? 'copiado' : 'nuevo';
  mailer({
    subject: '[ROLEANDO] generador ' + status + ' "' + generator.name + '" (' + process.env.NODE_ENV + ')',
    text: formatText(generator)
  });
};

var formatText = function formatText(generator) {
  return '\nNombre: "' + generator.name + '" \n\nLink: ' + config.host + generator.link + '\n\nDecripcion: "' + generator.desc + '"\n\nAutor: "' + generator.author.name + '"\n\n';
};