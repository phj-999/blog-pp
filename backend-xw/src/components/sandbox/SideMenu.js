import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
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
  const [meun, setMeun] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/rights?_embed=children")
      .then((response) => {
        console.log(response);
        setMeun(response.data);
      });
  }, []);

  const checkPagePermission = (item) => {
    return item.pagepermisson;
  };

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (item.children && checkPagePermission(item)) {
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

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo">全球新闻发布管理系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {renderMenu(meun)}
      </Menu>
    </Sider>
  );
};
export default SideMenu;
