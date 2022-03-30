const express = require('express') //引入express
const secretPassword = require('../../utils/secretPassword')

class userMiddleware {
  handlePassword(req, res, next) {
    try {
      let { password } = req.body
      req.body.password = secretPassword(password)
      next()
    } catch (error) {
      return res.status(401).end('注册失败')
    }
  }
}

module.exports = new userMiddleware()
