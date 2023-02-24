// #region error codes
const DEFAULT_ERROR = 500;
const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const UNAUTHORIZED_ERROR = 401;
const NO_PRIVILEGIES = 403;
const DUPLICATE_ERROR = 409;
// #endregion

// #region error names
const VALIDATION_ERROR_NAME = 'ValidationError';
const CAST_ERROR_NAME = 'CastError';
// #endregion

// #region error messages
const VALIDATION_ERROR_TEXT = 'Переданы некорректные данные при создании объекта';
const NOT_FOUND_ERROR_TEXT = 'Объект по указанному _id не найден';
const CAST_ERROR_TEXT = 'Переданы некорректные данные при поиске объекта';
// #endregion

module.exports = {
  DEFAULT_ERROR,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
  NO_PRIVILEGIES,
  DUPLICATE_ERROR,
  VALIDATION_ERROR_NAME,
  CAST_ERROR_NAME,
  VALIDATION_ERROR_TEXT,
  NOT_FOUND_ERROR_TEXT,
  CAST_ERROR_TEXT
};
