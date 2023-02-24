const Movie = require('../models/movie');

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
    .then(() => {
      Movie.findOneAndDelete({
        _id: req.params._id,
        owner: req.user._id,
      })
        .then((delMovie) => {
          if (!delMovie) throw new Error();
          res.send({ data: delMovie });
        })
        .catch(next);
    })
    .catch((err) => {
      next(err);
    });
};
