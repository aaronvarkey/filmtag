import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import {
  getMovieById,
  getMovies,
  getReviewsForMovie,
  submitReview,
  getTags,
} from "../api";

import { getSimilarMovies } from "../utils/recommendation";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);

        const [
  movieData,
  reviewsData,
  allMovies,
  tagData,
] = await Promise.all([
  getMovieById(id),
  getReviewsForMovie(id),
  getMovies(),
  getTags(),
]);

        setMovie(movieData);
        setReviews(reviewsData);
        setSimilarMovies(getSimilarMovies(movieData, allMovies, 3));
        setAvailableTags(tagData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  function toggleTag(tag) {
  if (selectedTags.includes(tag)) {
    setSelectedTags(
      selectedTags.filter((t) => t !== tag)
    );
  } else {
    setSelectedTags([...selectedTags, tag]);
  }
}

function addCustomTag() {
  const tag = newTag.trim();

  if (tag === "") {
    return;
  }

  // Prevent duplicates (case-insensitive)
  const exists = availableTags.some(
    (t) => t.tag.toLowerCase() === tag.toLowerCase()
  );

  if (exists) {
    alert("Tag already exists.");
    return;
  }

  const newTagObject = {
    tag,
    count: 1,
  };

  setAvailableTags([...availableTags, newTagObject]);

  setSelectedTags([...selectedTags, tag]);

  setNewTag("");
}

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);

    try {
      const newReview = await submitReview({
  username,
  movieId: id,
  rating,
  reviewText,
  tags: selectedTags,
});

      setReviews([...reviews, newReview]);

      setUsername("");
      setRating(5);
      setReviewText("");
      setSelectedTags([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>Error: {error}</p>;
  if (!movie) return <p style={{ padding: "20px" }}>Movie not found.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto" }}>
      <Link to="/">← Back to Home</Link>

      <div
        style={{
          display: "flex",
          gap: "24px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            width: "230px",
            borderRadius: "10px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
          }}
        />

        <div style={{ flex: 1 }}>
          <h1>{movie.title}</h1>

          <p style={{ color: "#666" }}>
            {movie.releaseYear} • ⭐ IMDb {movie.imdbRating}
          </p>

          <p>{movie.description}</p>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "16px",
            }}
          >
            {movie.tags.map((tag) => (
              <span key={tag} style={tagStyle}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h2>Community Reviews</h2>

      {reviews.length === 0 ? (
        <p style={{ color: "#666" }}>
          No reviews yet. Be the first to review this movie.
        </p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} style={reviewCardStyle}>
            <strong>{review.username}</strong> — ⭐ {review.rating}/10
            <p style={{ marginTop: "6px" }}>{review.reviewText}</p>
          </div>
        ))
      )}

      <hr style={{ margin: "40px 0" }} />

      <h2>You May Also Like</h2>

      {similarMovies.length === 0 ? (
        <p style={{ color: "#666" }}>No similar movies found.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {similarMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}

      <hr style={{ margin: "40px 0" }} />

      <h2>Write a Review</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "450px",
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
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
            style={{ width: "100%" }}
          />
        </label>

        <textarea
          rows={5}
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />

        <h3>Community Tags</h3>

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  }}
>
  {availableTags.map((item) => (
    <button
      key={item.tag}
      type="button"
      onClick={() => toggleTag(item.tag)}
      style={{
        padding: "8px 14px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        background: selectedTags.includes(item.tag)
          ? "#222"
          : "#ddd",
        color: selectedTags.includes(item.tag)
          ? "#fff"
          : "#000",
      }}
    >
      {item.tag}
    </button>
  ))}
</div>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  }}
>
  <input
    type="text"
    placeholder="Add a new tag"
    value={newTag}
    onChange={(e) => setNewTag(e.target.value)}
  />

  <button
    type="button"
    onClick={addCustomTag}
  >
    Add Tag
  </button>
</div>

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