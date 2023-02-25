const mongoose = require('mongoose');
const constants = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
    length: 4,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(image) {
        return constants.URL_VALIDATION_REGEX.test(image);
      },
      message: constants.INVALID_URL,
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator(trailerLink) {
        return constants.URL_VALIDATION_REGEX.test(trailerLink);
      },
      message: constants.INVALID_URL,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(thumbnail) {
        return constants.URL_VALIDATION_REGEX.test(thumbnail);
      },
      message: constants.INVALID_URL,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  owmovieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('movie', movieSchema);
