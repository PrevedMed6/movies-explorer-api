const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, updateUser } = require('../controllers/users');

users.get('/users/me', getCurrentUser);
users.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['ru', 'com', 'net'] } }),
    }),
  }),
  updateUser,
);

module.exports = users;
