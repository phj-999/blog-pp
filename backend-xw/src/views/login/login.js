import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ReParticles from "../../components/ReParticles/ReParticles.jsx";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios
      .get(
        `http://localhost:3000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
      )
      .then((res) => {
        if (res.data.length === 0) {
          message.error("不匹配");
        } else {
          localStorage.setItem("token", JSON.stringify(res.data[0]));
          history.push("/");
        }
      });
  };

  return (
    <div
      style={{
        background: "rgb(35,39,65)",
        height: "100%",
        overflow: "hiddlen",
      }}
    >
      <ReParticles />
      <div className="formContainer">
        <div className="logintitle">发布管理系统</div>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
