'use strict'

const config = require('../../config')
const express = require('express')

const router = express.Router()

router.get('/blog', (req, res) => res.redirect(config.blogUrl))

module.exports = router
