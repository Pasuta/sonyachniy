var render = require('../../lib/render');

module.exports = function *() {
    var posts = [];
    this.body = yield render.site('jobs', { posts: posts });
};
