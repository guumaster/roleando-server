'use strict';

var express = require('express');
var cors = require('cors');

var checkOwner = require('../../../middlewares/generators/check_owner');
var validateToken = require('../../../middlewares/validate_token');
var onlyAdmin = require('../../../middlewares/only_admin');

var listAll = require('./list_all');
var listFeatured = require('./list_featured');
var findOne = require('./find_one');
var save = require('./save');
var fork = require('./fork');
var remove = require('./remove');
var admin = require('./admin');

var router = express.Router();
var useCors = cors();
var mandatoryToken = function mandatoryToken() {
  return validateToken({ required: true });
};

router.get('/tables', useCors, listAll);
router.get('/tables/featured', useCors, validateToken(), listFeatured);
router.get('/table/:id', useCors, validateToken(), findOne);

router.post('/tables', mandatoryToken(), save);
router.post('/table/:id/fork', mandatoryToken(), fork);
router.put('/table/:id', mandatoryToken(), checkOwner, save);
router.delete('/table/:id', mandatoryToken(), checkOwner, remove);

router.use('/admin', onlyAdmin, admin);

module.exports = router;