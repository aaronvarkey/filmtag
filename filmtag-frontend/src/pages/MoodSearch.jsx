import { useEffect, useState } from "react";
import { getMovies, getTags } from "../api";
import MovieCard from "../components/MovieCard";

export default function MoodSearch() {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [movies, setMovies] = useState([]);

  const [loadingTags, setLoadingTags] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(false);

  // Load all available tags from MongoDB
  useEffect(() => {
    async function loadTags() {
      try {
        const data = await getTags();
        setTags(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingTags(false);
      }
    }

    loadTags();
  }, []);

  // Load movies whenever selected tags change
  useEffect(() => {
  async function loadMovies() {
    if (selectedTags.length === 0) {
      setMovies([]);
      return;
    }

    setLoadingMovies(true);

    try {
      const allMovies = await getMovies();

      const scoredMovies = allMovies
        .map((movie) => {
          let score = 0;

          selectedTags.forEach((tag) => {
            if (movie.tags.includes(tag)) {
              score++;
            }
          });

          return {
            ...movie,
            score,
          };
        })
        .filter((movie) => movie.score > 0)
        .sort((a, b) => b.score - a.score);

      setMovies(scoredMovies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMovies(false);
    }
  }

  loadMovies();
}, [selectedTags]);

  function toggleTag(tag) {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  return (
    <div style={containerStyle}>
      <h1>🎭 What are you in the mood for?</h1>

      <p style={subtitleStyle}>
        Choose one or more moods to discover movies.
      </p>

      {loadingTags ? (
        <p>Loading moods...</p>
      ) : (
        <div style={tagContainer}>
          {tags.map((item) => (
            <button
              key={item.tag}
              onClick={() => toggleTag(item.tag)}
              style={{
                ...tagButton,
                ...(selectedTags.includes(item.tag)
                  ? selectedTag
                  : {}),
              }}
            >
              {item.tag} ({item.count})
            </button>
          ))}
        </div>
      )}

      <hr style={{ margin: "30px 0" }} />

      {selectedTags.length > 0 && (
        <h2>
          Movies matching:
          {" "}
          {selectedTags.join(", ")}
        </h2>
      )}

      {loadingMovies && <p>Loading movies...</p>}

      {!loadingMovies &&
        selectedTags.length > 0 &&
        movies.length === 0 && (
          <p>No movies match these moods.</p>
        )}

      <div style={movieGrid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            showScore={true}
        />
        ))}
      </div>
    </div>
  );
}

const containerStyle = {
  padding: "20px",
};

const subtitleStyle = {
  color: "#666",
  marginBottom: "20px",
};

const tagContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
};

const tagButton = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "20px",
  background: "#e0e0e0",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.2s",
};

const selectedTag = {
  background: "#222",
  color: "white",
};

const movieGrid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  marginTop: "20px",
};