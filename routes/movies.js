const movies = require('express').Router();
const validationConstants = require('../utils/validationConstants');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

movies.delete(
  '/movies/:_id',
  validationConstants.DELETE_MOVIE_VALIDATION,
  deleteMovie,
);

movies.get('/movies', getMovies);

movies.post(
  '/movies',
  validationConstants.POST_MOVIE_VALIDATION,
  createMovie,
);

module.exports = movies;
