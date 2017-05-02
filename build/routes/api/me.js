'use strict';

var express = require('express');
var validateToken = require('../../middlewares/validate_token');

var router = express.Router();

router.get('/me', validateToken(), function (req, res) {
  res.send(req.user);
});

module.exports = router;