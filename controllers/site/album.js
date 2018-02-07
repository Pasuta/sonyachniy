const render = require('../../lib/render');
const Promise = require("bluebird");
const Album = require('../../models/album');
const Photo = require('../../models/photo');

module.exports = function *(id) {
    const album = yield Promise.promisify(Album.findOne, {context: Album})({'_id': id});
    if (!album) this.redirect('/404');
    const photos = yield Promise.promisify(Photo.find, {context: Photo})({'_album': album._id});
    this.body = yield render.site('album', { album: album, date: album.date.toString(), photos: photos });
};
