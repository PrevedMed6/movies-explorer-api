// #region error codes
const DEFAULT_ERROR = 500;
const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const DUPLICATE_ERROR = 409;
// #endregion

// #region error names
const VALIDATION_ERROR_NAME = 'ValidationError';
const CAST_ERROR_NAME = 'CastError';
const FORBIDDEN_ERROR_NAME = 'Forbidden';
const NOT_FOUND_ERROR_NAME = 'NotFoundError';
const UNAUTHORZED_ERROR_NAME = 'UnauthorizedError';
const DUPLICATE_ERROR_NAME = 'UserDuplicateError';
// #endregion

// #region error messages
const VALIDATION_ERROR_TEXT = 'Переданы некорректные данные';
const NOT_FOUND_ERROR_TEXT = 'Запрашиваемый объект или страница не найдены';
const LOGIN_FAILED_ERROR_TEXT = 'Неправильные почта или пароль';
const UNAUTHORIZED_ERROR_TEXT = 'Необходима авторизация';
const UNEXPECTED_ERROR_TEXT = 'На сервере произошла ошибка';
const PAGE_NOT_FOUND_ERROR_TEXT = 'Страница не найдена';
const FORBIDDEN_ERROR_TEXT = 'Недостаточно прав на совершение действия';
const DUPLICATE_ERROR_TEXT = 'Дублируется уникальное поле';
const USER_DUPLICATE_ERROR_TEXT = 'Пользователь с таким email уже существует';
const MOVIE_DUPLICATE_ERROR_TEXT = 'Фильм с таким ID уже существует';
// #endregion

// #region validation error messages
const INVALID_EMAIL = 'Некорректный почтовый адрес';
const INVALID_URL = 'Некорректная ссылка';
// #endregion

// #region validation expressions
const URL_VALIDATION_REGEX =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([a-zA-Z0-9/\-._~:?#[\]@!$&'()*+,;=]*)#?$/;
const EMAIL_VALIDATION_EXPRESSION = {
  minDomainSegments: 2,
  tlds: { allow: ['ru', 'com', 'net'] },
};
// #endregion

// #region success messages
const LOGIN_SUCCEEDED = 'Авторизация успешна';
const LOGOUT_SUCCEEDED = 'Вы вышли';
// #endregion

const COOKIE_NAME = 'jwt';
const PERIOD_FOR_IP = 1000 * 60 * 15;
const MAX_TRY_COUNT = 100;

module.exports = {
  DEFAULT_ERROR,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  DUPLICATE_ERROR,
  VALIDATION_ERROR_NAME,
  CAST_ERROR_NAME,
  FORBIDDEN_ERROR_NAME,
  NOT_FOUND_ERROR_NAME,
  UNAUTHORZED_ERROR_NAME,
  DUPLICATE_ERROR_NAME,
  VALIDATION_ERROR_TEXT,
  NOT_FOUND_ERROR_TEXT,
  LOGIN_FAILED_ERROR_TEXT,
  UNAUTHORIZED_ERROR_TEXT,
  UNEXPECTED_ERROR_TEXT,
  PAGE_NOT_FOUND_ERROR_TEXT,
  FORBIDDEN_ERROR_TEXT,
  DUPLICATE_ERROR_TEXT,
  USER_DUPLICATE_ERROR_TEXT,
  MOVIE_DUPLICATE_ERROR_TEXT,
  INVALID_EMAIL,
  URL_VALIDATION_REGEX,
  INVALID_URL,
  EMAIL_VALIDATION_EXPRESSION,
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED,
  COOKIE_NAME,
  PERIOD_FOR_IP,
  MAX_TRY_COUNT
};
