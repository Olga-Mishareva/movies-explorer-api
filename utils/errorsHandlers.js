const { errors } = require('celebrate');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

module.exports.errorsHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    const error = new ConflictError();
    res.status(error.statusCode).send({ message: error.message });
    return;
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    const error = new BadRequestError();
    res.status(error.statusCode).send({ message: error.message });
    return;
  }

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
