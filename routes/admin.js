'use strict';
const route = require('koa-route');
// const auth = require('../middlewares/auth');

module.exports = function(app) {
    app.use(route.get('/admin/test', require('../controllers/admin/test')));
    app.use(route.get('/admin/login', require('../controllers/admin/login')));
    app.use(route.get('/admin', require('../controllers/admin/index')));
    app.use(route.get('/admin/media', require('../controllers/admin/media/media')));
    app.use(route.get('/admin/media/createNewAlbum', require('../controllers/admin/media/createNewAlbum')));
    app.use(route.get('/admin/media/:uri/edit', require('../controllers/admin/media/editAlbum')));

    app.use(route.get('/admin/content/:page', require('../controllers/admin/page')));
    app.use(route.get('/admin/logout', require('../controllers/admin/auth/logout')));

    app.use(route.get('/admin/slider', require('../controllers/admin/slider/slider')));

    app.use(route.post('/admin/updatePage', require('../controllers/admin/updatePage')));

    app.use(route.post('/admin/login', require('../controllers/admin/auth/login')));
    app.use(route.post('/mail', require('../controllers/site/mail')));
    app.use(route.post('/upload/:name', require('../controllers/admin/upload')));
    app.use(route.post('/admin/media/createNewAlbumPost', require('../controllers/admin/media/createNewAlbumPost')));
    app.use(route.post('/admin/media/updateAlbumPost', require('../controllers/admin/media/updateAlbumPost')));
    app.use(route.post('/admin/media/uploadMedia', require('../controllers/admin/media/uploadMedia')));

    app.use(route.post('/admin/media/uploadSlider', require('../controllers/admin/slider/uploadSlider')));
    app.use(route.post('/admin/media/removeSliderElement', require('../controllers/admin/slider/removeSliderElement')));
    app.use(route.post('/admin/media/orderSliderElement', require('../controllers/admin/slider/orderSliderElement')));
};
