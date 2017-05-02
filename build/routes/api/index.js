'use strict';

var express = require('express');
var router = express.Router();

router.use(require('./me'));
router.use('/generators', require('./generators'));

module.exports = router;