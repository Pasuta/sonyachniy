'use strict';
const render = require('../../lib/render');
const Promise = require("bluebird");
const Page = Promise.promisifyAll(require('../../models/page'));

module.exports = function *(page) {

    const doc = yield Promise.promisify(Page.findOne, {context: Page})({'page': page});
    if (!doc) {
        this.type = 'html';
        this.body = yield render.site('404', { });
    } else {
        this.body = yield render.admin('page', { doc: doc, 'page': page });
    }
};
