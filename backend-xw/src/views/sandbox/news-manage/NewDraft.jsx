import React, { useEffect, useState } from "react";
import { Button, Table, Modal, notification } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getdraftdate, deletedraftdate } from "../../../service/newdraft";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { patchnews } from "../../../service/newsupdate";

const NewDraft = () => {
  const { confirm } = Modal;
  const [dataSource, setdataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem("token"));
  const history = useHistory();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => {
        return <Link to={`/news-manage/preview/${item.id}`}>{title}</Link>;
      },
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "分类",
      dataIndex: "category",
      render: (category) => {
        return category.title;
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
            />

            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => history.push(`/news-manage/update/${item.id}`)}
            />

            <Button
              type="primary"
              shape="circle"
              icon={<UploadOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleCheck(item.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getdraftdate(username).then((res) => {
      const list = res;
      setdataSource(list);
      console.log(username, list, "draft");
    });
  }, [username]);

  //删除
  const deleteMethod = (item) => {
    setdataSource(dataSource.filter((data) => data.id !== item.id));
    // axios.delete(`/news/${item.id}`)
    deletedraftdate(item);
  };
  const confirmMethod = (item) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk() {
        //   console.log('OK');
        deleteMethod(item);
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });
  };

  const handleCheck = (id) => {
    patchnews(`${id}`, {
      auditState: 1,
    }).then((res) => {
      history.push("/audit-manage/list");

      notification.info({
        message: `通知`,
        description: `您可以到${"审核列表"}中查看您的新闻`,
        placement: "bottomRight",
      });
    });
  };

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

export default NewDraft;
