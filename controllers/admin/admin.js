'use strict';
var parse = require('co-body');
var lib = require('../../public/admin/js/lib.js');
var db = require('../../lib/db');

module.exports = function *() {
    var post = yield parse(this);

    post = lib.convertToObject(post);
    var content = db.parse(post.page);
    console.log(post);
    console.log(content);

    this.body = yield {"status": 200};
};