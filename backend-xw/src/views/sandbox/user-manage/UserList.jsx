import React, { useState, useEffect } from "react";
import { Button, Table, Switch } from "antd";
import axios from "axios";
import {
  EditOutlined,
} from "@ant-design/icons";
import DeleteButton from "../../../components/DeleteButton";

const UserList = (props) => {
  const [dataSource, setdataSource] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users?_expand=role").then((res) => {
      const list = res.data;
      setdataSource(list);
    });
  }, []);

  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      render: (region) => {
        return <b>{region === "" ? "全球" : region}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => {
        return role?.roleName;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default}></Switch>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <DeleteButton
              disabledStatus={item}
            />

            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.default}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        rowKey={(item) => item.id}
      />
    </div>
  );
};

export default UserList;
