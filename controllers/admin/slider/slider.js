const render = require('../../../lib/render');
const Promise = require("bluebird");
const SliderImage = Promise.promisifyAll(require('../../../models/sliderImage'));

module.exports = function *() {
    const sliderImages = yield SliderImage.findAsync();
    this.body = yield render.admin('slider', { sliderImages: sliderImages});
};
