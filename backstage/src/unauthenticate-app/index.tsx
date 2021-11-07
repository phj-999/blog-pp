//登陆注册页面切换
//未登录
import React, { useState } from "react"

import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"
import { Divider } from "rc-menu"
import {Container,Header,Background,ShadowCard,Title} from "./style.js";
import { Button } from "antd";

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)

    return (
        <Container>
            <Header/> 
            <Background/>
            <ShadowCard>
            <Title>{isRegister ? "请注册" : "请登录"}</Title>
                {
                    isRegister ? <RegisterScreen /> : <LoginScreen />
                }
                <Divider />
                <Button type={'link'} onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? '已经有账号了？直接登录' : "没有账号，注册新账号"}
                </Button>
            </ShadowCard>

        </Container>
    )
}