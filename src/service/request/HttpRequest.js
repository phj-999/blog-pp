import axios from 'axios'
import qs from 'qs'
import { ref } from 'vue'
import errorHandle from './errorHandle'
import { BASE_URL, TIME_OUT } from './config'

class HttpRequest {
  constructor() {
    this.defaultConfig = {
      baseURL: BASE_URL,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      timeout: TIME_OUT
    }
    this.interceptors()
  }
  /**
   * 创建 axios 实例
   *
   * @param {Object} options 用户自定义配置
   * @return {Axios} 返回 axios 实例
   * @memberof HttpRequest
   */
  createAxiosInstance(options) {
    const axiosInstance = axios.create()
    // 默认配置和用户自定义配置合并
    const newOptions = this.mergeOptions(this.defaultConfig, options)
    // 调用拦截器
    this.interceptors(axiosInstance)
    // 返回实例
    return axiosInstance(newOptions)
  }
  /**
   * 拦截器
   *
   * @param {Axios} instance
   * @memberof HttpRequest
   */
  interceptors(instance) {
    // 请求拦截器
    instance.interceptors.request.use(
      (config) => {
        const { headers, method, params, data } = config
        // 每次请求都携带 token
        //const token = getToken() || ''
        //token && (headers.Authorization = token)
        // 如果 Content-type 类型不为 'multipart/form-data;' （文件上传类型 ）
        if (!headers['Content-Type'].includes('multipart')) {
          // 如果请求方式为 post 方式，设置 Content-type 类型为 'application/x-www-form-urlencoded; charset=UTF-8'
          method === 'post' &&
            (headers['Content-Type'] =
              'application/x-www-form-urlencoded; charset=UTF-8')
          // 根据 contentType 转换 data 数据
          const contentType = headers['Content-Type']
          // Content-type类型 'application/json;'，服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
          // Content-type类型 'application/x-www-form-urlencoded;'，服务器收到的raw body(原始数据) name=nowThen&age=18
          const paramData = method === 'get' ? params : data
          contentType &&
            (config.data = contentType.includes('json')
              ? JSON.stringify(paramData)
              : qs.stringify(paramData))
        }
        return config
      },
      (error) => {
        // 处理响应错误
        this.defaultConfig.isErrorHandle && errorHandle(error)
        return Promise.reject(error)
      }
    )
    // 响应拦截器
    instance.interceptors.response.use(
      (response) => {
        const { status, data } = response
        // 正常响应
        if (status === 200 || status < 300 || status === 304) {
          // 返回数据
          return Promise.resolve(data)
        }
        return Promise.reject(response)
      },
      (error) => {
        // 处理响应错误
        errorHandle(error)
        return Promise.reject(error)
      }
    )
  }
  request(options) {
    const loading = ref(true)
    const res = ref(null)
    const errMsg = ref(null)
    this.instance(options)
      .then((response) => {
        res.value = response
      })
      .catch((e) => {
        errMsg.value = e.message || '未知错误'
      })
      .finally(() => {
        loading.value = false
      })
    return {
      loading,
      res,
      errMsg
    }
  }
  // 方法
  get(url, params = {}, config = {}) {
    return this.request({
      method: 'get',
      url,
      params,
      ...config
    })
  }
}

export default new HttpRequest()
