'use strict'
const path = require('path')
const favicon = require('serve-favicon')
const express = require('express')

const router = express.Router()
const indexFile = path.join(__dirname, '/../../static/index.html')

router.use(favicon(`${__dirname}/../../static/favicon.ico`))
router.use(express.static(`${__dirname}/../../static`))

router.use('*', (req, res) => res.sendFile(indexFile))
module.exports = router
