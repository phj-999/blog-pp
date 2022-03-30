/**@module user的校验模块 */
const { body } = require('express-validator')
const validate = require('../middlewares/validate')
const usersModle = require('../models/users/users')

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
