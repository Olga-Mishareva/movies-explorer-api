const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CREATED } = require('../utils/constants');
const { DEV_KEY } = require('../utils/config');

const { NODE_ENV, JWT_SECRET, SALT_ROUND } = process.env;
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((userWithSameEmail) => {
      if (userWithSameEmail) throw new ConflictError('Такой email уже существует.');
      return bcrypt.hash(password, NODE_ENV === 'production' ? SALT_ROUND : 8);
    })
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(CREATED).send({ name: user.name, email: user.email, _id: user._id.toString() });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY,
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({
          name: user.name,
          email: user.email,
          _id: user._id,
        });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .then(() => {
      res.clearCookie('jwt', { httpOnly: true, sameSite: true })
        .send({ message: 'Пользователь разлогинен.' });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь с указанным _id не найден.'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь с указанным _id не найден.'))
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};
