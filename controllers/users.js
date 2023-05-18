const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const constants = require('../utils/constants');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestError = require('../utils/BadRequestError');
const DuplicateError = require('../utils/DuplicateError');

const { NODE_ENV, JWT_SECRET } = process.env;

const updateUser = function updateUser(userId, fields, options) {
  return User.findByIdAndUpdate(userId, fields, options)
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new NotFoundError(),
        );
      }
      return user;
    })
    .catch((err) => {
      if (
        err.name === constants.VALIDATION_ERROR_NAME ||
        err.name === constants.CAST_ERROR_NAME
      ) {
        return Promise.reject(
          new BadRequestError(constants.VALIDATION_ERROR_TEXT),
        );
      }
      if (err.code === 11000) {
        return Promise.reject(new DuplicateError(constants.USER_DUPLICATE_ERROR_TEXT));
      }
      return Promise.reject(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        res.send({
          data: {
            name: user.name,
            email: user.email,
          },
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new DuplicateError(constants.USER_DUPLICATE_ERROR_TEXT));
        }
        if (err.name === constants.VALIDATION_ERROR_NAME) {
          next(new BadRequestError());
        }
        next(err);
      }),
  );
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res
        .cookie(constants.COOKIE_NAME, token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({
          message: constants.LOGIN_SUCCEEDED,
        })
        .end();
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res
    .clearCookie(constants.COOKIE_NAME)
    .send({
      message: constants.LOGOUT_SUCCEEDED,
    })
    .end();
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError();
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  updateUser(
    req.user._id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
