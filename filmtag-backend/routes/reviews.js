const express = require("express");
const router = express.Router();

const Review = require("../models/Review");
const Movie = require("../models/Movie");

// POST /api/reviews
router.post("/", async (req, res) => {
  try {
    const {
      username,
      movieId,
      rating,
      reviewText,
      tags,
    } = req.body;

    // Save the review
    const review = await Review.create({
      username,
      movieId,
      rating,
      reviewText,
      tags: tags || [],
    });

    // If tags were submitted, merge them into the movie
    if (tags && tags.length > 0) {
      const movie = await Movie.findById(movieId);

      if (movie) {
        const mergedTags = [...movie.tags];

        tags.forEach((tag) => {
          const cleanedTag = tag.trim();

          const exists = mergedTags.some(
            (existingTag) =>
              existingTag.toLowerCase() === cleanedTag.toLowerCase()
          );

          if (!exists) {
            mergedTags.push(cleanedTag);
          }
        });

        movie.tags = mergedTags;

        await movie.save();
      }
    }

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

// GET /api/reviews/:movieId
router.get("/:movieId", async (req, res) => {
  try {
    const reviews = await Review.find({
      movieId: req.params.movieId,
    });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;