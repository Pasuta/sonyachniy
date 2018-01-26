'use strict';

const fs = require('fs');
const parse = require('co-body');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const Promise = require("bluebird");
const PhotoIndexImage = Promise.promisifyAll(require('../../../models/photoIndexImage'));
const lib = require('../../../lib/helpers');

module.exports = function *() {

    let data = yield parse(this);
    data = lib.convertToObject(data);

    const image = yield Promise.promisify(PhotoIndexImage.findOne, {context: PhotoIndexImage})({'_id': data.id});
    if (!image) {
        this.body = yield {
            "status": "ok",
            "code": 200,
            "result": 'image not found'
        };
    } else {
        fs.unlinkSync(appDir + '/public' + image.path);
        yield Promise.promisify(PhotoIndexImage.remove, {context: PhotoIndexImage})({'_id': data.id});
        this.body = yield {
            "status": "ok",
            "code": 200,
            "result": 'image has been removed'
        };
    }
};

