
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

// "database"

var posts = [];

// middleware

app.use(logger());

// route middleware

//app.use(route.get('/', list));
app.use(route.get('/', require('./controllers/site/index')));
app.use(route.get('/contacts', require('./controllers/site/contacts')));
app.use(route.get('/about', require('./controllers/site/about')));

app.use(serve(__dirname + '/public'));

app.listen(3001);
console.log('listening on port 3001');