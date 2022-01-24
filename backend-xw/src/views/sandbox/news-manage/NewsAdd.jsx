import React, { useState, useRef, useEffect } from "react";
import { PageHeader, Steps, Button, Input, Form, Select } from "antd";
import { getcategories } from "../../../service/newsadd";

const NewsAdd = () => {
  const [current, setCurrent] = useState(0); //当前第几步的值
  const [categoryList, setCategoryList] = useState([]);
  const { Option } = Select;
  const { Step } = Steps;
  const NewsForm = useRef(null);
  
  //分类的内容
  useEffect(() => {
    getcategories().then((res) => {
      setCategoryList(res);
    });
  }, []);

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 19 },
  };
  //下一步
  const handleNext = () => {
   if (current===0) {
     NewsForm.current.validateFields().then(res=>{
      setCurrent(current + 1);
     }).catch(error=>{
        console.log(error);
     })
   }else{
    setCurrent(current + 1);
   }
  };
  // 上一步
  const handlePrevious = () => {
    setCurrent(current - 1);
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

      <div style={{ display: current === 1 ? "" : "none" }}>
        {/* <Input placeholder="input with clear icon" allowClear 
        //onChange={} 
        /> */}
        222
      </div>

      <div style={{ display: current === 2 ? "" : "none" }}>
        {/* <Input placeholder="input with clear icon" allowClear 
        //onChange={} 
        /> */}
        333
      </div>
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
            <Button type="primary">保存草稿</Button>
            <Button style={{ marginLeft: "25px" }} danger>
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
      onBack={() => window.history.back()}
      title="撰写新闻"
      subTitle="This is a subtitle"
    >
      <Content style={{}} extra={extraContent}>
        {renderContent()}
      </Content>
    </PageHeader>
  );
};

export default NewsAdd;
