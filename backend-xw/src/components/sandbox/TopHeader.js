import React, { useState } from "react";
import { Layout, Dropdown, Menu, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export default function TopHeader() {
  const { Header } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory()
  const changeCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // 退出
  const logout = ()=>{
    localStorage.removeItem('token')
    history.replace('/login')
  }
  const menu = (
    <Menu>
      <Menu.Item>超级管理员</Menu.Item>
      <Menu.Item danger onClick={logout}>退出</Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changeCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changeCollapsed} />
      )}

      <div style={{ float: "right" }}>
        <span>欢迎admin回来</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}
