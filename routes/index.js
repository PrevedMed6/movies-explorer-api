const index = require('express').Router();
const auth = require('../middlewares/auth');
const pageNotFound = require('../middlewares/pageNotFound');
const users = require('./users');
const movies = require('./movies');
const validationConstants = require('../utils/validationConstants');

const { login, createUser, logout } = require('../controllers/users');

index.post(
  '/signin',
  validationConstants.SIGNIN_VALIDATION,
  login,
);
index.post(
  '/signup',
  validationConstants.SIGNUP_VALIDATION,
  createUser,
);
index.use(auth);
index.post('/signout', logout);
index.use('/', users);
index.use('/', movies);
index.use(pageNotFound);

module.exports = index;
