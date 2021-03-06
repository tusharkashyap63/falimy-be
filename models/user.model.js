const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  auth0Id: { type: String, required: true },
  username: { type: String, required: true },
  birthday: { type: Date, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
