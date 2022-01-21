import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Switch, Modal } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import UserForm from "../../../components/user-manage/UserForm";

const UserList = React.memo((props) => {
  const [dataSource, setdataSource] = useState([]);
  const [isAddVisible, setisAddVisible] = useState(false); //是否显示
  const [roleList, setroleList] = useState([]);
  const [regionList, setregionList] = useState([]);
  const addForm = useRef(null);
  const { confirm } = Modal;

  useEffect(() => {
    axios.get("http://localhost:3000/users?_expand=role").then((res) => {
      const list = res.data;
      setdataSource(list);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3000/regions").then((res) => {
      const list = res.data;
      setregionList(list);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/roles").then((res) => {
      const list = res.data;
      setroleList(list);
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
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)}
              disabled={item.default}
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
  /**
   * 添加用户
   *
   */
  const addFormOK = () => {
    try {
      addForm.current.validateFields().then((value) => {
        setisAddVisible(false);

        addForm.current.resetFields(); //相当于刷新 antd里面的
        //post到后端，生成id，再设置 datasource, 方便后面的删除和更新
        axios
          .post(`http://localhost:3000/users`, {
            ...value,
            roleState: true,
            default: false,
          })
          .then((res) => {
            setdataSource([
              ...dataSource,
              {
                ...res.data,
                role: roleList.filter((item) => item.id === value.roleId)[0],
              },
            ]);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  //删除
  const deleteMethod = (item) => {
    // console.log(item)
    // 当前页面同步状态 + 后端同步

    setdataSource(dataSource.filter((data) => data.id !== item.id));

    axios.delete(`http://localhost:3000/users/${item.id}`);
  };

  const confirmMethod = (item) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item);
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setisAddVisible(true);
        }}
      >
        添加用户
      </Button>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        rowKey={(item) => item.id}
      />

      <Modal
        visible={isAddVisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setisAddVisible(false);
        }}
        onOk={() => {
          addFormOK();
        }}
      >
        <UserForm ref={addForm} regionList={regionList} roleList={roleList} />
      </Modal>
    </div>
  );
}
)
export default UserList;
