const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// GET /api/movies
// GET /api/movies?tag=Dark
router.get("/", async (req, res) => {
  try {
    const { tag } = req.query;

    const filter = tag ? { tags: tag } : {};

    const movies = await Movie.find(filter);

    res.json(movies);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// GET /api/movies/tags
// Returns every tag with its usage count
router.get("/tags", async (req, res) => {
  try {
    const movies = await Movie.find({}, "tags");

    const tagCounts = {};

    movies.forEach((movie) => {
      movie.tags.forEach((tag) => {
        if (tagCounts[tag]) {
          tagCounts[tag]++;
        } else {
          tagCounts[tag] = 1;
        }
      });
    });

    const tags = Object.entries(tagCounts)
      .map(([tag, count]) => ({
        tag,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    res.json(tags);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// POST /api/movies
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      releaseYear,
      poster,
      imdbRating,
      tags,
    } = req.body;

    // Basic validation
    if (
      !title ||
      !description ||
      !releaseYear ||
      !poster ||
      imdbRating === undefined ||
      !tags ||
      tags.length === 0
    ) {
      return res.status(400).json({
        error: "Please fill all required fields.",
      });
    }

    const currentYear = new Date().getFullYear();

    if (releaseYear < 1888 || releaseYear > currentYear + 2) {
      return res.status(400).json({
        error: "Invalid release year.",
      });
    }

    if (imdbRating < 0 || imdbRating > 10) {
      return res.status(400).json({
        error: "IMDb rating must be between 0 and 10.",
      });
    }

    const movie = await Movie.create({
      title,
      description,
      releaseYear,
      poster,
      imdbRating,
      tags,
    });

    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// GET /api/movies/:id
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    res.json(movie);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;