import hyRequest from '../../index'

export interface IDataType<T = any> {
  code: number
  data: T
}

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
// url: /users/id
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType<any>>({
    url: url
  })
}
