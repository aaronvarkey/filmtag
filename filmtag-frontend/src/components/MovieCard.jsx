import { Link } from "react-router-dom";

export default function MovieCard({ movie, showScore = false }) {
  return (
    <Link
      to={`/movie/${movie._id}`}
      style={cardStyle}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        style={imgStyle}
      />

      <h3 style={{ margin: "10px 0 6px" }}>
        {movie.title}
      </h3>

      <p style={ratingStyle}>
        ⭐ IMDb {movie.imdbRating}
      </p>

      <p style={yearStyle}>
        {movie.releaseYear}
      </p>

      {showScore && (
        <div style={scoreStyle}>
          🎯 Match Score : {movie.score}
        </div>
      )}
    </Link>
  );
}

const cardStyle = {
  display: "block",
  width: "190px",
  background: "#ffffff",
  borderRadius: "10px",
  padding: "12px",
  textDecoration: "none",
  color: "#222",
  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  transition: "0.2s",
};

const imgStyle = {
  width: "100%",
  height: "260px",
  objectFit: "cover",
  borderRadius: "8px",
};

const ratingStyle = {
  margin: "4px 0",
  color: "#666",
};

const yearStyle = {
  margin: "0 0 10px",
  color: "#888",
  fontSize: "14px",
};

const scoreStyle = {
  marginTop: "8px",
  background: "#222",
  color: "white",
  borderRadius: "6px",
  padding: "6px",
  textAlign: "center",
  fontWeight: "bold",
};