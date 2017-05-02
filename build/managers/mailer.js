'use strict';

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSendgridTransport = require('nodemailer-sendgrid-transport');

var _nodemailerSendgridTransport2 = _interopRequireDefault(_nodemailerSendgridTransport);

var _lodash = require('lodash');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = {
  to: _config2.default.mailRecipient,
  from: _config2.default.mailRecipient
};
var sendgridConf = {
  auth: {
    api_user: _config2.default.sendgrid.user,
    api_key: _config2.default.sendgrid.pass
  }
};
var mailer = _nodemailer2.default.createTransport((0, _nodemailerSendgridTransport2.default)(sendgridConf));

module.exports = function (inOpts) {
  var options = (0, _lodash.merge)({}, DEFAULT_OPTIONS, inOpts);

  return mailer.sendMail(options).catch(function (err) {
    console.log(err);
  });
};