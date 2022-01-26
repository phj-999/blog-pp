import * as actionTypes from "./constants";
import { getnewspreview } from "../../../../service/newspreview";

const getnewspreviewAction = (res) => ({
  type: actionTypes.GET_NEWSPREVIEW,
  newSdata: res,
});

export const getnewspreviewdata = (id) => {
  return (dispatch) => {
    getnewspreview(id).then((res) => {
      dispatch(getnewspreviewAction(res));
    });
  };
};
