const constants = require('./constants');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = constants.NOT_FOUND_ERROR_NAME;
    this.message = message ?? constants.NOT_FOUND_ERROR_TEXT;
    this.code = constants.NOT_FOUND_ERROR;
  }
};
