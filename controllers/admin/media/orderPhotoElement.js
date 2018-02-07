'use strict';

const parse = require('co-body');
const Promise = require("bluebird");
const Photo = Promise.promisifyAll(require('../../../models/photo'));
const lib = require('../../../lib/helpers');

module.exports = function *() {

    let data = yield parse(this);
    data = lib.convertToObject(data);

    const image = yield Promise.promisify(Photo.findOneAndUpdate, {context: Photo})({'_id': data.id}, {order: data.order});
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

