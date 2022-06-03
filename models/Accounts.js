const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: String,
  funds: Number,
});

module.exports = mongoose.model("Account", AccountSchema);
