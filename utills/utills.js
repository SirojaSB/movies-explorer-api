require('dotenv').config();

const { NODE_ENV, JWT_SECRET, DB_PATH } = process.env;

module.exports.getJWTSecretKey = function () {
  return NODE_ENV === 'production' ? JWT_SECRET : 'jwt-secret-key';
};

module.exports.dbPath = NODE_ENV === 'production' ? DB_PATH : 'mongodb://localhost:27017/moviesdb';
