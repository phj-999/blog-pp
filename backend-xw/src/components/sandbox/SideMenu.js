import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import "./index.css";

const iconList = {
  "/home": <UserOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UserOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />,
  //.......
};

const SideMenu = () => {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const history = useHistory();
  let location = useLocation();
  const [meun, setMeun] = useState([]);

  useEffect(() => {
    let isUnmounted = true;
    const abortController = new window.AbortController();
    if (isUnmounted)
      axios
        .get("http://localhost:3000/rights?_embed=children")
        .then((response) => {
          console.log(response);
          setMeun(response.data);
        });
    return () => {
      isUnmounted = false;
      abortController.abort();
    };
  }, []);

  const checkPagePermission = (item) => {
    const {
      role: { rights },
    } = JSON.parse(localStorage.getItem("token"));
    // return item.pagepermisson && 当前用户权限列表.includes(item.key);
    return item.pagepermisson && rights.includes(item.key);
  };
  /**
   * @description 递归动态渲染 侧边栏内容
   * @param {string} menuList
   */
  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return (
          <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }

      return (
        checkPagePermission(item) && (
          <Menu.Item
            key={item.key}
            icon={iconList[item.key]}
            onClick={() => {
              //  console.log(props)
              history.push(item.key);
            }}
          >
            {item.title}
          </Menu.Item>
        )
      );
    });
  };
  //用来保持刷新后的页面和刷新前在一处
  console.log(location);
  const selectKeys = [location.pathname]; //用来保持刷新后Menu的defaultSelectedKeys
  const openKeys = ["/" + location.pathname.split("/")[1]]; //用来保持刷新后Menu的defaultOpenKeys

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo">全球新闻发布管理系统</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
          >
            {renderMenu(meun)}
          </Menu>
        </div>
      </div>
    </Sider>
  );
};
export default SideMenu;
