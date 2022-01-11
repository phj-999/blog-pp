/**
 * request拦截器
 * 
 */

import request from 'umi-request';
import {message} from 'antd';


// request interceptor, change url or options.请求拦截器
request.interceptors.request.use((url, options) => {
    return {
      url: `${url}&interceptors=yes`,
      options: { ...options, interceptors: true },
    };
  });

  // handling error in response interceptor  响应拦截器
request.interceptors.response.use(response => {
    if (response.status>400) {const codeMaps = {
      502: '网关错误。',
      503: '服务不可用，服务器暂时过载或维护。',
      504: '网关超时。',
    404:'未找到'
    };}
    message.error(codeMaps[response.status]);
    return response;
  });

  export default request