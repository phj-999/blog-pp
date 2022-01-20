import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const RoleList = () => {
  const [dataSource, setdataSource] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)}
            />
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          </div>
        );
      },
    },
  ];

  const confirmMethod = (item) => {
    const { confirm } = Modal;
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        //   console.log('OK');
        deleteMethod(item);
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });
  };
  //删除
  const deleteMethod = (item) => {
    // console.log(item)
    setdataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:3000/roles/${item.id}`);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/roles").then((res) => {
      // console.log(res.data)
      setdataSource(res.data);
    });
  }, []);

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
    </div>
  );
};

export default RoleList;