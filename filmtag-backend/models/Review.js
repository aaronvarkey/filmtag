const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    reviewText: {
      type: String,
      required: true,
    },

    // Community tags added by users
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);