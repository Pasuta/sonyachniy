const render = require('../../lib/render');

const Promise = require("bluebird");
const Page = Promise.promisifyAll(require('../../models/page'));

module.exports = function *() {

    const doc = yield Promise.promisify(Page.findOne, {context: Page})({'page': 'contact'});
    if (!doc) {
        this.type = 'html';
        this.body = yield render.site('404', { });
    } else {
        this.body = yield render.site('contacts', { doc: doc });
    }

};