'use strict';
const route = require('koa-route');

module.exports = function(app) {
    app.use(route.get('/admin/login', require('../controllers/admin/login')));
    app.use(route.get('/admin', require('../controllers/admin/index')));
    app.use(route.get('/admin/media', require('../controllers/admin/media/media')));
    app.use(route.get('/admin/media/createNewAlbum', require('../controllers/admin/media/createNewAlbum')));
    app.use(route.get('/admin/media/:uri/edit', require('../controllers/admin/media/editAlbum')));

    app.use(route.get('/admin/content/:page', require('../controllers/admin/page')));
    app.use(route.get('/admin/logout', require('../controllers/admin/auth/logout')));

    app.use(route.get('/admin/slider', require('../controllers/admin/slider/slider')));
    app.use(route.get('/admin/job/jobform', require('../controllers/admin/job/index')));

    app.use(route.get('/admin/photoIndex/index', require('../controllers/admin/photoIndex/index')));

    app.use(route.post('/admin/job/upload', require('../controllers/admin/job/upload')));
    app.use(route.post('/admin/updatePage', require('../controllers/admin/updatePage')));

    app.use(route.post('/admin/login', require('../controllers/admin/auth/login')));
    app.use(route.post('/mail', require('../controllers/site/mail')));
    app.use(route.post('/upload/:name', require('../controllers/admin/upload')));

    app.use(route.post('/admin/media/deleteAlbum', require('../controllers/admin/media/deleteAlbumPost')));
    app.use(route.post('/admin/media/createNewAlbumPost', require('../controllers/admin/media/createNewAlbumPost')));
    app.use(route.post('/admin/media/updateAlbumPost', require('../controllers/admin/media/updateAlbumPost')));
    app.use(route.post('/admin/media/uploadMedia', require('../controllers/admin/media/uploadMedia')));
    app.use(route.post('/admin/media/removePhotoElement', require('../controllers/admin/media/removePhotoElement')));
    app.use(route.post('/admin/media/orderPhotoElement', require('../controllers/admin/media/orderPhotoElement')));

    app.use(route.post('/admin/media/uploadSlider', require('../controllers/admin/slider/uploadSlider')));
    app.use(route.post('/admin/media/removeSliderElement', require('../controllers/admin/slider/removeSliderElement')));
    app.use(route.post('/admin/media/orderSliderElement', require('../controllers/admin/slider/orderSliderElement')));

    app.use(route.post('/admin/photoIndex/uploadPhotoIndex', require('../controllers/admin/photoIndex/uploadPhotoIndex')));
    app.use(route.post('/admin/photoIndex/removePhotoIndexElement', require('../controllers/admin/photoIndex/removePhotoIndexElement')));
    app.use(route.post('/admin/photoIndex/dataPhotoIndexElement', require('../controllers/admin/photoIndex/dataPhotoIndexElement')));
};
