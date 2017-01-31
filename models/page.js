'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const configurator = require('../modules/configurator');

let PageSchema = new Schema({
  title: String,
  uri: String,
  text: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', PageSchema);
