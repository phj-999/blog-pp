//登陆注册页面切换
//未登录
import React, { useState } from "react"

import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"
import { Divider } from "rc-menu"
import {Container,Header,Background,ShadowCard,Title} from "./style.js";
import { Button, Typography } from "antd";

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    return (
        <Container>
            <Header/> 
            <Background/>
            <Button onClick={()=>{
                throw new Error("点击抛出异常");
            }}>抛出异常</Button>
            <ShadowCard>
            <Title>{isRegister ? "请注册" : "请登录"}</Title>
            {
                error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text>: null
            }
                {
                    isRegister ? <RegisterScreen onError={()=>setError(error)}/> : <LoginScreen  onError={setError}/>
                }
                <Divider />
                <Button type={'link'} onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? '已经有账号了？直接登录' : "没有账号，注册新账号"}
                </Button>
            </ShadowCard>

        </Container>
    )
}