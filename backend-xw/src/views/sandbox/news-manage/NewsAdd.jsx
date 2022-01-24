import React from 'react';
import { PageHeader, Descriptions } from 'antd';

const NewsAdd = () => {

const renderContent = (column = 2) => (
  <Descriptions size="small"
   column={column}
   >
   
    <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
    <Descriptions.Item label="Association">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="Remarks">
      Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
  </Descriptions>
);

const Content = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

return (
  <PageHeader
    className="site-page-header-responsive"
    onBack={() => window.history.back()}
    title="撰写新闻"
    subTitle="This is a subtitle"
  >
    <Content>{renderContent()}</Content> 
  </PageHeader>
  )
};

export default NewsAdd;
