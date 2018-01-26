'use strict';

const parse = require('co-busboy');
const path = require('path');
const saveTo = require('save-to');
const appDir = path.dirname(require.main.filename);
const filePath = path.join(appDir, 'public', 'site', 'images', 'photoIndex');
const Promise = require("bluebird");
const PhotoIndexImage = Promise.promisifyAll(require('../../../models/photoIndexImage'));

module.exports = function *() {

    const parts = parse(this, {
        autoFields: true
    });

    const files = [];

    let part;
    while (part = yield parts) {
        const imagePath =  path.join(path.join('site', 'images', 'photoIndex'), part.filename);
        const finalFilePlace = path.join(filePath, part.filename);
        files.push(finalFilePlace);
        yield saveTo(part, finalFilePlace);

        const photoIndex = new PhotoIndexImage({
            'path': '/' + imagePath,
            'title': '',
            'text': '',
            'link': '',
            'order': 0
        });
        const save = Promise.promisifyAll(photoIndex);
        yield save.saveAsync();
    }

    this.body = yield {
        "status": "ok",
        "code": 200,
        "result": files
    };
};

