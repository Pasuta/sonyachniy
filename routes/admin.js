'use strict';
const route = require('koa-route');
// const auth = require('../middlewares/auth');

module.exports = function(app) {
    app.use(route.get('/admin/test', require('../controllers/admin/test')));
    app.use(route.get('/admin/login', require('../controllers/admin/login')));

    // app.use(route.get('/admin', auth, require('../controllers/admin/index')));
    app.use(route.get('/admin', require('../controllers/admin/index')));

    app.use(route.get('/admin/main/:page', require('../controllers/admin/main')));
    app.use(route.get('/admin/logout', require('../controllers/admin/auth/logout')));

    app.use(route.post('/admin/login', require('../controllers/admin/auth/login')));
    app.use(route.post('/mail', require('../controllers/site/mail')));
    app.use(route.post('/upload/:name', require('../controllers/admin/upload')));
    app.use(route.post('/admin', require('../controllers/admin/admin')));

};