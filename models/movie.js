const mongoose = require('mongoose');
const validationConstants = require('../utils/validationConstants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(image) {
        return validationConstants.URL_VALIDATION_REGEX.test(image);
      },
      message: validationConstants.INVALID_URL,
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator(trailerLink) {
        return validationConstants.URL_VALIDATION_REGEX.test(trailerLink);
      },
      message: validationConstants.INVALID_URL,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(thumbnail) {
        return validationConstants.URL_VALIDATION_REGEX.test(thumbnail);
      },
      message: validationConstants.INVALID_URL,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
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
