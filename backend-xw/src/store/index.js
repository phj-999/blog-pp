/**
 * createStore创建一个store做管理
   combineReducers 组合成一个大的reducer对象
   applyMiddleware 使用中间件react thunk   把redux变成异步
   composeWithDevTools 拓展  在谷歌浏览器可以查看redux
   react-redux 桥梁  react和redux
 */

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

//获取本地存储用户登录信息
// const userInfoFronLocalStorage = localStorage.getItem('token') ? JSON.parse(localStorage.getItem("token")):null
//初始化state
const initialState = {
  //  userLogin:{userInfo:userInfoFronLocalStorage}
}; //每一个reducer对应一个state，所有的state组成一个initialState
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk]; //设置成数组，含有多个中间件

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
