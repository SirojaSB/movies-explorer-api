const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../utills/errors/badRequestError');
const NotFoundError = require('../utills/errors/notFoundError');
const ForbiddenError = require('../utills/errors/forbiddenError');
const { NOT_FOUND_MOVIE, INCORRECT_DATA, NO_ACCESS_TO_DELETE } = require('../utills/constants');

module.exports.getSavedMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });

    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });

    return res.send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(INCORRECT_DATA));
    }

    return next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
      .orFail(new NotFoundError(NOT_FOUND_MOVIE));

    if (!movie.owner.equals(req.user._id)) {
      return next(new ForbiddenError(NO_ACCESS_TO_DELETE));
    }

    await movie.remove();

    return res.send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(INCORRECT_DATA));
    }

    return next(err);
  }
};
