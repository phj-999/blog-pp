import { combineReducers } from "redux";

 import { LoginReducer } from "../views/login/store/reducer";

export default combineReducers({
  userLogin:LoginReducer
});
