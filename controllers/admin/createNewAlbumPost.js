'use strict';
const parse = require('co-body');
const Promise = require("bluebird");
const helpers = require('../../lib/helpers');
const Album = require('../../models/album');

module.exports = function *() {

    let data = yield parse(this);
    data.uri = helpers.transliterate(data.title);

    const album = new Album(data);
    const save = Promise.promisifyAll(album);
    yield save.saveAsync();
    this.redirect('/admin/media');

};
