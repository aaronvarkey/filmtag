import { useEffect, useState } from "react";
import { getMovies } from "../api";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredMovies(results);
  }, [search, movies]);

  if (loading)
    return <p style={{ padding: "20px" }}>Loading movies...</p>;

  if (error)
    return (
      <p style={{ padding: "20px", color: "red" }}>
        {error}
      </p>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 FilmTag</h1>

      <p style={{ color: "#666" }}>
        Browse movies by experience, not just genre.
      </p>

      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchStyle}
      />

      <p style={{ color: "#666" }}>
        Showing {filteredMovies.length} movie(s)
      </p>

      <div style={movieGrid}>
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}

const searchStyle = {
  width: "320px",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginTop: "20px",
};

const movieGrid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  marginTop: "20px",
};