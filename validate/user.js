/**@module user的校验模块 */
const { body } = require('express-validator')
const validate = require('../middlewares/validate')
const usersModle = require('../models/users/users')
const secretPassword = require('../utils/secretPassword')

exports.register = validate([
  body('account')
    .notEmpty()
    .withMessage('账号不能为空')
    .custom(async (account) => {
      const Alusers = await usersModle.findOne({ account })
      if (Alusers) {
        return Promise.reject('用户已存在')
      }
    }),
  body('password').notEmpty().withMessage('密码不能为空')
])

exports.login = [
  validate([
    body('account').notEmpty().withMessage('账号不能为空'),
    body('password').notEmpty().withMessage('密码不能为空')
  ]),
  validate([
    // 只有上面的验证通过才会执行，利用的是中间件的机制
    body('account').custom(async (account, { req }) => {
      // 这里参数的req解构是官网文档用法
      const user = await usersModle
        .findOne({
          account
        })
        .select(['password', 'account']) // 这里需要获取密码的话，因为用户密码的模式设计那里设置了select: false，即通过查找不能查到密码，此时需要通过select()实现能查出密码

      if (!user) {
        return Promise.reject('用户不存在')
      }

      // 将数据挂载到请求对象上，这样子后续的中间件也可以直接使用
      req.user = user
    })
  ]),
  validate([
    body('password').custom(async (password, { req }) => {
      if (secretPassword(password) !== req.user.password) {
        return Promise.reject('密码错误')
      }
    })
  ])
]
