'use strict'

const shortid = require('shortid')
const slug = require('slug')
const merge = require('lodash/merge')
const clone = require('lodash/clone')
const map = require('lodash/map')
const partialRight = require('lodash/partialRight')

const validate = require('./validator')
const link = require('./link')
const db = require('../db')

const DEFAULT_DATA = {
  listed: true,
  featured: false
}

const generators = db.get('generator_tables')
const slugify = str => slug((str || '').toLowerCase())

const prepare = table => {
  delete table._id
  return link(table)
}
const prepareList = partialRight(map, prepare)

const findAll = () => generators.find({listed: true, deleted: false }).then(prepareList)
const findFeatured = () => generators.find({listed: true, featured: true, deleted: false}).then(prepareList)
const findById = id => generators.findOne({id, deleted: false}).then(prepare)

const save = (inputId, inputData) => validate(inputData).then(() => {
  const id = inputId || shortid.generate()

  const data = merge({}, DEFAULT_DATA, inputData)

  const time = inputId ? 'updatedAt' : 'createdAt'
  data[time] = new Date()
  data.slug = slugify(data.name)

  return generators
    .findOneAndUpdate({
      id,
      deleted: false
    }, {
      $set: data
    }, {upsert: true})
    .then(prepare)
})

const fork = (id, author) => {
  return generators.findOne({id, deleted: false})
    .then(parent => {
      if (!parent) {
        return
      }

      const newId = shortid.generate()
      const forked = merge(clone(parent), {id: newId, author, parent: parent.id})
      return save(newId, forked)
    })
}

const remove = (id) => {
  return generators.findOneAndUpdate({id}, { $set: { deleted: true } })
}

const checkOwner = (user, id) => {
  return generators.findOne({id})
    .then(found => {
      return found ? (user.profileId === found.author.id) : false
    })
}

const setFeatured = (id, featured) => {
  return generators
    .update({id}, {
      $set: {featured}
    })
}

const setListed = (id, listed) => {
  return generators
    .update({id}, {
      $set: {listed: listed}
    })
}

module.exports = {
  findById,
  findAll,
  findFeatured,
  save,
  fork,
  remove,
  checkOwner,
  setFeatured,
  setListed
}