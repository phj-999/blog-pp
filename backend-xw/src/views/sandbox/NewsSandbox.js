import React, { useEffect } from "react";

import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import NewsRouter from "../../components/sandbox/NewsRouter";

//css
import "./NewsSandBox.css";
import "nprogress/nprogress.css";

//antd
import { Layout } from "antd";
import NProgress from "nprogress";

const { Content } = Layout;

const NewsSandbox = () => {

  //顶部的进度条
  NProgress.start();
  useEffect(() => {
    NProgress.done();
  });

  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <NewsRouter />
        </Content>
      </Layout>
    </Layout>
  );
};

export default NewsSandbox;
