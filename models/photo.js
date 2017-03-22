'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const configurator = require('../modules/configurator');

let PhotoSchema = new Schema({
  order: Number,
  _album : { type: Number, ref: 'Album' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', PhotoSchema);
