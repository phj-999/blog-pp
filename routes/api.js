var express = require('express')
var router = express.Router()

const echartsapi = require('./echartsApi/index')
// Controller
const usersController = require('../controller/users/usersController')
// validator
const userValidator = require('../validate/user')

router.use('/echartsapi', echartsapi)
router.use('/user/add', userValidator.register, usersController.register)

module.exports = router
