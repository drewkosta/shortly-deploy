var db = require('../config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  // id: Number,
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

var User = mongoose.model('User', db.userSchema);

User.comparePassword = function(inputPassword, storedPassword, cb) {
  bcrypt.compare(inputPassword, storedPassword, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = User;
