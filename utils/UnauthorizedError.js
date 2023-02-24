const constants = require('./constants');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.name = 'UnauthorizedError';
    this.message = message ?? 'Неправильные почта или пароль';
    this.code = constants.UNAUTHORIZED_ERROR;
  }
};
