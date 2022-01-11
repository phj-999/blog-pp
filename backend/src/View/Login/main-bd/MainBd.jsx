import React from 'react'

import './mainbd.scss';

const MainBd = () => {
    return (
        <div  className="main-bd">
            <div className="login-box-wrap">
                <div className="login-box container">
                    <div className="login-group">左侧
                    <div className="input-group">
                        <input type="text" className=""/>
                    </div>
                    <div className="input-group">
                        <input type="text" className=""/>
                    </div>
                    <div className="input-group">
                        <input type="text" className=""/>
                    </div>
                    </div>
                    <div className="login-aside">右侧</div>
                </div>
            </div>
        </div>
    )
}

export default MainBd
