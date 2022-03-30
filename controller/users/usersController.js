const express = require('express') //引入express
const router = express.Router() // 使用express Router
const usersModle = require('../../models/users/users') // 引入User模型

class usersController {
  // 用户创建
  async register(req, res, next) {
    try {
      console.log(req.body)
      const { account, password } = req.body
      const user = new usersModle({ account, password })
      await user.save()
      res.status(201).json({
        msg: 'success',
        user
      })
    } catch (error) {
      next(error)
    }
  }
  // 用户登录
}

module.exports = new usersController()
