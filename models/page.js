'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PageSchema = new Schema({
  title: String,
  page: String,
  textLeft: String,
  textRight: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', PageSchema);
