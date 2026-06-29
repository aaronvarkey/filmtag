import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie._id}`} style={cardStyle}>
      <img src={movie.poster} alt={movie.title} style={imgStyle} />
      <h3 style={{ margin: "8px 0 4px" }}>{movie.title}</h3>
      <p style={{ margin: 0, color: "#666" }}>
        {movie.releaseYear} • ⭐ {movie.imdbRating}
      </p>
    </Link>
  );
}

const cardStyle = {
  display: "block",
  width: "180px",
  background: "#fff",
  borderRadius: "8px",
  padding: "10px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
};

const imgStyle = {
  width: "100%",
  height: "240px",
  objectFit: "cover",
  borderRadius: "6px",
};