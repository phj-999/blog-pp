import React from 'react'
import { HashRouter as Router,Route } from 'react-router-dom'
import Login from '../views/login/login';
import NewsSandbox from '../views/sandbox/NewsSandbox';

const IndexRouter = () => {
    return (
        <Router>
            <Route path='login' component={Login} />
            <Route path='/' component={NewsSandbox} />
        </Router>
    )
}

export default IndexRouter
