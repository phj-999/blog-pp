// 引入mockJS
import mockjs from "mockjs";

export default {
    '/api/index':{
        id:1,
        name:'tom',
        age:12
    },

    'GET /api/person':{
        id:2,
        name:'lili',
        age:11
    },
    //mockjs
    'GET /api/mocktags': mockjs.mock({
      'list|100':[{name:'@city','value|1-100':50,'type|0-2':1}]
    })
}


