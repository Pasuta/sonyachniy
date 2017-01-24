'use strict';
const render = require('../lib/render');

module.exports = function* (next) {
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
};
// module.exports = 1;
