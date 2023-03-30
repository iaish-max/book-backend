const mongoose = require("mongoose");

const starSchema = mongoose.Schema({
  one: { type: Number },
  two: { type: Number },
  three: { type: Number },
  four: { type: Number },
  five: { type: Number },
});

module.exports = mongoose.model("Star", starSchema);
