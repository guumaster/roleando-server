'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('lodash'),
    has = _require.has,
    find = _require.find,
    filter = _require.filter,
    merge = _require.merge;

var db = require('../db');

var generators = db.get('generator_tables');

module.exports = function (main) {
  if (!main || !has(main, 'data.alias')) return main;

  return generators.aggregate([{
    $match: { id: main.id }
  }, {
    $unwind: '$data.remotes'
  }, {
    $graphLookup: {
      from: 'generator_tables',
      startWith: '$data.remotes',
      connectFromField: 'data.remotes',
      connectToField: 'id',
      as: 'child',
      maxDepth: 10
    }
  }, {
    $unwind: '$child'
  }, {
    $project: {
      'id': 1,
      'data.alias': 1,
      'child.name': 1,
      'child.id': 1,
      'child.data.alias': 1,
      'child.data.tpls': 1,
      'child.data.tables': 1
    }
  }, {
    $replaceRoot: {
      newRoot: {
        alias: '$child.data.alias',
        id: '$child.id',
        name: '$child.name',
        tpls: '$child.data.tpls',
        tables: '$child.data.tables'

      }
    }
  }]).then(function (list) {
    if (!list) return main;

    return addFlattenAliases(main, list);
  }).catch(function (err) {
    console.log(err);
    return main;
  });
};

var addFlattenAliases = function addFlattenAliases(main, list) {
  var map = mapAliases((0, _keys2.default)(main.data.alias), main.data.alias, list);

  main.data.children = filter(list, 'alias').reduce(function (final, curr) {
    if (!curr.alias) return final;

    return merge(final, mapAliases((0, _keys2.default)(curr.alias), curr.alias, list));
  }, map);

  return main;
};

var mapAliases = function mapAliases(keys, alias, list) {
  return keys.reduce(function (final, curr) {
    final[curr] = find(list, function (item) {
      return item.id === alias[curr];
    });
    return final;
  }, {});
};