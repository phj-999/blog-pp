import React from 'react'
import { Form, Input} from 'antd';

import { useAuth } from "../context/auth-context"
import {LongButton} from './style';
import { useAsync } from '../utils/use-async';

export const RegisterScreen = ({onError}:{onError:(error:Error)=>void}) => {
    const { register, user } = useAuth()
    const {run, isLoading} = useAsync(undefined,{throwOnError:true})

    const handleSubmit = async({cpassword,...values}: { username: string, password: string ,cpassword:string}) => {
        if (cpassword !== values.password) {
            onError(new Error('请确认密码是否正确'))
            return
        }
        try {
          await run(register(values))
        } catch (error ) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (error: Error)=> onError(error)
        }
        
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
                <Input placeholder={'密码'} type="password" id={"password"} />
            </Form.Item>
            <Form.Item>
            <LongButton
                loading={isLoading}
                htmlType={'submit'}
                type={"primary"}>
                注册
            </LongButton>
            </Form.Item>
        </Form>
    )
}
