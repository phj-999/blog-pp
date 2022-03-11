import React from 'react'
import { Dropdown, Menu, Table } from 'antd';
import dayjs from "dayjs";

import { User } from "./search-panel";
import { TableProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { Pin } from '../../components/pin';
import { useEditProject } from '../../utils/project';
import { ButtonNoPadding } from '../../components/lib';
import { useProjectModal } from './util';

export interface Project {
    id: number,
    name: string,
    personId: number,
    pin: boolean,
    organization: string,
    created:number
}

interface ListProps extends TableProps<Project>{
   // list: Project[]
    users: User[],
    //refresh?: ()=>void;
    //setProjectModalOpen: (isOpen: boolean)=>void
}

//type PropsType = Omit<ListProps,'users'>

export const List = ({ users, ...props }: ListProps) => {
    const {mutate} = useEditProject()
    const pinProject = (id:number) => (pin:boolean) => mutate({id,pin})
    //创建和编辑的时候发生：
    const {startEdit} = useProjectModal()  
    const editProject=(id:number)=>()=>startEdit(id)
    
    return (
        <Table
            rowKey='id'
            pagination={false}
            columns={[
            {
                title: <Pin checked={true} disabled={true} />,
                render(value,project){
                    return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}
                    />
                } 
            },
            {
                title: '名称',
                sorter:(a,b)=>a.name.localeCompare(b.name),
                render(value,project){
                   return <Link to={String(project.id)}>{project.name}</Link>
               }
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
            },
            {
                render(value, project) {
                    return <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key={'edit'}>
                                  <Menu.Item onClick={editProject(project.id)} key={'edit'}>编辑</Menu.Item>
                                  <Menu.Item key={'delete'}>删除</Menu.Item>
                                </Menu.Item>
                            </Menu>
                        }>
                        <ButtonNoPadding type='link'></ButtonNoPadding>
                    </Dropdown>
                }
            }
            ]}
           {...props}  //包含了传来的datasource
        />
    )
}