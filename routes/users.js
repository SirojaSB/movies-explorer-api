const userRouter = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/user');
const { validateUserInfo } = require('../utills/userValidate');

userRouter.get('/', getUserInfo);
userRouter.patch('/', validateUserInfo, updateUserInfo);

module.exports = userRouter;
