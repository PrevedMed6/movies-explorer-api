const constants = require('./constants');

module.exports = class ValidationError extends Error {
  constructor(message) {
    super();
    this.name = 'ValidationError';
    this.message = message ?? 'Переданы некорректные данные';
    this.code = constants.BAD_REQUEST_ERROR;
  }
};
