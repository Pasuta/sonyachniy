'use strict';

const fs = require('fs');
const path = require('path');
const parse = require('co-body');
const Promise = require("bluebird");
const appDir = path.dirname(require.main.filename);
const Album = require('../../../models/album');
const Photo = require('../../../models/photo');

module.exports = function *() {
    let data = yield parse(this);

    const album = yield Promise.promisify(Album.findOne, {context: Album})({'_id': data.id});
    if (album) {
        const photos = yield Promise.promisify(Photo.find, {context: Photo})({'_album': album._id});
        for (let p in photos) {
            fs.unlinkSync(appDir + '/public' + photos[p].path);
            yield Promise.promisify(Photo.remove, {context: Photo})({'_id': photos[p]._id});
        }
        yield Promise.promisify(Album.remove, {context: Album})({'_id': data.id});
    }

    this.redirect('/admin/media');
};
