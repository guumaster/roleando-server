'use strict'

const config = require('config')
const merge = require('lodash/merge')
const nodemailer = require('nodemailer')
const transport = require('nodemailer-sendgrid-transport')

const DEFAULT_OPTIONS = {
  to: config.mailRecipient,
  from: config.mailRecipient
}
const sendgridConf = {
  auth: {
    api_user: config.sendgrid.user,
    api_key: config.sendgrid.pass
  }
}
const mailer = nodemailer.createTransport(transport(sendgridConf))

module.exports = inOpts => {
  const options = merge({}, DEFAULT_OPTIONS, inOpts)

  return mailer
    .sendMail(options)
    .catch(err => {
      console.log(err)
    })
}
