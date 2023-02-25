const constants = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { code = 500, message } = err;

  res
    .status(code)
    .send({
      message: code === 500
        ? constants.UNEXPECTED_ERROR_TEXT
        : message,
    });
  next();
};
