'use strict';
const parse = require('co-body');
const Promise = require("bluebird");
const helpers = require('../../../lib/helpers');
const Album = require('../../../models/album');

module.exports = function *() {
    let data = yield parse(this);
    
    const uri = data.uri;
    data.uri = helpers.transliterate(data.title);
    data.date = new Date();
    yield Promise.promisify(Album.findOneAndUpdate, {context: Album})({'uri': uri}, data);
    this.redirect('/admin/media');

};
