const render = require('../../../lib/render');
const Promise = require("bluebird");
const PhotoIndexImage = Promise.promisifyAll(require('../../../models/photoIndexImage'));

module.exports = function *() {
    const photoIndexImages = yield PhotoIndexImage.findAsync();
    this.body = yield render.admin('photoIndex', { photoIndexImages : photoIndexImages });
};
