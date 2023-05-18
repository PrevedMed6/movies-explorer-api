const constants = require('./constants');

module.exports = class DuplicateError extends Error {
  constructor(message) {
    super();
    this.name = constants.DUPLICATE_ERROR_NAME;
    this.message = message ?? constants.DUPLICATE_ERROR_TEXT;
    this.code = constants.DUPLICATE_ERROR;
  }
};
