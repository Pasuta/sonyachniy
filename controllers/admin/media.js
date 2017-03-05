const render = require('../../lib/render');
const Promise = require("bluebird");
const Album = Promise.promisifyAll(require('../../models/album'));

module.exports = function *() {
    const albums = yield Album.findAsync();
    this.body = yield render.admin('media', { albums: albums});
};