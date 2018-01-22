'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SliderImageSchema = new Schema({
  path: String,
  order: Number
});

module.exports = mongoose.model('SliderImage', SliderImageSchema);
