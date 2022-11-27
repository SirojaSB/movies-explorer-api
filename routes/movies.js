const cardRouter = require('express').Router();
const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const { validateCardInfo, validateMovieId } = require('../utills/movieValidate');

cardRouter.get('/', getSavedMovies);
cardRouter.post('/', validateCardInfo, createMovie);
cardRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = cardRouter;
