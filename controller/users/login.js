// const express = require('express') //引入express
// const router = express.Router() // 使用express Router
// const usersModle = require('../../models/users/users')

// router.post('/login', async (req, res) => {
//   let { account, password } = req.body
//   // 判断是否存在
//   let loginResult = await usersModle.find({
//     account: account,
//     password: password
//   })
//   if (!loginResult) {
//     return res.status(400).json({ msg: 'fail' })
//   }
// })
