var express = require('express');
var router = express.Router();

const echartsapi = require('./echartsApi/index');

router.use('/echartsapi',echartsapi)

module.exports = router;