const constants = require('./constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.name = constants.FORBIDDEN_ERROR_NAME;
    this.message = message ?? constants.FORBIDDEN_ERROR_TEXT;
    this.code = constants.FORBIDDEN_ERROR;
  }
};
