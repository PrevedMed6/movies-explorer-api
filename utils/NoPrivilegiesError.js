const constants = require('./constants');

module.exports = class NoPrivilegiesError extends Error {
  constructor() {
    super();
    this.name = 'NoPrivilegiesError';
    this.message = 'Недостаточно прав на совершение действия';
    this.code = constants.NO_PRIVILEGIES;
  }
};
