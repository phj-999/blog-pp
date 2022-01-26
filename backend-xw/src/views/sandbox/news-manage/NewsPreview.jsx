/**预览草稿页面 */
import React, { useEffect, useState } from "react";
import { PageHeader, Descriptions } from "antd";
import moment from "moment";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getnewspreviewdata } from "./store/actionCreators";

const NewsPreview = () => {
  const [newsInfo, setnewsInfo] = useState();
  const dispatch = useDispatch();
  const previewData = useSelector((state) => state.previewData);
  const { newspreview } = previewData;
  let params = useParams();
  
  useEffect(() => {
    dispatch(getnewspreviewdata(params.id));
    setnewsInfo(newspreview);
    console.log(newspreview, "newSdata");
    console.log(newsInfo.title, "newSdata");
  }, [dispatch, params.id]);

  const auditList = ["未审核", "审核中", "已通过", "未通过"];
  const publishList = ["未发布", "待发布", "已上线", "已下线"];

  const renderContent = (column = 3) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>

      <Descriptions.Item label="创建时间">
        {moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}
      </Descriptions.Item>

      <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>

      <Descriptions.Item label="发布时间">
        {newsInfo.publishTime
          ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss")
          : "-"}
      </Descriptions.Item>
      <Descriptions.Item label="审核状态">
        <span style={{ color: "red" }}>{auditList[newsInfo.auditState]}</span>
      </Descriptions.Item>
      <Descriptions.Item label="发布状态">
        <span style={{ color: "red" }}>
          {publishList[newsInfo.publishState]}
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="访问数量">{newsInfo.view}</Descriptions.Item>
      <Descriptions.Item label="点赞数量">{newsInfo.star}</Descriptions.Item>
      <Descriptions.Item label="评论数量">0</Descriptions.Item>
    </Descriptions>
  );

  const extraContent = (
    <div
      style={{
        display: "flex",
        width: "max-content",
        justifyContent: "flex-end",
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: newsInfo?.content,
        }}
        style={{
          margin: "0 24px",
          border: "1px solid gray",
        }}
      ></div>
    </div>
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
      title={newsInfo.title}
      subTitle={newsInfo.category.title}
    >
      <Content extra={extraContent}>{renderContent()}</Content>
    </PageHeader>
  );
};

export default NewsPreview;
