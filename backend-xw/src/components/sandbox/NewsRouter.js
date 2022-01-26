import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../../views/sandbox/home/Home";
import Nopermission from "../../views/sandbox/nopermission/Nopermission";
import RightList from "../../views/sandbox/right-manage/RightList";
import RoleList from "../../views/sandbox/right-manage/RoleList";
import UserList from "../../views/sandbox/user-manage/UserList";

import NewsAdd from "../../views/sandbox/news-manage/NewsAdd";
import NewDraft from "../../views/sandbox/news-manage/NewDraft";
import NewsCategory from "../../views/sandbox/news-manage/NewsCategory";
import NewsPreview from "../../views/sandbox/news-manage/NewsPreview";
import NewsUpdate from "../../views/sandbox/news-manage/NewsUpdate";

import Audit from "../../views/sandbox/audit-manage/Audit";
import AuditList from "../../views/sandbox/audit-manage/AuditList";

import Unpublished from "../../views/sandbox/publish-manage/Unpublished";
import Published from "../../views/sandbox/publish-manage/Published";
import Sunset from "../../views/sandbox/publish-manage/Sunset";
import axios from "axios";

const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewDraft, //草稿箱,
  "/news-manage/preview/:id":NewsPreview,//草稿箱某条数据的预览页面
  "/news-manage/update/:id":NewsUpdate,//更新新闻页面
  "/news-manage/category": NewsCategory,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished, //待发布
  "/publish-manage/published": Published, // 已发布
  "/publish-manage/sunset": Sunset, // 已上线
};

const NewsRouter = () => {
  const [backRouteList, setBackRouteList] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3000/rights"),
      axios.get("http://localhost:3000/children"),
    ]).then((res) => {
      setBackRouteList([...res[0].data, ...res[1].data]);
    });
  }, []);

  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem("token"));
  /**
   * 检测有无 key: "/xx-x"路径 item.pagepermisson
   * 遍历中有则渲染 无责不渲染 这样可以避免不显示菜单时候 输入路由进来的情况
   */
  const checkRoute = (item) => {
    return LocalRouterMap[item.key] && (item.pagepermisson||item.routepermisson);
  };

  /**检测是否具有某个权限  role:{rights}里面是权限  路由形式的
   * 无则渲染 无则不渲染
   */
  const checkUserPermission = (item) => {
    return rights.includes(item.key);
  };
  return (
    <Switch>
      {/* 遍历路由 */}
      {backRouteList.map((item) => {
        if (checkRoute(item) && checkUserPermission(item)) {
          return (
            <Route
              path={item.key}
              key={item.key}
              component={LocalRouterMap[item.key]}
              exact
            />
          );
        }
        return null;
      })}
      {/* <Route path="/home" component={Home} exact />
      <Route path="/user-manage/list" component={UserList} />
      <Route path="/right-manage/role/list" component={RoleList} />
      <Route path="/right-manage/right/list" component={RightList} /> */}

      <Redirect from="/" to="/home" exact />
      {backRouteList.length > 0 && <Route path="*" component={Nopermission} />}
    </Switch>
  );
};

export default NewsRouter;
