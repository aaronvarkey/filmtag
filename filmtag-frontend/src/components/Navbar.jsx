import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "18px 30px",
        background: "#222",
      }}
    >
      <Link
        to="/"
        style={linkStyle}
      >
        Home
      </Link>

      <Link
        to="/mood"
        style={linkStyle}
      >
        Mood Search
      </Link>

      <Link
        to="/add-movie"
        style={linkStyle}
      >
        Add Movie
      </Link>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};