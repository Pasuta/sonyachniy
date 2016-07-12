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

app.use(route.get('/admin/login', require('./controllers/admin/login')));
app.use(route.get('/admin', require('./controllers/admin/index')));
app.use(route.get('/admin/main', require('./controllers/admin/main')));
app.use(route.get('/admin/contact', require('./controllers/admin/contact')));
app.use(route.get('/admin/parents/common', require('./controllers/admin/parentscommon')));
app.use(route.get('/admin/parents/childtocamp', require('./controllers/admin/parentschildtocamp')));
app.use(route.get('/admin/parents/sendtocamp', require('./controllers/admin/parentssendtocamp')));
app.use(route.get('/admin/parents/daily', require('./controllers/admin/parentsdaily')));
app.use(route.get('/admin/parents/eat', require('./controllers/admin/parentseat')));
app.use(route.get('/admin/parents/visit', require('./controllers/admin/parentsvisit')));
app.use(route.get('/admin/parents/attention', require('./controllers/admin/parentsattention')));
app.use(route.get('/admin/about', require('./controllers/admin/about')));
app.use(route.get('/admin/media', require('./controllers/admin/media')));

app.use(route.post('/mail', require('./controllers/site/mail')));
app.use(route.post('/upload', require('./controllers/admin/upload')));
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

app.use(serve(__dirname + '/public'));

app.listen(3001);
console.log('listening on port 3001');