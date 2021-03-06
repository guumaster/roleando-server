'use strict'

require('dotenv').config()

const server = require('../server')
const config = require('../config')

server.listen(config.port, () => {
  console.log(`Server started at ${config.port}`)
})
