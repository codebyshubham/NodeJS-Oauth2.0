const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  userName: String,
  googleId: String,
  profilePic: String,
});

const User = mongoose.model('user', user);

module.exports = User;