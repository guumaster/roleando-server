'use strict'

const errors = require('restify-errors')

const generators = require('../../../managers/generators')

module.exports = (req, res, next) => {
  generators
    .findById(req.params.id)
    .then(generator => {
      if (!generator) {
        return next(errors.NotFoundError('Generator not found'))
      }
      res.send(generator)
    })
}
