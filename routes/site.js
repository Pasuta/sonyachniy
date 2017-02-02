'use strict';
const route = require('koa-route');

module.exports = function(app) {
  app.use(route.get('/', require('../controllers/site/index')));
  app.use(route.get('/contacts', require('../controllers/site/contacts')));
  app.use(route.get('/about', require('../controllers/site/about')));
  app.use(route.get('/media', require('../controllers/site/media')));
  app.use(route.get('/common', require('../controllers/site/common')));
  app.use(route.get('/childtocamp', require('../controllers/site/childtocamp')));
  app.use(route.get('/sendtocamp', require('../controllers/site/sendtocamp')));
  app.use(route.get('/daily', require('../controllers/site/daily')));
  app.use(route.get('/eat', require('../controllers/site/eat')));
  app.use(route.get('/visit', require('../controllers/site/visit')));
  app.use(route.get('/attention', require('../controllers/site/attention')));
  app.use(route.get('/eating', require('../controllers/site/eating')));
  app.use(route.get('/medical', require('../controllers/site/medical')));
  app.use(route.get('/jobs', require('../controllers/site/jobs')));
  app.use(route.get('/rules', require('../controllers/site/rules')));
  app.use(route.get('/rulesComein', require('../controllers/site/rulesComein')));
};
