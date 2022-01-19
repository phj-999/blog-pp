import { Table, Skeleton, Empty, Button, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useQuery } from "react-query";

const RightList = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key) => {
        return <Tag color="orange">{key}</Tag>;
      },
    },
    {
      title: "操作",
      render: () => {
        return (
          <div>
            <Button danger shape="circle" icon={<DeleteOutlined />} />
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          </div>
        );
      },
    },
  ];
  const fetchRights = async () =>
    await axios.get("http://localhost:3000/rights");
  const { data, isLoading, error } = useQuery("rights", fetchRights, {
    retry: 6,
  });
  if (isLoading) return <Skeleton active />;
  if (error) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  const list = data.data;

  return (
    <div>
      <Table
        dataSource={list}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
};

export default RightList;
