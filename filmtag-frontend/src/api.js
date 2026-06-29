const BASE_URL = "http://localhost:5000/api";

// Get all movies, optionally filtered by tag
export async function getMovies(tag) {
  const url = tag ? `${BASE_URL}/movies?tag=${encodeURIComponent(tag)}` : `${BASE_URL}/movies`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

// Get a single movie by ID
export async function getMovieById(id) {
  const res = await fetch(`${BASE_URL}/movies/${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
}

// Get reviews for a movie
export async function getReviewsForMovie(movieId) {
  const res = await fetch(`${BASE_URL}/reviews/${movieId}`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

// Submit a new review
export async function submitReview({ username, movieId, rating, reviewText }) {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, movieId, rating, reviewText }),
  });
  if (!res.ok) throw new Error("Failed to submit review");
  return res.json();
}