'use strict';

var express = require('express');
var cors = require('cors');

var sitemap = require('./sitemap');
var auth = require('./auth');
var api = require('./api');
var short = require('./short');
var validateToken = require('../middlewares/validate_token');

var router = express.Router();

var addAdmin = require('../middlewares/add_admin');
var addAccessToken = require('../middlewares/add_access_token');

router.get('/ping', function (req, res) {
  res.send({
    hello: 'world!'
  });
});

router.use(addAccessToken);
router.use('/auth', cors(), auth);
router.use('/api', cors(), validateToken(), addAdmin, api);
router.use(short);

router.use(sitemap);

module.exports = router;