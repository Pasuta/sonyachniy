'use strict';
var parse = require('co-body');
const helpers = require('../../lib/helpers');
const Promise = require("bluebird");
const Page = require('../../models/page');

module.exports = function *() {

  let ret = { 'status': 200, 'test': 'OK' };
  let data = yield parse(this);
  data = helpers.convertToObject(data);

  data.updated = new Date();
  yield Promise.promisify(Page.findOneAndUpdate, {context: Page})({'page': data.page}, data);

  this.body = yield ret;
};
