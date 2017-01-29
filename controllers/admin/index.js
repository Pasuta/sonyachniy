'use strict';
var render = require('../../lib/render');

module.exports = function *(next) {
    yield next;
    console.log(2);
    this.body = yield render.admin('index');
};
