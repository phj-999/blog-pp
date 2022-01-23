import * as actionTypes from "./constants";
import axios from "axios";
import { message } from "antd";

//用户登录Action

export const login = (values) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_LOGIN_REQUEST,
    });
    await axios
      .get(
        `http://localhost:3000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
      )
      .then((res) => {
        const data = res.data;
        console.log(data[0]);
        dispatch({
          type: actionTypes.USER_LOGIN_SUCCESS,
          payload: data,
        });
        localStorage.setItem("token", JSON.stringify(data[0]));
      });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    message.error("不匹配");
  }
};

//用户退出登录Action
export const logouthandle = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: actionTypes.USER_LOGOUT });
};
