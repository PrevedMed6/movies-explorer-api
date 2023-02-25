const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, updateUser } = require('../controllers/users');
const constants = require('../utils/constants');

users.get('/users/me', getCurrentUser);
users.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string()
        .required()
        .email(constants.EMAIL_VALIDATION_EXPRESSION),
    }),
  }),
  updateUser,
);

module.exports = users;
