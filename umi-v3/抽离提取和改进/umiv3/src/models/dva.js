// export default {
//     namespace: 'dvatest',    //命名空间（唯一的）  通拓命名空间调用
//     state:{}, //状态 跟react中的state类似  和redux中保存到额state一样
//     effects:{}, //调用服务端的接口 获取数据
//     reducers:{}, //更新state中保存的数据
// }


import { getTages } from "@/src/services/tages";


export default {
    namespace: 'dvatest',    //命名空间（唯一的）  通拓命名空间调用
    state:{
        tagsList:[]
    }, //状态 跟react中的state类似  和redux中保存到额state一样
    //调用服务端的接口 获取数据
    effects:{
        //payload参数
        //put  获取的数据之类的传给reduer
        //call 可以访问外部的一些方法
        *fetchTags(put,call) {
            //获取getTages数据
            const res = yield call(getTages,//参数
                )

            //更新状态（调用reducers）
            yield put({ //传给reducer
                type: 'setTags', //类似于redux的action的type
                payload: res
            })
        }
    },
    
    //更新state
    //接受上面put传来的的数据
     //更新state中保存的数据
    reducers:{
        setTagsList(state,action) {
            return {
                ...state, //不能直接更改，因为纯函数， 所以先把原来的state拿过来
                tagList: action.payload  //这个payload就是上面的res
            }

        }
    },
}

//下来是在页面中使用  dva.tsx