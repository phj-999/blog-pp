import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import {Typography} from 'antd';

import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from '../../utils/index';
import { useHttp } from '../../utils/http';
//import { useAsync } from '../../utils/use-async';
import { Project } from "./list";
import { useProjects } from '../../utils/project';
import { useUsers } from '../../utils/user';
import { useUrlQueryParam } from '../../utils/url';

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {

    //const [users, setUsers] = useState([])
    //const [, setParam] = useState({ name: '', personId: "" })
    //const [list, setList] = useState([])
    const [param,setParam] = useUrlQueryParam(['name','personId']) //路径中参数为?name=''&personId=''
    const debouncedParam = useDebounce(param, 200)//用到防抖hook
    //const client = useHttp()
    //const {run,isLoading,error,data:list}=useAsync<Project[]>()
    const {isLoading,error,data:list}=useProjects(debouncedParam)
    const {data:users} = useUsers()
    useDocumentTitle('项目列表',false)

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            {error?<Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
            <List loading={isLoading} dataSource={list || []} users={users || []} />
        </Container>
    )
}

ProjectListScreen.whyDidYouRender = true  //使用whyDidYouRender库检查此页面无限渲染的原因

const Container = styled.div `
   padding:3.2rem
`