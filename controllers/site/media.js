const render = require('../../lib/render');
const Promise = require("bluebird");
const _ = require('lodash');
const moment = require('moment');
moment.locale('uk');

const Album = Promise.promisifyAll(require('../../models/album'));
const Photo = Promise.promisifyAll(require('../../models/photo'));

module.exports = function *() {
    const albums = yield Album.findAsync();
    const albumsM = [];
    for (let a in albums) {
        let photo = yield Promise.promisify(Photo.find, {context: Photo})({'_album': albums[a]._id});
        if (!photo.length) continue;
        photo = _.sortBy(photo, ['order']);
        albums[a].count = photo.length;
        const time = moment(albums[a].date).format('LL');
        const d = {
            count: photo.length,
            preview: photo[0],
            time: time
        };
        const m = Object.assign({}, albums[a]._doc, d);
        albumsM.push(m);
    }

    this.body = yield render.site('media', { albums: albumsM});
};