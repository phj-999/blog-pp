import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../../views/sandbox/home/Home";
import Nopermission from "../../views/sandbox/nopermission/Nopermission";
import RightList from "../../views/sandbox/right-manage/RightList";
import RoleList from "../../views/sandbox/right-manage/RoleList";
import UserList from "../../views/sandbox/user-manage/UserList";

const NewsRouter = () => {
  return (
    <Switch>
      <Route path="/home" component={Home} exact />
      <Route path="/user-manage/list" component={UserList} />
      <Route path="/right-manage/role/list" component={RoleList} />
      <Route path="/right-manage/right/list" component={RightList} />

      <Redirect from="/" to="/home" exact />
      <Route path="*" component={Nopermission} />
    </Switch>
  );
};

export default NewsRouter;
