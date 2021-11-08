import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import {Typography} from 'antd';

import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from '../../utils/index';
import { useHttp } from '../../utils/http';
//import { useAsync } from '../../utils/use-async';
import { Project } from "./list";
import { useProjects } from '../../utils/project';
import { useUsers } from '../../utils/user';

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {

    //const [users, setUsers] = useState([])
    const [param, setParam] = useState({ name: '', personId: "" })
    //const [list, setList] = useState([])
    const debouncedParam = useDebounce(param, 200)//用到防抖hook
    //const client = useHttp()
    //const {run,isLoading,error,data:list}=useAsync<Project[]>()
    const {isLoading,error,data:list}=useProjects(debouncedParam)
    const {data:users} = useUsers()

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            {error?<Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
            <List loading={isLoading} dataSource={list || []} users={users || []} />
        </Container>
    )
}

const Container = styled.div `
   padding:3.2rem
`