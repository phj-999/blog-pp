import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Tree } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const RoleList = () => {
  const [dataSource, setdataSource] = useState([]);
  //树形控件里面的数据
  const [rightList, setRightList] = useState([]);
  //handleCancel关闭模态框
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRights, setcurrentRights] = useState([]); //点击的是哪一个（用于小框框选中和取消）
  const [currentId, setcurrentId] = useState([0]); //点击小框框 currentId就是item.id

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
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setIsModalVisible(true);
                setcurrentRights(item.rights);
                setcurrentId(item.id);
              }}
            />
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
      setdataSource(res.data);
    });
  }, []);

  //树形控件里面的
  useEffect(() => {
    axios.get("http://localhost:3000/rights?_embed=children").then((res) => {
      setRightList(res.data);
    });
  }, []);

  //Modal里面的方法
  /**
   * 点ok的时候的回调
   */
  const handleOk = () => {
    //点击ok 隐藏模态框-->同步datasource-->同步后端
    setIsModalVisible(false);
    setdataSource(
      dataSource.map((item) => {
        if (item.id === currentId) {
          return {
            ...item,
            rights: currentRights,
          };
        }
        return item;
      })
    );
    axios.patch(`http://localhost:3000/roles/${currentId}`, {
      rights: currentRights,
    });
  };
  //handleCancel关闭模态框
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  /**
   * 选中和取消树形列表里面的框框
   */
  const onCheck = (checkKeys) => {
    setcurrentRights(checkKeys);
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      />
      <Modal
        title="权限分配"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkedKeys={currentRights}
          onCheck={onCheck}
          checkStrictly={true} //默认false 设为true 三级部分选不选中 二级部分都不相关
          treeData={rightList}
        />
      </Modal>
    </div>
  );
};

export default RoleList;
