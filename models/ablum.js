'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const configurator = require('../modules/configurator');

let Page = new Schema({
  title: String,
  text: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
Page = mongoose.model('Page', visitSchema);
module.exports = visitSchema;
