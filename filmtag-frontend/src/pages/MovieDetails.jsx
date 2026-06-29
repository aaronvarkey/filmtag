import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getReviewsForMovie, submitReview } from "../api";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review form state
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([getMovieById(id), getReviewsForMovie(id)])
      .then(([movieData, reviewsData]) => {
        setMovie(movieData);
        setReviews(reviewsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newReview = await submitReview({ username, movieId: id, rating, reviewText });
      setReviews([...reviews, newReview]); // show it immediately, no refetch needed
      setUsername("");
      setRating(5);
      setReviewText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>Error: {error}</p>;
  if (!movie) return <p style={{ padding: "20px" }}>Movie not found</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "700px" }}>
      <a href="/">← Back</a>
      <div style={{ display: "flex", gap: "20px", marginTop: "16px" }}>
        <img src={movie.poster} alt={movie.title} style={{ width: "200px", borderRadius: "8px" }} />
        <div>
          <h1 style={{ margin: "0 0 8px" }}>{movie.title}</h1>
          <p style={{ color: "#666", margin: "0 0 8px" }}>
            {movie.releaseYear} • IMDb {movie.imdbRating}
          </p>
          <p>{movie.description}</p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {movie.tags.map((tag) => (
              <span key={tag} style={tagStyle}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: "32px" }}>Reviews</h2>
      {reviews.length === 0 && <p style={{ color: "#666" }}>No reviews yet — be the first!</p>}
      {reviews.map((r) => (
        <div key={r._id} style={reviewCardStyle}>
          <strong>{r.username}</strong> — ⭐ {r.rating}/10
          <p style={{ margin: "4px 0 0" }}>{r.reviewText}</p>
        </div>
      ))}

      <h2 style={{ marginTop: "32px" }}>Write a Review</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>
          Rating: {rating}/10
          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </label>
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

const tagStyle = {
  background: "#e0e0e0",
  borderRadius: "12px",
  padding: "4px 10px",
  fontSize: "13px",
};

const reviewCardStyle = {
  background: "#fff",
  borderRadius: "8px",
  padding: "12px",
  marginBottom: "10px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
};