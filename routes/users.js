const users = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const validationConstants = require('../utils/validationConstants');

users.get('/users/me', getCurrentUser);
users.patch(
  '/users/me',
  validationConstants.PATCH_USER_VALIDATION,
  updateUser,
);

module.exports = users;
