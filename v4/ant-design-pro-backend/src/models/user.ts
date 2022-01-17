import type { Effect, Reducer } from 'umi';
import { queryCurrent  } from '@/services/user.js';

export type CurrentUser = {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  id?: string;
  unreadCount?: number;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    //发起请求
 
    // 获取当前登录用户数据
    *fetchCurrent(_, { call, put }) {
      // 看localstorage是否有用户信息, 没有再请求
      let userInfo = JSON.parse(localStorage.getItem('userInfo')||'0');

      if (!userInfo) {
        userInfo = yield call(queryCurrent);

        // 判断是否获取到用户信息
        if (userInfo.id !== undefined) {
          // 把用户信息存入localstorage
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
      }

      yield put({
        type: 'saveCurrentUser',
        payload: userInfo,
      });
    },
  },

  reducers: {
    //修改
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

export default UserModel;
