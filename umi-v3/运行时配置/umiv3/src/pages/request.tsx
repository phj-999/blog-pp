/**umi中使用网络请求 */
import React, { useEffect } from 'react'
import request from 'umi-request'

const xxxPage = () => {
    
    useEffect(() => {
        
        
    }, [])

const getData = async() => {
    //请求数据
    // request('/api/person').then(res=>{
    //     console.log(res)
    // })
    const data = await request('/api/person')
    console.log(data);
    
}

    return (
        <div>
            <button type="button" onClick={getData}>获取数据</button>
        </div>
    )
}

export default xxxPage
