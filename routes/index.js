const index = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const constants = require('../utils/constants');

const { login, createUser, logout } = require('../controllers/users');

index.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email(constants.EMAIL_VALIDATION_EXPRESSION),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
index.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email(constants.EMAIL_VALIDATION_EXPRESSION),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);
index.use(auth);
index.post('/signout', logout);
index.use('/', users);
index.use('/', movies);

module.exports = index;
