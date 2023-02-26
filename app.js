/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const pageNotFound = require('./middlewares/pageNotFound');
const customErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const index = require('./routes/index');

const { PORT = 3000, DB_SERVER_URL = 'mongodb://localhost:27017/anyfilmsdb' } = process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use('/', index);
app.use(errorLogger);
app.use(pageNotFound);
app.use(errors());
app.use(customErrors);
mongoose.connect(DB_SERVER_URL);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
