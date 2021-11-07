/**
 * 异步处理请求
 *  */
import qs from 'qs'
import { useCallback } from 'react';
import * as auth from "../auth-provider";
import { useAuth } from '../context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string,
    data?: object
}

export const http = async (
    endpoint: string,
    { data, token, headers, ...custonConfig
    }: Config = {}) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            'Content-type': data ? "application/json" : ''
        },
        ...custonConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config).then(
        async (response) => {
            //返回401 退出
            if (response.status === 401) {
                await auth.logout();
                window.location.reload();
                return Promise.reject({ message: "请重新登录" });
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {//手动抛出错误
                return Promise.reject(data)
            }
        }
    )
}

//自定义hook  token自动加入header
// export const useHttp= () =>{
//     const {user} = useAuth()
//     return (
//         ...[endpoint,config]:Parameters<typeof http>) => {
//         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//         http(endpoint, {...config, token: user?.token})

//     }
// }
export const useHttp = () => {
    const { user } = useAuth();
    // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
    return useCallback(
        (...[endpoint, config]: Parameters<typeof http>) =>
            http(endpoint, { ...config, token: user?.token }),
        [user?.token]
    );
};
