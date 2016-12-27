/**
 * Module dependencies.
 */
var fs = require('fs');
var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = koa();
var serve = require('koa-static');

app.use(serve(__dirname + '/public'));
app.use(serve('sitemap.xml'));
app.use(serve('robots.txt'));
//app.use(logger());

// route middleware

//app.use(route.get('/', list));
app.use(route.get('/', require('./controllers/site/index')));
app.use(route.get('/contacts', require('./controllers/site/contacts')));
app.use(route.get('/about', require('./controllers/site/about')));
app.use(route.get('/media', require('./controllers/site/media')));
app.use(route.get('/common', require('./controllers/site/common')));
app.use(route.get('/childtocamp', require('./controllers/site/childtocamp')));
app.use(route.get('/sendtocamp', require('./controllers/site/sendtocamp')));
app.use(route.get('/daily', require('./controllers/site/daily')));
app.use(route.get('/eat', require('./controllers/site/eat')));
app.use(route.get('/visit', require('./controllers/site/visit')));
app.use(route.get('/attention', require('./controllers/site/attention')));
app.use(route.get('/eating', require('./controllers/site/eating')));
app.use(route.get('/medical', require('./controllers/site/medical')));
app.use(route.get('/jobs', require('./controllers/site/jobs')));

app.use(route.get('/admin/login', require('./controllers/admin/login')));
app.use(route.get('/admin', require('./controllers/admin/index')));
app.use(route.get('/admin/main/:page', require('./controllers/admin/main')));
app.use(route.post('/mail', require('./controllers/site/mail')));
// app.use(route.post('/admin/login', require('./controllers/site/admin/login')));
// app.use(route.post('/admin/logout', require('./controllers/site/admin/logout')));
app.use(route.post('/upload/:name', require('./controllers/admin/upload')));

app.use(route.post('/admin', require('./controllers/admin/admin')));
app.use(function *pageNotFound(next){
    yield next;

    if (404 != this.status) return;

    // we need to explicitly set 404 here
    // so that koa doesn't assign 200 on body=
    this.status = 404;

    switch (this.accepts('html', 'json')) {
        case 'html':
            this.type = 'html';
            this.body = yield render.site('404', { });
            break;
        case 'json':
            this.body = {
                message: 'Page Not Found2'
            };
            break;
        default:
            this.type = 'text';
            this.body = 'Page Not Found3';
    }
});



app.listen(3001);
console.log('listening on port 3001');
