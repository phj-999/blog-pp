//当前用户登录的sessionStorage
const APP_LOGIN_USER = 'APP_LOGIN_USER'

/**
 *校验当前用户是否已经登录
 * retun {Boolean} 已登录 true 否 false
 * @export AuthLogin
 */
export function AuthLogin() {
    let loginUser = sessionStorage.getItem(APP_LOGIN_USER)
    if (loginUser) {
        return true
    }else{
        return false
    }
}

/**
 *存储当前用户信息到本地存储
 * @export
 * @param {Object} user
 * @return undefined
 */
export function SaveLoginUserInfo(user){
    sessionStorage.setItem(APP_LOGIN_USER,JSON.stringify(user))
}