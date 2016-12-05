var render = require('../../lib/render');
var db = require('../../lib/db');

module.exports = function *(page) {
    var content = db.parse(page);
    this.body = yield render.admin('main', { content: content, 'page': page });
};