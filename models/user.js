const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../utils/UnauthorizedError');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(mail) {
        return validator.isEmail(mail);
      },
      message: constants.INVALID_EMAIL,
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(constants.LOGIN_FAILED_ERROR_TEXT));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(constants.LOGIN_FAILED_ERROR_TEXT));
        }
        return user;
      });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;
module.exports = mongoose.model('user', userSchema);
