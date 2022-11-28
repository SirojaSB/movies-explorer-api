const { celebrate, Joi } = require('celebrate');
const { REGEX_URL } = require('./constants');

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateCardInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(REGEX_URL),
    trailerLink: Joi.string().required().pattern(REGEX_URL),
    thumbnail: Joi.string().required().pattern(REGEX_URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
