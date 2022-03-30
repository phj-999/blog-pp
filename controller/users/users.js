// const express = require("express"); //引入express
// const router = express.Router(); // 使用express Router
// const usersModle = require("../../models/users/users"); // 引入User模型

// router.post("/add", async (req, res) => {
//   // const newUser =await new usersModle(req.body);
//   try {
//     console.log(req.body);
//     const user = await usersModle.create(req.body)
//     res.send({ msg: "用户创建成功",data: user});
//   } catch (error) {
//     console.log(error);
//     res.send({ msg: "创建失败", eror: error});
//   }
// });

// router.get('/get', async(req,res)=>{
//   try {
//     const data =await usersModle.find()
//     console.log(data);
//     res.send({msg:'1', data:data})
//   } catch (error) {
//     res.send({ msg: "创建失败", eror: error});
//   }
// })
// module.exports = router
