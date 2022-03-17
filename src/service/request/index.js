import YaRequest from './request'
// 创建一个HtpRequest对象实例
import { BASE_URL, TIME_OUT } from './config'

const request = new YaRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export default request
