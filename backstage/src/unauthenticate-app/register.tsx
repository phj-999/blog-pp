import React from 'react'
import { Form, Input} from 'antd';

import { useAuth } from "../context/auth-context"
import {LongButton} from './style';

export const RegisterScreen = () => {
    const { register, user } = useAuth()

    const handleSubmit = (values: { username: string, password: string }) => {
        register(values)
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
                htmlType={'submit'}
                type={"primary"}>
                注册
            </LongButton>
        </Form>
    )
}
