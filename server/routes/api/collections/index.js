const express = require('express')
const cors = require('cors')

const findAll = require('./list_all')
const findOne = require('./find_one')
const save = require('./save')
const remove = require('./remove')
const saveItems = require('./saveItems')

const validateToken = require('../../../middlewares/validate_token')

// const checkOwner = require('../../../middlewares/generators/check_owner')

const useCors = cors()
const mandatoryToken = () => validateToken({required: true})

const router = express.Router()

router.get('/', useCors, validateToken(), findAll)
router.post('/', useCors, validateToken(), save)

// single collection
router.post('/:id', useCors, validateToken(), save)
router.get('/:id', useCors, validateToken(), findOne)
router.delete('/:id', useCors, mandatoryToken(), remove)

// items
router.post('/:id/items', useCors, mandatoryToken(), saveItems)

module.exports = router
