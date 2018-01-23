const render = require('../../lib/render');
const path = require('path');
const fs = require('fs');

const Promise = require("bluebird");
const Page = Promise.promisifyAll(require('../../models/page'));

const appDir = path.dirname(require.main.filename);
const filePath = path.join(appDir, 'public', 'download');

module.exports = function *(page) {
    const doc = yield Promise.promisify(Page.findOne, {context: Page})({'page': page});
    let file = '';

    if (!doc) {
        this.type = 'html';
        this.body = yield render.site('404', { });
    } else {
        if (page === 'jobs') {
            file = fs.readdirSync(filePath)[0];
        }
        this.body = yield render.site('content', { doc: doc, file: file });
    }
};