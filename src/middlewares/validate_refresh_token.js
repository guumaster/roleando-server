'use strict'

const jwt = require('express-jwt')
const config = require('config')
const options = config.auth.token

module.exports = jwt({
  secret: options.secret,
  audience: options.audience,
  issuer: options.issuer,
  algorithms: ['HS256'],
  requestProperty: 'refreshToken'
})
