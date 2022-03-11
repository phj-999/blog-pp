import React, { 
    //useState, 
    //useEffect 
} from 'react'
import styled from '@emotion/styled';
import {Button, Typography} from 'antd';

import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { 
    //cleanObject, 
    useDebounce, 
    useDocumentTitle, 
    //useMount 
} from '../../utils/index';
//import { useHttp } from '../../utils/http';
//import { useAsync } from '../../utils/use-async';
//import { Project } from "./list";
import { useProjects } from '../../utils/project';
import { useUsers } from '../../utils/user';
//import { useUrlQueryParam } from '../../utils/url';
import { useProjectModal, useProjectsSearchParams } from './util';
import { ButtonNoPadding, ErrorBox, Row } from '../../components/lib';

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {

    //const [users, setUsers] = useState([])
    //const [, setParam] = useState({ name: '', personId: "" })
    //const [list, setList] = useState([])
    // const [param,setParam] = useUrlQueryParam(['name','personId']) //路径中参数为?name=''&personId=''
    // const projectsParam = {...param,personId:Number(param.personId) || undefined}
    const [param,setParam] = useProjectsSearchParams() 
    //const debouncedParam = useDebounce(projectsParam, 200)//用到防抖hook
    //const client = useHttp()
    //const {run,isLoading,error,data:list}=useAsync<Project[]>()
    const {isLoading,error,data:list}=useProjects(useDebounce(param,200))
    const {data:users} = useUsers()
    useDocumentTitle('项目列表',false)
    const{projectModalOpen,open}=useProjectModal()

    return (
        <Container>
            <Row marginBottom={2} between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding
                    type={"link"}
                    onClick={open}
                >创建项目</ButtonNoPadding>
            </Row>

            <SearchPanel users={users || []} param={param} setParam={setParam} />
            <ErrorBox error={error}/>
            <List loading={isLoading} dataSource={list || []} users={users || []} />
        </Container>
    )
}

ProjectListScreen.whyDidYouRender = false  //使用whyDidYouRender库检查此页面无限渲染的原因

const Container = styled.div `
   padding:3.2rem
`