
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
let serve = require('koa-static');

// "database"

var posts = [];

// middleware

app.use(logger());

// route middleware

//app.use(route.get('/', list));
app.use(route.get('/', require('./controllers/site/index')));
app.use(route.get('/post/new', add));
app.use(route.get('/post/:id', show));
app.use(route.post('/post', create));

console.log(__dirname);
app.use(serve(__dirname + '/public'));

// route definitions

/**
 * Post listing.
 */

function *list() {
    this.body = yield render('list', { posts: posts });
}

/**
 * Show creation form.
 */

function *add() {
    this.body = yield render('new');
}

/**
 * Show post :id.
 */

function *show(id) {
    var post = posts[id];
    if (!post) this.throw(404, 'invalid post id');
    this.body = yield render('show', { post: post });
}

/**
 * Create a post.
 */

function *create() {
    var post = yield parse(this);
    var id = posts.push(post) - 1;
    post.created_at = new Date;
    post.id = id;
    this.redirect('/');
}

// listen

app.listen(3000);
console.log('listening on port 3000');