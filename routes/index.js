const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, register } = require('../controllers/user');
const { verifyToken } = require('../middlewaves/auth');
const { validateRegisterData, validateLoginData } = require('../utills/userValidate');
const NotFoundError = require('../utills/errors/notFoundError');
const { INCORRECT_URL } = require('../utills/constants');

router.post('/signin', validateLoginData, login);
router.post('/signup', validateRegisterData, register);

router.use(verifyToken);

router.use('/me', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => next(new NotFoundError(INCORRECT_URL)));

module.exports = router;
