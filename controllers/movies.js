const Movie = require('../models/movie');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestError = require('../utils/BadRequestError');
const NoPrivilegiesError = require('../utils/NoPrivilegiesError');
const constants = require('../utils/constants');

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
        next(new BadRequestError(constants.VALIDATION_ERROR_TEXT));
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({
    _id: req.params._id,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(constants.NOT_FOUND_ERROR_TEXT);
      }
      Movie.findOneAndDelete({
        _id: req.params._id,
        owner: req.user._id,
      })
        .then((delMovie) => {
          if (!delMovie) throw new NoPrivilegiesError();
          res.send({ data: delMovie });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === constants.CAST_ERROR_NAME) {
        next(new BadRequestError(constants.CAST_ERROR_TEXT));
      }
    });
};
