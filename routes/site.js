'use strict';
const route = require('koa-route');

module.exports = function(app) {
  app.use(route.get('/', require('../controllers/site/index')));
  app.use(route.get('/contacts', require('../controllers/site/contacts')));
  app.use(route.get('/media', require('../controllers/site/media')));
  app.use(route.get('/album/:id', require('../controllers/site/album')));
  app.use(route.get('/content/:page', require('../controllers/site/content')));
};
