'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AlbumSchema = new Schema({
  title: String,
  uri: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', AlbumSchema);
