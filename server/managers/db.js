'use strict'

const monk = require('monk')
const config = require('config')

module.exports = monk(config.database.url)
