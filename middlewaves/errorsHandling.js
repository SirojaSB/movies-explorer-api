const { ERROR_ON_SERVER } = require('../utills/constants');

module.exports = (error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).send({
    message: statusCode === 500 ? ERROR_ON_SERVER : message,
  });

  next();
};
