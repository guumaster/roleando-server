'use strict'

const express = require('express')
const router = express.Router()

router.use(require('./me'))
router.use('/generators', require('./generators'))

module.exports = router
