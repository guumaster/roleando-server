'use strict';

var config = require('../../config');
var express = require('express');

var router = express.Router();

router.get('/blog', function (req, res) {
  return res.redirect(config.blogUrl);
});

module.exports = router;