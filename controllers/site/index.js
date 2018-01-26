'use strict';
const _ = require('lodash');

const render = require('../../lib/render');
const Promise = require("bluebird");
const SliderImage = Promise.promisifyAll(require('../../models/sliderImage'));
const PhotoIndexImage = Promise.promisifyAll(require('../../models/photoIndexImage'));
const Page = Promise.promisifyAll(require('../../models/page'));


module.exports = function *() {
    const doc = yield Promise.promisify(Page.findOne, {context: Page})({'page': 'index'});

    let images = yield SliderImage.findAsync();
    images = _.sortBy(images, ['order']);


    let photoIndexImages = yield PhotoIndexImage.findAsync();
    photoIndexImages = _.sortBy(photoIndexImages, ['order']);
    this.body = yield render.site('index', {doc: doc, images: images, photoIndexImages: photoIndexImages});
};
