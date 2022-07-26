const Movie = require('../models/movie');

const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при добавлении фильма.'));
        return;
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => { // найти фильмы именно c owner
  Movie.find({ owner: req.user._id })
    .orFail(() => new NotFoundError('Фильмы указанного пользователя не найдены.'))
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.param.id)
    .orFail(() => new NotFoundError('Фильм с указанным _id не найден.'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw (new ForbiddenError('Нет прав для удаления этого фильма.'));
      }
      Movie.findByIdAndRemove(req.param.id)
        .then((removedMovie) => res.send(removedMovie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении фильма.'));
        return;
      }
      next(err);
    });
};
