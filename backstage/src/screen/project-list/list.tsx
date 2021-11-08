import React from 'react'
import { Table } from 'antd';
import dayjs from "dayjs";

import { User } from "./search-panel";
import { TableProps } from 'antd/lib/table';

export interface Project {
    id: string,
    name: string,
    personId: string,
    pin: boolean,
    organization: string,
    created:number
}

interface ListProps extends TableProps<Project>{
   // list: Project[]
    users: User[]
}

//type PropsType = Omit<ListProps,'users'>

export const List = ({ users, ...props }: ListProps) => {
    return (
        <Table
            pagination={false}
            columns={[
            {
                title: '名称',
                dataIndex: 'name',
                sorter:(a,b)=>a.name.localeCompare(b.name)
            },
            {
                title: '部门',
                dataIndex: 'organization',
                sorter:(a,b)=>a.name.localeCompare(b.name)
            },
            {
                title: '负责人',
                render(value, project) {
                    return <span>
                        {users.find(user => user.id === project.personId)?.name || "未知"}
                    </span>
                }
            },
            {
                title:'创建时间',
                render(value,project){
                    return <span>
                        {project.created ? dayjs(project.created).format('YYYY-MM-DD'):'无'}
                    </span>
                }
            }
            ]}
           {...props}  //包含了传来的datasource
        />
    )
}
