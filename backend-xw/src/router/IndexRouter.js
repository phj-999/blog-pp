import React from 'react'
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom'
import Login from '../views/login/Login';
import NewsSandbox from '../views/sandbox/NewsSandbox';

const IndexRouter = () => {
    return (
        <HashRouter>
            <Switch>
            <Route path='/login' component={Login} />
            <Route path="/" render={()=>
                    localStorage.getItem("token")?
                    <NewsSandbox />:
                    <Redirect to="/login"/>
                }/>
            </Switch>
        </HashRouter>
    )
}

export default IndexRouter
