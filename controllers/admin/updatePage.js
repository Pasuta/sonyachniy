'use strict';
var parse = require('co-body');
const helpers = require('../../lib/helpers');

module.exports = function *() {

  let ret = { 'status': 200, 'test': 'OK' };
  let data = yield parse(this);
  console.log(data);
  //
  // if (data.email != config.email || data.password != config.password) {
  //   ret = {"status": 500, 'text': 'Емейл або пароль не вірні'};
  // } else {
  //   const cookies = this.cookies.get('sonyachniy-session');
  //   if (!cookies && cookies != config.authToken) this.cookies.set('sonyachniy-session', config.authToken);
  // }
  this.body = yield ret;
};
