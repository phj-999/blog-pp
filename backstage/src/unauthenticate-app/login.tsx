import React from 'react'
import { Form, Input } from 'antd';

import { useAuth } from "../context/auth-context"
import { LongButton } from './style';
import { useAsync } from '../utils/use-async';

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { login, user } = useAuth()
    const { run, isLoading } = useAsync(undefined,{throwOnError:true})

    const handleSubmit = async (values: { username: string, password: string }) => {

        await run(login(values))
            .catch(e => onError(e))
    }
    return (
        <Form onFinish={handleSubmit}>
            {
                user ? <div>
                    登陆成功，用户名：{user?.name}
                    token:{user.token}
                </div> : null
            }
            <Form.Item name={'username'} rules={[{ required: true, message: "请输入用户名" }]}>
                <Input placeholder={'用户名'} type="text" id={"username"} />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: "请输入密码" }]}>
                <input placeholder={'密码'} type="password" id={"password"} />
            </Form.Item>
            <LongButton
                loading={isLoading}
                htmlType={'submit'}
                type={"primary"}>登录</LongButton>
        </Form>
    )
}
