import axios from 'axios'
import errorHandle from './errorHandle'
import { ElLoading } from 'element-plus'

class YaRequest {
  constructor(config) {
    // 实例
    this.instance = axios.create(config)
    // 是否显示加载，默认不显示
    this.showLoading = config.showLoading || false
    // 单独的请求或发回拦截器
    this.interceptors = config.interceptors
    // 全局请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          // 如果showLoding为true的话执行
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        this.loading && this.loading.close() && errorHandle(err)
        return err
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading && this.loading.close()
        // 对返回结果进行过滤再呈现,也可以直接呈现
        // const data = res.data
        // if (data.returnCode === '-1001') {
        //     console.log('请求失败~, 错误信息')
        // } else {
        //     return data
        // }
        return res
      },
      (err) => {
        // 将loading移除
        this.loading && this.loading.close()
        errorHandle(err)
        return err
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors && config.interceptors.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading && config.showLoading === true) {
        this.showLoading = true
      }
      // 3。开始请求
      this.instance
        .request(config)
        .then((result) => {
          // 4.单个请求对返回结果的处理
          if (config.interceptors && config.interceptors.responseInterceptor) {
            result = config.interceptors.responseInterceptor(result)
          }
          this.showLoading = false
          resolve(result)
        })
        .catch((err) => {
          this.showLoading = false
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default YaRequest
