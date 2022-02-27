import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}
export interface IRootWithMoudle {
  login: ILoginState
  system: ISystemState
}
//使用交叉类型把两个类型结合起来
export type IStoreType = IRootWithMoudle & IRootState
