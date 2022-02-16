import { ILoginState } from './login/types'
import { ISystemState } from './system/types'
export interface IRootState {
  name: string
  age: number
}
export interface IRootWithMoudle {
  login: ILoginState
  system: ISystemState
}
//使用交叉类型把两个类型结合起来
export type IStoreType = IRootWithMoudle & IRootState
