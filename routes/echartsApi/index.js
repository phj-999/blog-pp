let express=require("express");
let router=express.Router()
let mapData=require("../../public/mock/china.json")
let oneData=require("../../public/mock/one.json")
let twoData=require("../../public/mock/two.json")
let threeData=require("../../public/mock/three.json")
let fourData=require("../../public/mock/four.json")

router.get("/mapdata",(req,res)=>{
    res.send({msg:"我是地图的路由地址",chinaData:mapData})
})

router.get("/onedata",(req,res)=>{
    res.send({msg:"我是one的路由地址",chartData:oneData})
})

router.get("/twodata",(req,res)=>{
    res.send({msg:"我是two的路由地址",chartTwo:twoData})
})

router.get("/threedata",(req,res)=>{
    res.send({msg:"我是two的路由地址",chartThree:threeData})
})

router.get("/fourdata",(req,res)=>{
    res.send({msg:"我是four的路由地址",chartFour:fourData})
})


module.exports=router;