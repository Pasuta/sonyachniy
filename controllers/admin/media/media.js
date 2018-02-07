const render = require('../../../lib/render');
const Promise = require("bluebird");
const Album = Promise.promisifyAll(require('../../../models/album'));
const Photo = Promise.promisifyAll(require('../../../models/photo'));

module.exports = function *() {
    const albums = yield Album.findAsync();
    const albumsM = [];
    for (let a in albums) {
        const photo = yield Promise.promisify(Photo.find, {context: Photo})({'_album': albums[a]._id});
        albums[a].count = photo.length;
        const m = Object.assign({}, albums[a]._doc, {count: photo.length});
        albumsM.push(m);
    }
    this.body = yield render.admin('media', { albums: albumsM});
};
