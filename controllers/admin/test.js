'use strict';
let render = require('../../lib/render');
// let Page = require('../../models/page');
//
// var test = new Page({ title: 'test' });
// test.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });


module.exports = function *() {
  this.body = yield render.admin('index', {});
};
