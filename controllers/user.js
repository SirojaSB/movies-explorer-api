const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../utills/errors/badRequestError');
const NotFoundError = require('../utills/errors/notFoundError');
const ConflictError = require('../utills/errors/conflictError');
const { getJWTSecretKey } = require('../utills/utills');
const { NOT_FOUND_USER, INCORRECT_DATA, DOUBLE_EMAIL } = require('../utills/constants');

module.exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(new NotFoundError(NOT_FOUND_USER));

    return res.send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(INCORRECT_DATA));
    }
    return next(err);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const user = await User.findOne({ email });

    if (user && !user._id.equals(req.user._id)) {
      return next(new ConflictError(DOUBLE_EMAIL));
    }

    const newUserInfo = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.send(newUserInfo);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(INCORRECT_DATA));
    }
    return next(err);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
      name,
    });

    return res.send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError(DOUBLE_EMAIL));
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(INCORRECT_DATA));
    }
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const jwtKey = getJWTSecretKey();

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, jwtKey, { expiresIn: '7d' });

    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};
