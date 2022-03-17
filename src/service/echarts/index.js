import request from '../request/index'

const echartapi = {
  TwoData: '/api/echartsapi/twodata'
}

export function requestHorizontalbar() {
  return request.get({
    url: echartapi.TwoData
  })
}
