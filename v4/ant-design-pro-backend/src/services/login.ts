import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;

};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}


/**
 * 退出登录
 *
 * @returns {Promise<void>}
 */
 export async function logout(): Promise<void> {
  return request.post('/auth/logout')
}

