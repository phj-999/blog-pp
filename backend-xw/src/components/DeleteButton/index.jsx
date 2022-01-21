import React from "react";
import { Button, Modal } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const DeleteButton = (props) => {
  const { confirm } = Modal;
  const { disabledStatus } = props;

  const confirmMethod = (item) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk(item) {
        //   console.log('OK');
        // deleteMethod(item);

        console.log(1, disabledStatus);
        // 当前页面同步状态 + 后端同步
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });
  };

  return (
    <>
      <Button
        danger
        shape="circle"
        icon={<DeleteOutlined />}
        onClick={() => confirmMethod(disabledStatus)}
        disabled={disabledStatus.default}
      />
    </>
  );
};

export default DeleteButton;
