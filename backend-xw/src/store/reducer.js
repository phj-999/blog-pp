import { combineReducers } from "redux";

 import { LoginReducer } from "../views/login/store/reducer";
import Previewreducer from '../views/sandbox/news-manage/store/reducer';
export default combineReducers({
  userLogin:LoginReducer,
  previewData:Previewreducer
});
