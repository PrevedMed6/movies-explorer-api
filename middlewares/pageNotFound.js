module.exports = (req, res, next) => {
  next(new Error('Страница не найдена'));
};
