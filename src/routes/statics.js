'use strict'

const favicon = require('serve-favicon')
const express = require('express')

const router = express.Router()

router.use(favicon(`${__dirname}/../../static/favicon.ico`))
router.use(express.static(`${__dirname}/../../static`))
router.use(express.static(`/tmp/test/dist`))

module.exports = router
