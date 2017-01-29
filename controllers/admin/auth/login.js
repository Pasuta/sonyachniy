'use strict';
var parse = require('co-body');
const configurator = require('../../../modules/configurator');
const helpers = require('../../../lib/helpers');

module.exports = function *() {

  var config = configurator.get('app', 'admin');
  var ret = { 'status': 200, 'test': 'OK' };
  var data = yield parse(this);
  data = helpers.convertToObject(data);

  if (data.email != config.email || data.password != config.password) {
    ret = {"status": 500, 'text': 'Емейл або пароль не вірні'};
  } else {
    const cookies = this.cookies.get('sonyachniy-session');
    if (!cookies && cookies != config.authToken) this.cookies.set('sonyachniy-session', config.authToken);
  }
  this.body = yield ret;
};
