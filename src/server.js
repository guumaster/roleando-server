'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const config = require('config')

const errorHandler = require('./middlewares/error_handler')
const routes = require('./routes')
const statics = require('./routes/statics')

const app = express({
  name: config.name
})

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(errorHandler)

app.use(routes)
app.use(statics)
app.use('*', (req, res) => res.sendFile(`/tmp/test/dist/index.html`))

module.exports = app
