const jwt = require('jsonwebtoken');
const { DEV_KEY } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация.'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY,
    );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация.'));
    return;
  }

  req.user = payload;
  next();
};
