'use strict'

const config = require('config')
const auth0 = require('auth0-js')

const client = new auth0.Authentication({
  domain: config.auth0.domain,
  clientID: config.auth0.clientId
})

const getUserInfo = accessToken => new Promise((resolve, reject) => {
  client.userInfo(accessToken, (err, profile) => {
    if (err) {
      return reject(err)
    }

    return resolve(profile)
  })
})

module.exports = {
  getUserInfo
}
