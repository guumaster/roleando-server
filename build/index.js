'use strict';

var _nuxt = require('nuxt');

var _nuxt2 = _interopRequireDefault(_nuxt);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nuxtConfig = require('../nuxt.config.js');

var app = (0, _express2.default)({
  name: _config2.default.name
});

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_routes2.default);

var nuxt = new _nuxt2.default(nuxtConfig);
app.use(nuxt.render);

if (nuxtConfig.dev) {
  nuxt.build().catch(function (error) {
    console.error(error);
    process.exit(1);
  });
}

app.listen(_config2.default.port, function () {
  console.log('Server listening on ' + _config2.default.port);
});