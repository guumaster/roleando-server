'use strict';

var sm = require('sitemap');
var express = require('express');
var router = express.Router();

var sitemap = sm.createSitemap({
  hostname: 'https://roleando.herokuapp.com',
  cacheTime: 86400000,
  urls: [{ url: '/generadores/', changefreq: 'weekly', priority: 0.7 }, { url: '/generadores/destacados', changefreq: 'weekly', priority: 0.8 }, { url: '/', changefreq: 'monthly', priority: 0.2 }]
});

router.get('/sitemap.xml', function (req, res) {
  sitemap.toXML(function (err, xml) {
    if (err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });
});

module.exports = router;