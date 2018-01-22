'use strict';

var render = require('../../lib/render');
const Promise = require("bluebird");
const SliderImage = Promise.promisifyAll(require('../../models/sliderImage'));
const _ = require('lodash');

module.exports = function *() {
    let images = yield SliderImage.findAsync();
    images = _.sortBy(images, ['order']);
    this.body = yield render.site('index', {images: images});
};
