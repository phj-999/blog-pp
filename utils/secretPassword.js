/**
 * md5加密
 * @method
 * @param {Number} password 获取到的用户输入的密码
 * @desc 根据用户输入密码生成加密后的密码
 */
const crypto = require('crypto') // node自带的密码相关的模块
// hmac_sha256秘钥
const HMACSHA256KEY = 'ARGDSSsadafsdsdvds432254651001+*&^'
const secretPassword = (str) => {
  let result = crypto
    .createHmac('sha256', HMACSHA256KEY)
    .update(JSON.stringify(str))
    .digest()
    .toString('hex')
  return result
}
module.exports = secretPassword
