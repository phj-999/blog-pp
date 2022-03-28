const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema(
  {
    account: { type: String, required: true },
    password: { type: Number, required: true },
  },
  { collection: "users" }
);
// mongoose.model（参数1:模型名称（首字母大写），参数2:Schema，参数3:数据库集合名称
var usersModle = mongoose.model("users", UsersSchema);
module.exports = usersModle;
