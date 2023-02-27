const constants = require('./constants');

exports.rateLimits = {
  windowMs: constants.PERIOD_FOR_IP,
  max:constants.MAX_TRY_COUNT,
  standardHeaders: true,
  legacyHeaders: false,
};
