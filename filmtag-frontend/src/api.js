const BASE_URL = "http://localhost:5000/api";

// Movies
export async function getMovies(tag) {
  const url = tag
    ? `${BASE_URL}/movies?tag=${encodeURIComponent(tag)}`
    : `${BASE_URL}/movies`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}

// Tags
export async function getTags() {
  const res = await fetch(`${BASE_URL}/movies/tags`);

  if (!res.ok) {
    throw new Error("Failed to fetch tags");
  }

  return res.json();
}

// Single Movie
export async function getMovieById(id) {
  const res = await fetch(`${BASE_URL}/movies/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  return res.json();
}

// Reviews
export async function getReviewsForMovie(movieId) {
  const res = await fetch(`${BASE_URL}/reviews/${movieId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}

// Submit Review
export async function submitReview({
  username,
  movieId,
  rating,
  reviewText,
  tags,
}) {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      movieId,
      rating,
      reviewText,
      tags,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to submit review");
  }

  return res.json();
}

export async function addMovie(movieData) {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });

  if (!res.ok) {
    throw new Error("Failed to add movie");
  }

  return res.json();
}