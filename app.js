/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { login, createUser, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const pageNotFound = require('./middlewares/pageNotFound');
const users = require('./routes/users');
const movies = require('./routes/movies');

const { PORT = 3000 } = process.env;
const { DB_SERVER_URL = 'mongodb://localhost:27017/anyfilmsdb' } = process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['ru', 'com', 'net'] } }),
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
        .email({ minDomainSegments: 2, tlds: { allow: ['ru', 'com', 'net'] } }),
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
app.use(pageNotFound);
mongoose.connect(DB_SERVER_URL);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});