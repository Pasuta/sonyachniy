'use strict';
const render = require('../../../lib/render');
const Promise = require("bluebird");
const Album = require('../../../models/album');
const Photo = require('../../../models/photo');

module.exports = function *(uri) {
    const album = yield Promise.promisify(Album.findOne, {context: Album})({'uri': uri});
    if (!album) this.redirect('/admin/media');
    const photos = yield Promise.promisify(Photo.find, {context: Photo})({'_album': album._id});
    this.body = yield render.admin('editAlbum', { album: album, date: album.date.toString(), photos: photos });
};
