//登陆注册页面切换
//未登录
import React, { useState } from "react"
//import {Helmet} from 'react-helmet';

import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"
import { Divider } from "rc-menu"
import { Container, Header, Background, ShadowCard, Title } from "./style.js";
import { Button, Typography } from "antd";
import { useDocumentTitle } from "../utils";
import { ErrorBox } from "../components/lib";


export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    useDocumentTitle('请登陆注册以继续')

    return (
        <Container>
            <Header />
            <Background />
            <ShadowCard>
                <Title>{isRegister ? "请注册" : "请登录"}</Title>
                <ErrorBox error={error} />
                {
                    isRegister ? <RegisterScreen onError={() => setError(error)} /> : <LoginScreen onError={setError} />
                }
                <Divider />
                <Button type={'link'} onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? '已经有账号了？直接登录' : "没有账号，注册新账号"}
                </Button>
            </ShadowCard>

        </Container>
    )
}