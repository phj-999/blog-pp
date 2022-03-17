import request from '../request/index'

const echartapi = {
  OneData: '/api/echartsapi/onedata'
}

export function requestHorizontalbar() {
  return request.get({
    url: echartapi.OneData
  })
}
