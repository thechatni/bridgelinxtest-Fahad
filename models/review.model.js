const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true },
    description: { type: String, required: true },
    imdbId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
