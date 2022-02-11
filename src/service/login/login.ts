import hyRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // /users/1
  UserMenus = '/role/' // /role/1/menu
}
/**用户登录
 * @param {string} account
 */
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

/**
 * 获取用户信息
 * @param {number} id 用户id
 * */
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}
/**
 * 获取用户菜单
 * @param {number} id 用户id
 * */
export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
