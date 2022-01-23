import React, { forwardRef, useState, useEffect } from "react";
import { Form, Input, Select } from "antd";

const UserForm = forwardRef((props, ref) => {
  const [isDisabled, setisDisabled] = useState(false);
  const { Option } = Select;
  const { roleId, region } = JSON.parse(
    localStorage.getItem("token")
  );
  const roleObj = {
    1: "superadmin",
    2: "admin",
    3: "editor",
  };

  useEffect(() => {
    setisDisabled(props.isUpdateDisabled);
  }, [props.isUpdateDisabled]);

  //新建用户根据api返回字段的判断身份 是否金庸某些按钮
  const checkRegionDisabled = (item) => {
    // if (创建) {
    //   if (超级管理元) {
    //   } else {
    //   }
    // }else{
    //   if (超级管理元) {
    //   } else {
    //   }
    // }
    if (props.isUpdate) {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return true;
      }
    } else {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return item.value !== region;
      }
    }
  };
  //新建用户根据api返回字段的判断身份 是否金庸某些按钮
  const checkRoleDisabled = (item) => {
    if (props.isUpdate) {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return true;
      }
    } else {
      if (roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return roleObj[item.id] !== "editor";
      }
    }
  };
  return (
    <div>
      <Form
        ref={ref}
        layout="vertical" //垂直布局
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="region"
          label="区域"
          rules={
            isDisabled
              ? []
              : [
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]
          }
        >
          <Select disabled={isDisabled}>
            {props.regionList.map((item) => (
              <Option
                value={item.value}
                key={item.id}
                disabled={checkRegionDisabled(item)}
              >
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Select
            onChange={(value) => {
              // console.log(value)
              if (value === 1) {
                setisDisabled(true);
                ref.current.setFieldsValue({
                  region: "",
                });
              } else {
                setisDisabled(false);
              }
            }}
          >
            {props.roleList.map((item) => (
              <Option
                value={item.id}
                key={item.id}
                disabled={checkRoleDisabled(item)}
              >
                {item.roleName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
});

export default UserForm;
