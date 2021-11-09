import React from 'react'
import { Form, Input, Select } from 'antd';
import { Project } from './list';
import { UserSelect } from '../../components/user-select';

export interface User {
    id: number,
    name: string,
    email: string,
    title: string,
    organization: string
    token: string
}

interface SearchPanelProps {
    users: User[],
    param:Partial<Pick<Project,'name'|'personId'>>,
    setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {

    //{/**setParam(Object.assign({},param,{name:e.target.value})) */}

    return (
        <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
            <Form.Item>
                <Input type="text"
                    placeholder="项目名"
                    value={param.name}
                    onChange={
                        e => setParam(
                            { ...param, name: e.target.value }
                        )} />
            </Form.Item>
            <Form.Item>
                <UserSelect
                defaultOptionName={'负责人'} 
                value={param.personId} 
                onChange={
                    (value:number|undefined ) => 
                    setParam({ ...param, personId: value })
                    } />
            </Form.Item>
        </Form>
    )
}

