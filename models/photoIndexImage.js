'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PhotoIndexImageSchema = new Schema({
  path: String,
  title: String,
  text: String,
  link: String,
  order: Number
});

module.exports = mongoose.model('PhotoIndexImage', PhotoIndexImageSchema);
