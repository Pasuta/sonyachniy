'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PhotoSchema = new Schema({
  order: Number,
  path: String,
  _album : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', PhotoSchema);
