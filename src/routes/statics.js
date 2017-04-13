'use strict'

const favicon = require('serve-favicon')
const express = require('express')

const router = express.Router()

router.use(favicon(`${__dirname}/../../static/favicon.ico`))
router.use(express.static(`${__dirname}/../../static`))

module.exports = router
