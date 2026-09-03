const mongoose = require("mongoose");

const createSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('User', createSchema);