var express = require('express')
var router = express.Router()

const echartsapi = require('./echartsApi/index')
// Controller
const usersController = require('../controller/users/usersController')
// validator
const userValidator = require('../validate/user')
const userMiddleware = require('../middlewares/user/user.middleware')

router.use('/echartsapi', echartsapi)
router.post('/user/add', userValidator.register, usersController.register) //注册
router.post(
  '/user/login',
  userValidator.login,
  userMiddleware.privateSecret,
  usersController.Login
) // 登录

module.exports = router
