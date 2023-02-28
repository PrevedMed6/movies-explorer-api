const { celebrate, Joi } = require('celebrate');

const URL_VALIDATION_REGEX =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([a-zA-Z0-9/\-._~:?#[\]@!$&'()*+,;=]*)#?$/;
const EMAIL_VALIDATION_EXPRESSION = {
  minDomainSegments: 2,
  tlds: { allow: ['ru', 'com', 'net'] },
};

// #region validation error messages
const INVALID_EMAIL = 'Некорректный почтовый адрес';
const INVALID_URL = 'Некорректная ссылка';
// #endregion

const SIGNUP_VALIDATION = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(EMAIL_VALIDATION_EXPRESSION),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const SIGNIN_VALIDATION = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(EMAIL_VALIDATION_EXPRESSION),
    password: Joi.string().required(),
  }),
});

const PATCH_USER_VALIDATION = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(EMAIL_VALIDATION_EXPRESSION),
  }),
});

const DELETE_MOVIE_VALIDATION = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const POST_MOVIE_VALIDATION = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_VALIDATION_REGEX),
    trailerLink: Joi.string().required().regex(URL_VALIDATION_REGEX),
    thumbnail: Joi.string().required().regex(URL_VALIDATION_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  PATCH_USER_VALIDATION,
  DELETE_MOVIE_VALIDATION,
  POST_MOVIE_VALIDATION,
  SIGNIN_VALIDATION,
  SIGNUP_VALIDATION,
  URL_VALIDATION_REGEX,
  EMAIL_VALIDATION_EXPRESSION,
  INVALID_EMAIL,
  INVALID_URL
};
