import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../api";

export default function AddMovie() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [poster, setPoster] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  function addTag() {
    const tag = tagInput.trim();

    if (tag === "") return;

    if (tags.includes(tag)) return;

    setTags([...tags, tag]);

    setTagInput("");
  }

  function removeTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);

    try {
      await addMovie({
        title,
        description,
        releaseYear: Number(releaseYear),
        poster,
        imdbRating: Number(imdbRating),
        tags,
      });

      alert("Movie Added Successfully!");

      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>Add Movie</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          rows="4"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Release Year"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          required
        />

        <input
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
        />

        {poster && (
          <img
            src={poster}
            alt="Poster Preview"
            style={{
              width: "200px",
              borderRadius: "8px",
            }}
          />
        )}

        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder="IMDb Rating"
          value={imdbRating}
          onChange={(e) => setImdbRating(e.target.value)}
          required
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            placeholder="Add Tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />

          <button
            type="button"
            onClick={addTag}
          >
            Add
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => removeTag(tag)}
            >
              {tag} ✕
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
}