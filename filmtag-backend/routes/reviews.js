const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST /api/reviews -> create a review
router.post('/', async (req, res) => {
  try {
    const { username, movieId, rating, reviewText } = req.body;
    const review = await Review.create({ username, movieId, rating, reviewText });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/reviews/:movieId -> all reviews for one movie
router.get('/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;