/**
 * 更新新闻页面
 *
 */

import React, { useState, useRef, useEffect } from "react";
import {
  PageHeader,
  Steps,
  Button,
  Input,
  Form,
  Select,
  notification,
} from "antd";
import { getcategories, save } from "../../../service/newsadd";
import { errorModal } from "../../../components/error/ErrorModal";
import NewsEditor from "../../../components/NewsEditor/NewsEditor";
import axios from "axios";
import { patchnews } from "../../../service/newsupdate";

const NewsUpdate = (props) => {
  const [current, setCurrent] = useState(0); //当前第几步的值
  const [categoryList, setCategoryList] = useState([]);
  const [content, setContent] = useState("");
  const [formInfo, setformInfo] = useState({});
  const { Option } = Select;
  const { Step } = Steps;
  const NewsForm = useRef(null);

  //分类的内容
  useEffect(() => {
    getcategories().then((res) => {
      setCategoryList(res);
      console.log(categoryList, "categoryList");
    });
  }, [props]);
  //所点击部分的id内容
  useEffect(() => {
    let encodeUrl = encodeURI(
      `http://localhost:3000/news/${props.match.params.id}?_expand=category&_expand=role`
    );
    axios.get(decodeURI(encodeUrl)).then((res) => {
      console.log(res, "rrrrrr");
      let { title, categoryId, content } = res.data;
      NewsForm.current.setFieldsValue({
        title,
        categoryId,
      });

      setContent(content);
    });
  }, [props.match.params.id]);

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 19 },
  };
  //下一步
  const handleNext = async () => {
    if (current === 0) {
      await NewsForm.current
        .validateFields()
        .then((res) => {
          setformInfo(res);
          setCurrent(current + 1);
        })
        .catch((error) => {
          console.log(error);
          errorModal(error);
        });
    } else {
      if (content === "" || content.trim() === "<p></p>") {
        errorModal("内容不能为空");
      } else {
        setCurrent(current + 1);
      }
    }
  };
  // 上一步
  const handlePrevious = () => {
    setCurrent(current - 1);
  };
  /**
   * 保存草稿或者提交
   * @param {number} auditState
   * auditState=0 表示保存草稿
   * auditState=1 表示提交审核
   */
  const handleSave = async (auditState) => {
    console.log("fafa");

    await patchnews(`${props.match.params.id}`, {
      ...formInfo,
      content: content,
      auditState: auditState,
    }).then((res) => {
      console.log(res, "updateres");
      props.history.push(
        auditState === 0 ? "/news-manage/draft" : "/audit-manage/list"
      );

      notification.info({
        message: `通知`,
        description: `您可以到${
          auditState === 0 ? "草稿箱" : "审核列表"
        }中查看您的新闻`,
        placement: "bottomRight",
      });
    });
  };

  const renderContent = () => (
    <>
      <Steps current={current}>
        <Step title="基本信息" description="标题分类" />
        <Step title="内容" subTitle="Left 00:00:08" description="主题内同" />
        <Step title="提交" description="保存草稿或审核提交" />
      </Steps>

      <div style={{ display: current === 0 ? "" : "none", marginTop: "50px" }}>
        <Form {...layout} name="basic" ref={NewsForm}>
          <Form.Item
            label="新闻标题"
            name="title"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="新闻分类"
            name="categoryId"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select>
              {categoryList.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>

      <div style={{ marginTop: "50px", display: current === 1 ? "" : "none" }}>
        <NewsEditor
          getContent={(value) => {
            setContent(value);
          }}
          content={content}
        />
      </div>

      <div style={{ display: current === 2 ? "" : "none" }}></div>
    </>
  );

  const extraContent = (
    <div
      style={{
        width: "max-content",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "50px",
        }}
      >
        {current === 2 && (
          <span style={{ display: "inline-block" }}>
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleSave(0);
              }}
            >
              保存草稿
            </Button>
            <Button
              onClick={() => handleSave(1)}
              style={{ marginLeft: "25px" }}
              danger
            >
              提交审核
            </Button>
          </span>
        )}
        {current < 2 && (
          <Button type="primary" onClick={handleNext}>
            下一步
          </Button>
        )}

        {current > 0 && (
          <Button style={{ marginLeft: "25px" }} onClick={handlePrevious}>
            {" "}
            上一步
          </Button>
        )}
      </div>
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
      onBack={() => props.history.goBack()}
      title="更新新闻"
      subTitle="This is a subtitle"
    >
      <Content style={{}} extra={extraContent}>
        {renderContent()}
      </Content>
    </PageHeader>
  );
};

export default NewsUpdate;
