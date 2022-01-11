import React from 'react'
import { Link } from 'react-router-dom'

import MainBd from './main-bd/MainBd';
import MainFt from './main-ft/MainFt';

import "./login.scss";

const Login = () => {
    return (
        <div className="login">
            <div className="top">
                <div className='container'>
                <div className="login-wrapper">
                    <Link className="logo" to='/'>
xxxx
                    </Link>
                </div>
                </div>
                
            </div>
           <MainBd/>
           <MainFt/>
        </div>
    )
}

export default Login