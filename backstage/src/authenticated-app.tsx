//已登陆
import styled from '@emotion/styled'
import React from 'react'
import { Row } from './components/lib'
import { useAuth } from './context/auth-context'
import { ProjectListScreen } from './screen/project-list'
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg';
import { Button, Dropdown, Menu } from 'antd'
import { Navigate, Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import { ProjectScreen } from './screen/Project'
import { resetRoute } from './utils'

export const AuthenticatedApp = () => {

    return (
        <Container>
            <PageHeader />
            <Main>
                <Router>
                    <Routes>
                        <Route path='/projects' element={<ProjectListScreen />} />
                        <Route path='/projects/:projectId/*' element={<ProjectScreen />} />
                        <Navigate to='/projects'/>
                    </Routes>
                </Router>
                <CreateProject/>
            </Main>
        </Container>
    )
}

const PageHeader = () => {

    const { logout, user } = useAuth()

    return <Header between={true}>
        <HeaderLeft gap={true}>
           <Button type='link' onClick={resetRoute}>
           <SoftwareLogo width={'18rem'} color={"rgb(38, 132, 255)"} />
           </Button>
            <h2>项目</h2>
            <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
            <Dropdown overlay={
                <Menu>
                    <Menu.Item key={'logout'}>
                        <Button type={'link'} onClick={logout}>登出</Button>
                    </Menu.Item>
                </Menu>
            }>
                <Button type={'link'} onClick={e => e.preventDefault()}>
                    hi,{user?.name}
                </Button>
            </Dropdown>
            <Button type={'link'} onClick={logout}>登出</Button>
        </HeaderRight>
    </Header>
}

// grid-area别名
const Container = styled.div`
    display:grid;
    grid-template-rows:6rem 1fr 6rem; //上高6rem footer高6rem 1fr表示自己看着办 100vh-12rem 
    grid-template-columns:20rem 1fr 20rem;//最左边一列和最右边一列宽20rem  1fr表示中间的自动为总宽度-40rem
    /* grid-template-areas:   //表示怎么排列的（要提前定义各个的别名area）
    'header header header'
    'nav main aside'
    'footer footer footer'; */
    height: 100vh;
    //grid-gap:10rem; //每一块中间的距离是10rem
`
const Header = styled(Row)`
padding:3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
   /* grid-area: header;
   display:flex;
   flex-direction:row;
   align-items:center; */
   //justify-content:space-between;
   `

const HeaderLeft = styled(Row)`
 display:flex;
 align-items:center
`
const HeaderRight = styled.div`
`
/* const HeaderItem = styled.h3 `
  margin-right:3rem;
` */

const Main = styled.main`
   grid-area:main;
   //height:calc(100vh - 6rem);
   
`

/*
const Nav = styled.nav`grid-area:nav;`
const Aside = styled.aside`grid-area:aside;`
const Footer = styled.footer`grid-area:footer;`
 */