const express = require('express') //引入express
const fs = require('fs')
const path = require('path')
const secretPassword = require('../../utils/secretPassword')
const jwt = require('jsonwebtoken')
class userMiddleware {
  async privateSecret(req, res, next) {
    const resolve = (_path) => path.resolve(__dirname, _path)
    const PRIVATE_KEY = fs.readFileSync(resolve('../../keys/private.key')) //私钥用来加密
    //const PUBLIC_KEY =  fs.readFileSync('../../keys/public.key') //公钥用来解密验证
    try {
      const user = req.user.toJSON()
      const token = jwt.sign(
        { userId: user._id, account: user.account },
        PRIVATE_KEY,
        {
          expiresIn: 60 * 60 * 24, // 授权时效24小时
          //默认是hs256算法  非对称加密指定RS256的算法
          algorithm: 'RS256'
        }
      )
      res.token = token
      next()
    } catch (error) {}
  }
}

module.exports = new userMiddleware()
