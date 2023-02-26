const rateLimit = require('express-rate-limit');
const constants = require('../utils/constants');

exports.rateLimiter = rateLimit({
  windowMs: constants.PERIOD_FOR_IP,
  max:constants.MAX_TRY_COUNT,
  standardHeaders: true,
  legacyHeaders: false,
});
