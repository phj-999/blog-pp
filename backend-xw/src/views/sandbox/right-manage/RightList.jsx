import { Table, Skeleton, Empty, Button, Tag, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useState, useCallback, useEffect } from "react";

const { confirm } = Modal;

const RightList = () => {
  const [list, setList] = useState();
  const queryClient = useQueryClient();
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

  const fetchRights = async () => {
    const data = await axios.get(
      "http://localhost:3000/rights?_embed=children"
    );
    return data;
  };

  const { data, isLoading, error } = useQuery(["rights"], fetchRights);
  useEffect(() => {
    setList(data?.data);
  }, [data?.data]);
  //删除
  //axios.delete(`http://localhost:3000/path`)
  const { mutate } = useMutation(
    (t) => {
      const { c, d } = t;
      let address = `http://localhost:3000/${c}/${d}`;
      console.log(address);
      axios.delete(`${address}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("rights");
        let b = queryClient.getQueryData("rights");

        console.log(b, "mutateData");
      },
    }
  );

  // if (isLoading) return <Skeleton active />;
  // if (error) {
  //   return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  // }

  //删除
  const deleteMethod = (item) => {
    // 当前页面同步状态 + 后端同步
    if (item.grade === 1) {
      // setList( list.filter(data => data.id !== item.id))

      let c = "rights";
      mutate({ c, d: item.id });
      setList(list.filter((data) => data.id !== item.id));
      //         axios.delete(`http://localhost:5000/rights/${item.id}`)
    } else {
      let Rlist = list.filter((data) => data.id === item.rightId);
      Rlist[0].children = Rlist[0].children.filter(
        (data) => data.id !== item.id
      );
      setList([...list]);

      console.log(`${item.id}`, "22222");
      let c = "children";

      mutate({ c, d: item.id });
      setList([...list]);
    }
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
