const { User, Movie, MovieApp } = require('./movieApp');

describe('MovieApp', () => {
  let movieApp;
  let user;

  beforeEach(() => {
    movieApp = new MovieApp();
    user = movieApp.registerUser('test@example.com');
  });

  test('User should be able to add and remove movies from favorites', () => {
    const movie = movieApp.addMovie('Movie Title', ['Actor 1', 'Actor 2'], 'Action', '2024-04-30', 10000000);
    movieApp.addToFavorites(user, 'Movie Title');
    expect(movieApp.getUserFavorites(user)).toContain(movie);

    movieApp.removeFromFavorites(user, 'Movie Title');
    expect(movieApp.getUserFavorites(user)).not.toContain(movie);
  });

  test('User should be able to search for movies by title, cast, or category', () => {
    movieApp.addMovie('Movie Title 1', ['Actor 1', 'Actor 2'], 'Action', '2024-04-30', 10000000);
    movieApp.addMovie('Movie Title 2', ['Actor 3', 'Actor 4'], 'Comedy', '2024-05-01', 15000000);

    const result = movieApp.searchMovies('actor 1');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Movie Title 1');
  });

  test('User should be able to get movie details', () => {
    const movie = movieApp.addMovie('Movie Title', ['Actor 1', 'Actor 2'], 'Action', '2024-04-30', 10000000);
    const details = movieApp.getMovieDetails('Movie Title');
    expect(details).toEqual(movie);
  });

  test('User should not be able to add or remove non-existent movies from favorites', () => {
    expect(movieApp.addToFavorites(user, 'Non-existent Movie')).toBe(false);
    expect(movieApp.removeFromFavorites(user, 'Non-existent Movie')).toBe(false);
  });
});
