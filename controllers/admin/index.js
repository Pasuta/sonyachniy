'use strict';
var render = require('../../lib/render');

module.exports = function *(next) {
    yield next;
    this.body = yield render.admin('index');
};
