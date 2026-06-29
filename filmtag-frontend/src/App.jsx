import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MoodSearch from "./pages/MoodSearch";
import MovieDetails from "./pages/MovieDetails";
import AddMovie from "./pages/AddMovie";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/mood" element={<MoodSearch />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/add-movie" element={<AddMovie />} />
      </Routes>
    </BrowserRouter>
  );
}