const { errors } = require('celebrate');
const NotFoundError = require('../errors/NotFoundError');

module.exports.errorsHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка.' : message,
  });
  next();
};

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError('Путь не найден.'));
};

module.exports.joiErrors = errors({ message: 'Переданы некорректные данные.' });
