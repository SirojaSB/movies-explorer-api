const userRouter = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/user');
const { validateUserInfo } = require('../utills/userValidate');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateUserInfo, updateUserInfo);

module.exports = userRouter;
