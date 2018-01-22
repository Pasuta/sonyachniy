'use strict';

const fs = require('fs');
const parse = require('co-body');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const Promise = require("bluebird");
const SliderImage = Promise.promisifyAll(require('../../../models/sliderImage'));
const lib = require('../../../lib/helpers');

module.exports = function *() {

    let data = yield parse(this);
    data = lib.convertToObject(data);

    const image = yield Promise.promisify(SliderImage.findOneAndUpdate, {context: SliderImage})({'_id': data.id}, {order: data.order});
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

