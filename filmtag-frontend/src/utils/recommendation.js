// Returns movies similar to the current movie
// Similarity is based on how many tags are shared

export function getSimilarMovies(currentMovie, allMovies, limit = 3) {
  if (!currentMovie || !allMovies) {
    return [];
  }

  const recommendations = allMovies
    .filter((movie) => movie._id !== currentMovie._id)
    .map((movie) => {
      let score = 0;

      currentMovie.tags.forEach((tag) => {
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
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return recommendations;
}