const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Card", cardSchema);