const movies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const constants = require('../utils/constants');

movies.delete(
  '/movies/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().alphanum().length(24),
    }),
  }),
  deleteMovie,
);
movies.get('/movies', getMovies);
movies.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      year: Joi.string().required().length(4),
      description: Joi.string().required(),
      image: Joi.string().required().regex(constants.URL_VALIDATION_REGEX),
      trailerLink: Joi.string()
        .required()
        .regex(constants.URL_VALIDATION_REGEX),
      thumbnail: Joi.string().required().regex(constants.URL_VALIDATION_REGEX),
      owner: Joi.string().alphanum().length(24),
      owmovieId: Joi.string().alphanum().length(24),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

module.exports = movies;
