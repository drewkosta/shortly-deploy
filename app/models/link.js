var db = require('../config');
var mongoose = require('mongoose');

linkSchema = mongoose.Schema({
  // id: Number,
  url: {
    type: String,
    unique: true
  },
  baseUrl: String,
  code: String,
  title: String,
  visits: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;
