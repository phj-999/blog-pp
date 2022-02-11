/**
 * 获取用户信息
 * @param {number} id 用户id
 * */
 export function requestUserInfoById(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}
