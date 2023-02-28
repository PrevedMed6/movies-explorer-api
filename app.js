const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const customErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const index = require('./routes/index');
const { rateLimits } = require('./utils/rateLimiterConfig');
const config = require('./utils/config');

const { PORT = config.DEFAULT_PORT, DB_SERVER_URL = config.DEFAULT_MONGO } =
  process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(rateLimit(rateLimits));
app.use('/', index);
app.use(errorLogger);
app.use(errors());
app.use(customErrors);
mongoose.connect(DB_SERVER_URL);

app.listen(PORT);
