# 🎬 FilmTag

**FilmTag** is a community-driven movie discovery and review platform built using the **MERN Stack**. Unlike traditional movie websites that organize films only by genre, FilmTag allows users to discover movies based on moods, themes, and community-generated tags such as *Mind-Bending*, *Emotional*, *Slow Burn*, *Feel-Good*, and more.

The project was developed as a short-term MERN Stack learning project to understand full-stack web development, REST APIs, React, MongoDB integration, and collaborative development using Git and GitHub.

---

# Features

### Movie Library

* Browse a curated collection of movies.
* View movie posters, release year, IMDb rating, and descriptions.
* Responsive movie cards for easy navigation.

### Movie Details

* Dedicated page for every movie.
* Displays complete movie information.
* Shows all community reviews.
* Displays all tags associated with the movie.

### Community Reviews

* Submit reviews with:

  * Username
  * Rating (1–10)
  * Review text
* Reviews are stored permanently in MongoDB Atlas.

### Community Tagging

* Users can:

  * Select existing tags.
  * Create custom tags.
* Newly created tags are automatically added to the movie.
* Dynamic tag system grows as more users contribute.

### Mood Search

Instead of browsing only by genre, users can search movies based on moods such as:

* Emotional
* Funny
* Dark
* Inspirational
* Mind-Bending
* Feel-Good
* Action-Packed
* Slow Burn

Movies are filtered using community-generated tags.

### Similar Movie Recommendations

Each movie page recommends similar movies by comparing community tags.

### Add Movie

Users can add new movies directly through the website by providing:

* Title
* Description
* Release Year
* Poster URL
* IMDb Rating
* Initial Tags

The movie is immediately added to MongoDB and becomes available throughout the application.

---

# Tech Stack

## Frontend

* React (Vite)
* React Router DOM
* JavaScript
* CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

---

# Project Structure

```
filmtag/
│
├── filmtag-backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seed.js
│   └── .env
│
├── filmtag-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── api.js
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# REST API Endpoints

## Movies

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | `/api/movies`      | Fetch all movies         |
| GET    | `/api/movies?tag=` | Filter movies by tag     |
| GET    | `/api/movies/:id`  | Fetch a single movie     |
| GET    | `/api/movies/tags` | Fetch all available tags |
| POST   | `/api/movies`      | Add a new movie          |

## Reviews

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| GET    | `/api/reviews/:movieId` | Fetch reviews for a movie |
| POST   | `/api/reviews`          | Submit a review           |

---

# Database Schema

## Movie

```
Title
Description
Release Year
Poster URL
IMDb Rating
Tags[]
```

## Review

```
Username
Movie ID
Rating
Review Text
Tags[]
Created At
Updated At
```

---

# How It Works

1. The React frontend sends requests using the Fetch API.
2. Express routes receive API requests.
3. Mongoose communicates with MongoDB Atlas.
4. MongoDB stores and retrieves movie and review data.
5. The backend returns JSON responses.
6. React updates the interface dynamically without reloading the page.

---

# Installation

## Clone the repository

```bash
git clone https://github.com/<your-username>/filmtag.git
```

## Backend Setup

```bash
cd filmtag-backend

npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run the backend:

```bash
node server.js
```

(Optional) Seed the database:

```bash
node seed.js
```

## Frontend Setup

```bash
cd filmtag-frontend

npm install

npm run dev
```

---

# Future Improvements

* User authentication
* TMDB API integration
* Image upload support
* Edit and delete movies
* Tag voting system
* Advanced recommendation algorithm
* Search and sorting filters
* User profiles and watchlists

---

# Contributors

### Phase 1 – Backend & Database

* aman3398

### Phase 2 – Frontend Core

* aleenabenny0502

### Phase 3 – Features, Community Tagging & Final Integration

* Aaron Varkey

---

# License

This project was developed for educational purposes as part of a MERN Stack learning program.
