const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
  name: { type: String, required: true },
  head: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const Family = mongoose.model('Family', familySchema);
module.exports = Family;
