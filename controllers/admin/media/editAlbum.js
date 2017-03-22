'use strict';
const render = require('../../../lib/render');
const parse = require('co-body');
const co = require('co');
const Promise = require("bluebird");
const helpers = require('../../../lib/helpers');
const Album = require('../../../models/album');
const Photo = require('../../../models/photo');

module.exports = function *(uri) {
    const album = yield Promise.promisify(Album.findOne, {context: Album})({'uri': uri});
    if (!album) this.redirect('/admin/media');
    this.body = yield render.admin('editAlbum', { album: album, date: album.date.toString() });
};
