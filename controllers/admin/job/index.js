const render = require('../../../lib/render');

module.exports = function *() {
    this.body = yield render.admin('jobform', { });
};