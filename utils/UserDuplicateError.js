const constants = require('./constants');

module.exports = class UserDuplicateError extends Error {
  constructor() {
    super();
    this.name = 'UserDuplicateError';
    this.message = 'Пользователь с таким email уже существует';
    this.code = constants.DUPLICATE_ERROR;
  }
};
