const mongoose = require('mongoose');
const validator = require('validator');
const { INCORRECT_URL } = require('../utills/constants');

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
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link, {
        protocols: ['http', 'https'],
        require_protocol: true,
      }),
      message: () => INCORRECT_URL,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link, {
        protocols: ['http', 'https'],
        require_protocol: true,
      }),
      message: () => INCORRECT_URL,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link, {
        protocols: ['http', 'https'],
        require_protocol: true,
      }),
      message: () => INCORRECT_URL,
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
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
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);