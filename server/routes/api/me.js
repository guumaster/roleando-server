'use strict'

const express = require('express')
const validateToken = require('../../middlewares/validate_token')

const router = express.Router()

// Just validate token
router.get('/me', validateToken(), function (req, res) {
  res.send(req.user)
})

module.exports = router
