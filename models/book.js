const mongoose = require("mongoose");
const router = require("../routes/book");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  cover: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
  writer: { type: String, required: true },
  readTime: { type: Number, required: true },
  details: { type: String, required: true },
  rating: {
    type: mongoose.Types.ObjectId,
    ref: "Star",
    // required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
