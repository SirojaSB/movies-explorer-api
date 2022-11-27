const limiter = require('express-rate-limit');

module.exports = limiter({
  windowMs: 300000,
  max: 100,
});
