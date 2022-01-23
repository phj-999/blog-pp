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

import Audit from "../../views/sandbox/audit-manage/Audit";
import AuditList from "../../views/sandbox/audit-manage/Audit";

import Unpublished from "../../views/sandbox/publish-manage/Unpublished";
import Published from "../../views/sandbox/publish-manage/Published";
import Sunset from "../../views/sandbox/publish-manage/Sunset";
import axios from "axios";

const LocalRouterMap = {
  "/home": Home,
  "user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewDraft, //草稿箱,
  "/news-manage/category": NewsCategory,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished, //待发布
  "/publish-manage/published": Published, // 已发布
  "/publish-manage/sunset": Sunset, // 已上线
};

const NewsRouter = () => {
  const [backRouteList, setBackRouteList] = useState([]);
  
  useEffect(()=>{
    Promise.all([
        axios.get("http://localhost:3000/rights"),
        axios.get("http://localhost:3000/children"),
    ]).then(res=>{
        // console.log(res)
        setBackRouteList([...res[0].data,...res[1].data])
         console.log(backRouteList)
    })
},[])

  return (
    <Switch>
        {/* 遍历路由 */}
        {
            backRouteList.map(item=>
               {
              
                       return  <Route exact path={item.key} key={item.key} component={LocalRouterMap[item.key]}/>
              
               }
            )
        }
      {/* <Route path="/home" component={Home} exact />
      <Route path="/user-manage/list" component={UserList} />
      <Route path="/right-manage/role/list" component={RoleList} />
      <Route path="/right-manage/right/list" component={RightList} /> */}

      <Redirect from="/" to="/home" exact />
      <Route path="*" component={Nopermission} />
    </Switch>
  );
};

export default NewsRouter;
