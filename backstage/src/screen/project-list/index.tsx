import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';

import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from '../../utils/index';
import { useHttp } from '../../utils/http';

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {

    const [users, setUsers] = useState([])
    const [param, setParam] = useState({ name: '', personId: "" })
    const [list, setList] = useState([])
    const debouncedParam = useDebounce(param, 200)//用到防抖hook
    const client = useHttp()

    useEffect(() => {
        client('project', { data: cleanObject(debouncedParam) }).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List list={list} users={users} />
        </Container>
    )
}

const Container = styled.div `
   padding:3.2rem
`