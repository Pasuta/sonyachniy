const path = require('path');

const configurator =  {

  init: function() {
    this._config = {};
    this.env = process.env.NODE_ENV || 'dev';
    this.directory = path.join(path.resolve(__dirname, '../'), 'config');
  },

  get: function (name, property) {

  }

};

module.exports = configurator.init();
