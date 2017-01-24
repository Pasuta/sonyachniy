'use strict';
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const configurator =  {

  init: function () {
    this._config = {};
    this.env = process.env.NODE_ENV || 'dev';
    this.directory = path.join(path.resolve(__dirname, '../'), 'config');

    const self = this;

    let files = fs.readdirSync(self.directory);

    files.forEach(function (file) {
      const fileName = file.split('.')[0];
      const filePath = `${self.directory}/${file}`;
      self._config[fileName] = require(filePath);
    });

    return self;
  },

  get: function (name, property) {
    const config = this._config;
    const env = this.env;
    let sectionConfig;

    if (name in config) {
      sectionConfig = config[name];
      if (sectionConfig[env] && sectionConfig[env][property]) {
        return sectionConfig[env][property];
      } else if (sectionConfig['all'] && sectionConfig['all'][property]) {
        return sectionConfig['all'][property];
      } else if (_.isUndefined(property) && sectionConfig){
          return sectionConfig[env];
      }else {
        throw new Error(`Config not setted`);
      }
    } else {
      throw new Error(`Wrong config section`);
    }
  }

};

module.exports = configurator.init();
