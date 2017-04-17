'use strict'

const express = require('express')
const bodyParser = require('body-parser')
// const morgan = require('morgan')
const config = require('config')

const errors = require('restify-errors')

// const errorHandler = require('./middlewares/error_handler')
const routes = require('./routes')
const statics = require('./routes/statics')

const app = express({
  name: config.name
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.use(errorHandler)
// app.use(morgan('combined'))
app.use(function (err, req, res, next) {
  console.log(err, err.message, err.stack)

  if (req.header('content-type') === 'application/json') {
    if (err instanceof errors.HttpError) {
      res.status(err.statusCode).send(err.body)
      return
    }
    res.status(500).send(new errors.InternalServerError(err).body)
    return
  }
  res.status(500).send(err.message || 'Something broke!')
})

app.use(routes)
app.use(statics)

module.exports = app
