'use strict';
var parse = require('co-body');

module.exports = function *() {
  var post = yield parse(this);
  
  console.log(post);
  
  this.body = yield {"status": 200};
};