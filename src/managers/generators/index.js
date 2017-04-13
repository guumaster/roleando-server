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

const generators = db.get('generator_tables')
const slugify = str => slug((str || '').toLowerCase())

const prepare = table => {
  delete table._id
  return link(table)
}
const prepareList = partialRight(map, prepare)

const findAll = () => generators.find().then(prepareList)
const findFeatured = () => generators.find({featured: true}).then(prepareList)
const findById = id => generators.findOne({id}).then(prepare)

const save = (inputId, data) => validate(data).then(() => {
  const id = inputId || shortid.generate()

  const time = inputId ? 'updatedAt' : 'createdAt'
  data[time] = new Date()
  data.slug = slugify(data.name)

  return generators
    .findOneAndUpdate({
      id
    }, {
      $set: data
    }, {upsert: true})
    .then(prepare)
})

const fork = (id, author) => {
  return findById(id)
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
  return generators.findOneAndDelete({id})
}

const checkOwner = (user, id) => {
  return generators.findOne({id})
    .then(found => {
      return found ? (user.profileId === found.author.id) : false
    })
}

module.exports = {
  findById,
  findAll,
  findFeatured,
  save,
  fork,
  remove,
  checkOwner
}
