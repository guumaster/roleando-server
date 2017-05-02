'use strict';

var shortid = require('shortid');
var slug = require('slug');
var merge = require('lodash/merge');
var clone = require('lodash/clone');
var has = require('lodash/has');
var map = require('lodash/map');
var partialRight = require('lodash/partialRight');
var unset = require('lodash/unset');

var validate = require('./validator');
var link = require('./link');
var db = require('../db');
var addHelperTables = require('./aggregate_subtables');

var DEFAULT_DATA = {
  listed: true,
  featured: false
};
var dontExists = { $exists: false };

var generators = db.get('generator_tables');
var slugify = function slugify(str) {
  return slug((str || '').toLowerCase());
};

var prepare = function prepare(table) {
  if (!table) return;

  unset(table, ['_id', 'listed', 'deleted']);
  return link(table);
};
var prepareList = partialRight(map, prepare);
var listOpts = {
  fields: { data: 0 },
  sort: { createdAt: -1 }
};

var findAll = function findAll() {
  return generators.find({ listed: true, deleted: dontExists }, listOpts).then(prepareList);
};
var findFeatured = function findFeatured() {
  return generators.find({
    listed: true,
    featured: true,
    deleted: dontExists
  }, listOpts).then(prepareList);
};

var findById = function findById(id) {
  return generators.findOne({ id: id, deleted: dontExists }).then(addHelperTables).then(prepare);
};

var save = function save(inputId, inputData) {
  return validate(inputData).then(function () {
    var id = inputId || shortid.generate();

    var data = merge({}, DEFAULT_DATA, inputData);

    var time = inputId ? 'updatedAt' : 'createdAt';
    data[time] = new Date();
    data.slug = slugify(data.name);

    return generators.findOneAndUpdate({
      id: id,
      deleted: dontExists
    }, {
      $set: data
    }, { upsert: true }).then(prepare);
  });
};

var fork = function fork(id, author) {
  return generators.findOne({ id: id, deleted: dontExists }).then(function (parent) {
    if (!parent) {
      return;
    }

    var newId = shortid.generate();
    var forked = merge(clone(parent), { id: newId, author: author, parent: parent.id });
    return save(newId, forked);
  });
};

var remove = function remove(id) {
  return generators.findOneAndUpdate({ id: id }, { $set: { deleted: true } });
};

var checkOwner = function checkOwner(user, id) {
  return generators.findOne({ id: id }).then(function (found) {
    return found ? user.profileId === found.author.id : false;
  });
};

var setFeatured = function setFeatured(id, featured) {
  return generators.update({ id: id }, {
    $set: { featured: featured }
  });
};

var setListed = function setListed(id, listed) {
  return generators.update({ id: id }, {
    $set: { listed: listed }
  });
};

module.exports = {
  findById: findById,
  findAll: findAll,
  findFeatured: findFeatured,
  save: save,
  fork: fork,
  remove: remove,
  checkOwner: checkOwner,
  setFeatured: setFeatured,
  setListed: setListed
};