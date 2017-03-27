'use strict';
var parse = require('co-body');
// var lib = require('../../public/admin/js/lib.js');
var db = require('../../lib/db');
const helpers = require('../../lib/helpers');

module.exports = function *(next) {
    yield next;
    var post = yield parse(this);
    post = helpers.convertToObject(post);

    for (var i in post) {
        if (post.hasOwnProperty(i)) {
            if(i == '' || i == 'page') continue;
            db.save(post.page, i, post[i]);
        }
    }

    this.body = yield {"status": 200};
};
