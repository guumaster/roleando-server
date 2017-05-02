'use strict';

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _monk2.default)(_config2.default.database.url);