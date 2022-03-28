var express = require('express');
var router = express.Router();

const echartsapi = require('./echartsApi/index');
const usersController = require('../controller/users/users');

router.use('/echartsapi',echartsapi)
router.use('/user', usersController)

module.exports = router;