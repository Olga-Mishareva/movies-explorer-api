const { errors } = require('celebrate');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const {
  SERVER_ERR,
  serverErr,
  badRequest,
  pathNotFound,
} = require('./constants');

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

  const { statusCode = SERVER_ERR, message } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERR ? serverErr : message,
  });

  next();
};

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError(pathNotFound));
};

module.exports.joiErrors = errors({ message: badRequest });
