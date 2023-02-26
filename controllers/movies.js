const Movie = require('../models/movie');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestError = require('../utils/BadRequestError');
const ForbiddenError = require('../utils/ForbiddenError');
const DuplicateError = require('../utils/DuplicateError');
const constants = require('../utils/constants');

const findMovie = function findMovie(movieId) {
  return Movie.findOne({
    _id: movieId,
  })
    .then((movie) => {
      if (!movie) {
        return Promise.reject(new NotFoundError());
      }
      return movie;
    })
    .catch((err) => {
      if (err.name === constants.CAST_ERROR_NAME) {
        return Promise.reject(new BadRequestError());
      }
      return Promise.reject(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owmovieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    owmovieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === constants.VALIDATION_ERROR_NAME) {
        next(new BadRequestError());
      }
      if (err.code === 11000) {
        next(new DuplicateError(constants.MOVIE_DUPLICATE_ERROR_TEXT));
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  findMovie(req.params._id)
    .then((movie) => {
      Movie.findOneAndDelete({
        _id: movie._id,
        owner: userId,
      })
        .then((delMovie) => {
          if (!delMovie) throw new ForbiddenError();
          res.send({ data: delMovie });
        })
        .catch(next);
    })
    .catch(next);
};
