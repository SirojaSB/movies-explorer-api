const jwt = require('jsonwebtoken');
const { getJWTSecretKey } = require('../utills/utills');
const UnauthorizedError = require('../utills/errors/unauthorizedError');
const { WRONG_EMAIL_OR_PASS } = require('../utills/constants');

module.exports.verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(WRONG_EMAIL_OR_PASS));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    const jwtKey = getJWTSecretKey();
    payload = jwt.verify(token, jwtKey);
  } catch (err) {
    return next(new UnauthorizedError(WRONG_EMAIL_OR_PASS));
  }

  req.user = payload;

  return next();
};
