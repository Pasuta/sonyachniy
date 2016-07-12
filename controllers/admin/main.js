var render = require('../../lib/render');
var db = require('../../lib/db');

module.exports = function *() {

    var content = db.parse('main');

    this.body = yield render.admin('main', { content: content, 'page': 'main' });
};