'use strict'
const errors = require('restify-errors')

const generators = require('../../../managers/generators')

module.exports = (req, res, next) => {
  generators.remove(req.params.id)
    .then(saved => {
      if (!saved || !saved.value) {
        return next(errors.NotFoundError('Generator not found'))
      }
      res.sendStatus(204)
    })
    .catch(next)
}
