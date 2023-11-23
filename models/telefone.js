const mongoose = require("mongoose");

const TelefoneSchema = new mongoose.Schema({
  numero: String,
  ddd: String,
});

module.exports = TelefoneSchema;
