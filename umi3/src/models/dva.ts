import request from "umi-request"

const getTags = () => {
    return request('/api/xxx')
}
export default {
    namespace: 'tags', //调用model时候 通过命名空间调用 不要和其他model同名
    state: { tagsList: [] },  //状态  跟react中state类似  和redux中保存的satte一样
    effects: {
        //此处第一个参数payload是参数  组件中dispatch的第二个参数，在那里定义了，才能在这里拿到 
        //call和put都是函数 call调用异步函数   put做事件派发调用reducer
        *fetchTags({ payload, callback }, { put, call }) {
            //获取getTags数据  payload表示要传给getTags的参数  此处这里没有传什么
            const response = yield call(getTags, payload)
            //调用reducer
            yield put({
                type: "setTagsList",//类似于redux的action type
                payload: response//要传给下面的reducers的 数据
            })
        }

    }, //调用服务端接口，获取数据

    reducers: {
        //先接受上面put传递来的数据
        setTagsList(state, action) {
            return {
                ...state,
                tagsList: action.payload
            }
        }

    }  //经过上一步获取数据，此处更新state
}


//在文件中时使用的时候
//export default connect((model中结构出自己需要的)=>({传给ui组件的props 也是返回的对象名称 包含了前面解构的参数}))(组件名称)

//export default connect((tags)=>({tags}))(组件名称)
//函数中使用model
const { dispatch } = props
const list = props.tags.tagsList.xxx || []
dispatch({
    type: 'tags/fetchTags',  //model的命名空间/方法
    payload://参数  比如搜索表单提交什么的，这里的payload有了  才能在此dva文件的fetchTags的参数payload中拿到
})