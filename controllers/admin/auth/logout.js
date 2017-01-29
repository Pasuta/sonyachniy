'use strict';

module.exports = function *() {
  this.cookies.set('sonyachniy-session', null);
  this.redirect('/admin/login');
};
