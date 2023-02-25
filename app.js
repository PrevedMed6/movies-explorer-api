/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const pageNotFound = require('./middlewares/pageNotFound');
const customErrors = require('./middlewares/errors');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const users = require('./routes/users');
const movies = require('./routes/movies');
const constants = require('./utils/constants');

const { PORT = 3000 } = process.env;
const { DB_SERVER_URL = 'mongodb://localhost:27017/anyfilmsdb' } = process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors);
app.use(requestLogger);
app.post(
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
app.post(
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
app.use(auth);
app.post('/signout', logout);
app.use('/', users);
app.use('/', movies);
app.use(errorLogger);
app.use(pageNotFound);
app.use(errors());
app.use(customErrors);
mongoose.connect(DB_SERVER_URL);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
