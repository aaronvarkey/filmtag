const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  poster: {
    type: String, // URL to the poster image
    required: true
  },
  imdbRating: {
    type: Number,
    required: true
  },
  tags: {
    type: [String], // array of strings, e.g. ["Emotional", "Mind-Bending"]
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);