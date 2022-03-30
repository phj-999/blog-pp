const mongoose = require('mongoose')
const { Schema } = mongoose
const secretPassword = require('../../utils/secretPassword')

const UsersSchema = new Schema(
  {
    account: { type: String, required: true },
    password: {
      type: String,
      required: true,
      set: (value) => secretPassword(value)
    }
  },
  { collection: 'users' }
)
// mongoose.model（参数1:模型名称（首字母大写），参数2:Schema，参数3:数据库集合名称
var usersModle = mongoose.model('users', UsersSchema)
module.exports = usersModle
