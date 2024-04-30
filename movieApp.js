class User {
  constructor(email) {
    this.email = email;
    this.favorites = [];
  }

  addFavorite(movie) {
    this.favorites.push(movie);
  }

  removeFavorite(movie) {
    const index = this.favorites.indexOf(movie);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  getFavorites() {
    return this.favorites;
  }
}

class Movie {
  constructor(title, cast, category, releaseDate, budget) {
    this.title = title;
    this.cast = cast;
    this.category = category;
    this.releaseDate = releaseDate;
    this.budget = budget;
  }
}

class MovieApp {
  constructor() {
    this.users = [];
    this.movies = [];
  }

  registerUser(email) {
    const newUser = new User(email);
    this.users.push(newUser);
    return newUser;
  }

  addMovie(title, cast, category, releaseDate, budget) {
    const newMovie = new Movie(title, cast, category, releaseDate, budget);
    this.movies.push(newMovie);
    return newMovie;
  }

  searchMovies(query) {
    const result = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.cast.some(actor => actor.toLowerCase().includes(query.toLowerCase())) ||
      movie.category.toLowerCase().includes(query.toLowerCase())
    );
    return result.sort((a, b) => a.title.localeCompare(b.title));
  }

  getMovieDetails(movieTitle) {
    const movie = this.movies.find(movie => movie.title.toLowerCase() === movieTitle.toLowerCase());
    return movie ? { ...movie } : null;
  }

  addToFavorites(user, movieTitle) {
    const movie = this.movies.find(movie => movie.title.toLowerCase() === movieTitle.toLowerCase());
    if (movie) {
      user.addFavorite(movie);
      return true;
    }
    return false;
  }

  removeFromFavorites(user, movieTitle) {
    const movie = this.movies.find(movie => movie.title.toLowerCase() === movieTitle.toLowerCase());
    if (movie) {
      user.removeFavorite(movie);
      return true;
    }
    return false;
  }

  getUserFavorites(user) {
    return user.getFavorites();
  }
}

module.exports = { User, Movie, MovieApp };
