require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/Movie');

const movies = [
  {
    title: "Interstellar",
    description: "A team travels through a wormhole to save humanity from a dying Earth.",
    releaseYear: 2014,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    imdbRating: 8.6,
    tags: ["Emotional", "Mind-Bending", "Inspirational"]
  },
  {
    title: "Arrival",
    description: "A linguist works with the military to communicate with alien visitors.",
    releaseYear: 2016,
    poster: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
    imdbRating: 7.9,
    tags: ["Emotional", "Mind-Bending", "Slow Burn"]
  },
  {
    title: "The Martian",
    description: "An astronaut stranded on Mars must find a way to survive.",
    releaseYear: 2015,
    poster: "https://image.tmdb.org/t/p/w500/5aGhaIHIvP5db4UVF7DyThwGdQt.jpg",
    imdbRating: 8.0,
    tags: ["Inspirational", "Feel-Good"]
  },
  {
    title: "Contact",
    description: "A scientist makes first contact with an alien intelligence.",
    releaseYear: 1997,
    poster: "https://image.tmdb.org/t/p/w500/qx5gC71ji3GVS4QVAyiqvz4y7K6.jpg",
    imdbRating: 7.5,
    tags: ["Emotional", "Mind-Bending", "Slow Burn"]
  },
  {
    title: "The Dark Knight",
    description: "Batman faces the Joker in a battle for Gotham's soul.",
    releaseYear: 2008,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    imdbRating: 9.0,
    tags: ["Dark", "Action-Packed"]
  },
  {
    title: "La La Land",
    description: "A jazz musician and an actress fall in love while pursuing their dreams.",
    releaseYear: 2016,
    poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    imdbRating: 8.0,
    tags: ["Emotional", "Feel-Good"]
  },
  {
    title: "Get Out",
    description: "A young man uncovers a disturbing secret during a visit to his girlfriend's family estate.",
    releaseYear: 2017,
    poster: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    imdbRating: 7.7,
    tags: ["Dark", "Mind-Bending"]
  },
  {
    title: "Superbad",
    description: "Two high schoolers try to buy alcohol for a party before heading off to college.",
    releaseYear: 2007,
    poster: "https://image.tmdb.org/t/p/w500/jJfqWfDfDsR4y9Y8jgWdJD9aXJZ.jpg",
    imdbRating: 7.6,
    tags: ["Funny", "Feel-Good"]
  },
  {
    title: "Whiplash",
    description: "A young drummer pushes himself to the limit under a ruthless instructor.",
    releaseYear: 2014,
    poster: "https://image.tmdb.org/t/p/w500/oPxnRhyAIzJKGcgu4xpEbpEEAxJ.jpg",
    imdbRating: 8.5,
    tags: ["Dark", "Inspirational"]
  },
  {
    title: "Inside Out",
    description: "Emotions inside a young girl's mind guide her through a difficult life change.",
    releaseYear: 2015,
    poster: "https://image.tmdb.org/t/p/w500/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
    imdbRating: 8.1,
    tags: ["Emotional", "Feel-Good"]
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Movie.deleteMany({}); // clear existing movies before reseeding
    await Movie.insertMany(movies);
    console.log(`Seeded ${movies.length} movies`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });