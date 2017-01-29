'use strict';
const configurator = require('../modules/configurator');

module.exports = function *(next) {
  const incoming = this.req.url.split('/')[1];
  if (incoming == 'admin') {
    const cookies = this.cookies.get('sonyachniy-session');
    const config = configurator.get('app', 'admin');
    config.authToken == cookies ? yield next :  this.redirect('/admin/login');
  } else {
    yield next;
  }
};
