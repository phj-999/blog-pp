import React from "react";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import "./index.css";
//模拟数组结构
const menuList = [
  {
    key: "/home",
    title: "首页",
    icon: <UserOutlined />,
  },
  {
    key: "/user-manage",
    title: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user-manage/list",
        title: "用户列表",
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: "/right-manage",
    title: "权限管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/right-manage/role/list",
        title: "角色列表",
        icon: <UserOutlined />,
      },
      {
        key: "/right-manage/right/list",
        title: "权限列表",
        icon: <UserOutlined />,
      },
    ],
  },
];

const SideMenu = () => {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const history = useHistory();
  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (item.children) {
        return (
          <SubMenu kry={item.key} icon={item.icon} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => {
            //  console.log(props)
            history.push(item.key);
          }}
        >
          {item.title}
        </Menu.Item>
      );
    });
  };

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo">全球新闻发布管理系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {renderMenu(menuList)}
      </Menu>
    </Sider>
  );
};
export default SideMenu
