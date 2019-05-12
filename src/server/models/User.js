const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
  },
  userdate: {
    type: Number,
    default: 1900
  },
  country: {
    type: String,
    match: /^.{1,100}$/
  }

});

module.exports = mongoose.model('User', UserSchema);
