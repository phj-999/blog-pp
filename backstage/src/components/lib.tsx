import React from "react";
import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBottom?: number
}>`
 display:flex;
 align-items:center;
 justify-content:${props => props.between ? 'space-between' : undefined};
>*{
    margin-top:0 !important;
    margin-bottom:0 !important;
    margin-right:${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
    margin-bottom:${props => props.marginBottom + 'rem'}
}
`

/**
 * 封装一个布满整个页面的loading
 *  */
export const FullPageLoading = () => <FullPage> <Spin size={'large'}></Spin> </FullPage>

const FullPage = styled.div`
height: 100vh;
display:flex;
justify-content:center;
align-items:center;
`
/**
 * 封装一个布满整个页面的错误消息提示
 *  */
export const FullPageErrorFallback = ({ error }: { error: Error|null }) => 
<FullPage>
    <DevTools />
    <Typography.Text type={'danger'}>
        {error?.message}
    </Typography.Text>
</FullPage>
