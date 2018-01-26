'use strict';

const parse = require('co-body');
const Promise = require("bluebird");
const PhotoIndexImage = Promise.promisifyAll(require('../../../models/photoIndexImage'));
const lib = require('../../../lib/helpers');

module.exports = function *() {

    let data = yield parse(this);
    data = lib.convertToObject(data);

    const image = yield Promise.promisify(PhotoIndexImage.findOneAndUpdate, {context: PhotoIndexImage})({'_id': data.id}, data);
    if (!image) {
        this.body = yield {
            "status": "ok",
            "code": 200,
            "result": 'image not found'
        };
    } else {
        this.body = yield {
            "status": "ok",
            "code": 200,
            "result": 'image has been updated'
        };
    }
};

