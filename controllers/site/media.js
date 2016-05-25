var render = require('../../lib/render');

module.exports = function *() {
    var page = this.query.page;
    if(!page) page = 1;
    if(isNaN(page) || (page < 1 && page > 5 ) ) page = 1;
    this.body = yield render.site('media', { page: page, posts: [0,1,2,3,4,5,6,7,8,9] });
};