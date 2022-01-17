import React from 'react'
import { HashRouter,Route,Switch } from 'react-router-dom'
import login from '../views/login/login';
import NewsSandbox from '../views/sandbox/NewsSandbox';

const IndexRouter = () => {
    return (
        <HashRouter>
            <Switch>
            <Route path='login' component={login} />
            <Route path='/' component={NewsSandbox} />
            </Switch>
        </HashRouter>
    )
}

export default IndexRouter
