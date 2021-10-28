import JMessage from 'jmessage-react-plugin';

export default {
  //初始化
  init() {
    JMessage.init({
      appkey: '72fb2952293a85f86b286547',
      isOpenMessageRoaming: false, // 是否开启消息漫游，默认不开启
      isProduction: false, // 是否为生产模式
      channel: '',
    });
  },

  //注册
  register(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.register({username, password}, resolve, reject);
    });
  },

  //登录
  login(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.login({username, password}, resolve, reject);
    });
  },
};
