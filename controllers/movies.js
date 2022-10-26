const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!req.user._id) {
        res.send([]);
      }
      else res.send(movies);
    })
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => new NotFoundError())
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw (new ForbiddenError());
      }
      Movie.findByIdAndRemove(req.params.id)
        .then((removedMovie) => res.send(removedMovie))
        .catch(next);
    })
    .catch(next);
};
