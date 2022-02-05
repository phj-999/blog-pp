import React, { useEffect,useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ReParticles from "../../components/ReParticles/ReParticles.jsx";
import "./login.css";
import { login } from "./store/actionCreators";
import { useHistory, useLocation } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Login = () => {
  
  const location = useLocation()
  const history = useHistory();
  const dispatch = useDispatch();
  const [fresh, setFresh] = useState(false);
  const userLogin = useSelector(state => state.userLogin,shallowEqual)
  const {loading, error, user } = userLogin
  const redirect = location.search
  ? location.search.split("=")[1]
  : "/";

  useEffect(() => {
    if (user) {
     console.log(user);
      history.push(redirect);
      message.destroy('loginLoading')
    }
  }, [fresh, user])

  const onFinish = async(values) => {
   try {
    console.log("Received values of form: ", values);
   
     console.log(loading)
     message.loading({
      content:'加载中',
      key:'loginLoading'
     })
    dispatch(login(values));
    setFresh(true)
   } catch (error) {
     console.log(error);
   }
  
  };

  return (
    <div
      style={{
        background: "rgb(35,39,65)",
        height: "100%",
        overflow: "hiddlen",
      }}
    >
      { <ReParticles />}
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
