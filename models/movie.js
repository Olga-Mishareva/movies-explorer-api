const mongoose = require('mongoose');
const { linkRegex } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => linkRegex.test(value),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => linkRegex.test(value),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => linkRegex.test(value),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
