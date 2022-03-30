const express = require('express') //引入express
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
  async Login(req, res) {
    try {
      const user = req.user
      console.log(res.token, 'token')
      console.log(user, 'user')
      res.status(200).json({
        msg: '登陆成功',
        userdata: {
          user: { id: user._id, username: user.account },
          token: res.token
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new usersController()
