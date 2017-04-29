/* eslint-disable  no-console */

import Nuxt from 'nuxt'
import express from 'express'
import bodyParser from 'body-parser'

import routes from './routes'

require('dotenv').config()
const config = require('config')
const nuxtConfig = require('../nuxt.config.js')

const app = express({
  name: config.name
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(routes)

// Init Nuxt.js
const nuxt = new Nuxt(nuxtConfig)
app.use(nuxt.render)

// Build only in dev mode
if (nuxtConfig.dev) {
  nuxt.build()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

app.listen(config.port, () => {
  console.log(`Server listening on ${config.port}`)
})
