'use strict';
const fs = require('fs');
const logger = require('koa-logger');
const koa = require('koa');
const app = koa();
const mongoose = require('mongoose');
const serve = require('koa-static');
const configurator = require('./modules/configurator');
// const dbConfig = configurator.get('db');

// mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.name}`);

app.use(serve(__dirname + '/public'));
app.use(serve('sitemap.xml'));
app.use(serve('robots.txt'));
if (configurator.env === 'production') app.use(logger());

require('./routes/site')(app);
require('./routes/admin')(app);

app.use(require('./middlewares/page404'));
app.listen(configurator.get('app', 'port'));
console.log(`listening on port ${configurator.get('app', 'port')}`);
