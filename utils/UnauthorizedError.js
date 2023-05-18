const constants = require('./constants');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.name = constants.UNAUTHORZED_ERROR_NAME;
    this.message = message ?? constants.UNAUTHORIZED_ERROR_TEXT;
    this.code = constants.UNAUTHORIZED_ERROR;
  }
};
