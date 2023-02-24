const constants = require('./constants');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = 'NotFoundError';
    this.message = message ?? 'Запрашиваемый объект или страница не найдены';
    this.code = constants.NOT_FOUND_ERROR;
  }
};
