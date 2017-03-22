const render = require('../../../lib/render');

module.exports = function *() {
    const posts = [];
    this.body = yield render.admin('createNewAlbum', { posts: posts });
};
