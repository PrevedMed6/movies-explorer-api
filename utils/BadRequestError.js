const constants = require('./constants');

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super();
    this.name = constants.VALIDATION_ERROR_NAME;
    this.message = message ?? constants.VALIDATION_ERROR_TEXT;
    this.code = constants.BAD_REQUEST_ERROR;
  }
};
