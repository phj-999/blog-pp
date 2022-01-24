import originAxios from "axios";

// const errorMsg = (message) => {
//     Message.closeAll();
//     return Message({
//         message: message,
//         type: "error",
//         duration: 3000,
//     });
// };

export default function request(option) {
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  const contentType = "application/json;charset=UTF-8";

  return new Promise((resolve, reject) => {
    //1. 创建新的axios实例
    const service = originAxios.create({
      // baseURL: location.origin + '/okr', // 公共接口-生产
      baseURL: "http://localhost:3000/", // 公共接口-本地
      timeout: 30 * 1000, // 超时时间单位是ms
      headers: {
        "Content-Type": contentType,
      },
    });
    //2.请求拦截器 配置请求和响应拦截
    service.interceptors.request.use(
      (config) => {
        // console.log('来到了request拦截success中');
        // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

        // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

        // 3.对请求的参数进行序列化(看服务器是否需要序列化)
        // config.data = qs.stringify(config.data)
        // console.log(config);

        return config;
      },
      (error) => {
        return error;
      }
    );

    service.interceptors.response.use(
      (response) => {
        // console.log('来到了response拦截success中');
        return response.data;
      },
      (err) => {
        console.log("来到了response拦截failure中");
        console.log(err);
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = "未授权的访问";
              break;
            default:
              err.message = "其他错误信息";
          }
        }
        return err;
      }
    );

    // finaly 传入对象进行网络请求
    service(option)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//  service.interceptors.request.use(config => {
//      //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
//      config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
//      //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
//      const token = getCookie('Admin-Token'); //这里取token之前，需要先拿到token,存一下
//      if (token) {
//          // config.params = { 'token': token } //如果要求携带在参数中
//          // config.headers.Authorization = '5fb94a47-0904-4368-819f-0d0c7f534a6a'; //如果要求携带在请求头中
//          config.headers.Authorization = token; //如果要求携带在请求头中
//      }
//      config.headers.username = getUsername(); //如果要求携带在请求头中
//      return config;
//  }, error => {
//      return Promise.reject(error);
//  })

//3.响应拦截器
//  service.interceptors.response.use(response => {
//      const {
//          data,
//          config
//      } = response;
//      if (config.url.indexOf('auth/sso/login') == -1) {
//          if (data.code !== 200) {

//              // 判断如果是文件流-开始
//              // console.log(response, typeof response.data);
//              // if (response.data.type) {
//              //     return response.data;
//              // }
//              // if (typeof response.data === "string") {
//              //     return response.data;
//              // }
//              // 判断如果是文件流-结束

//              switch (data.code) {
//                  case 1118: //登录失效code
//                      if (window.location.origin == "https://okr.sk.com") {
//                          MessageBox.confirm(
//                              '登录状态已过期，是否重新登录？',
//                              '系统提示', {
//                                  confirmButtonText: '确定',
//                                  cancelButtonText: '取消',
//                                  closeOnClickModal: false,
//                                  type: 'warning'
//                              }
//                          ).then(() => {
//                              ssoLogOut(getToken())
//                                  .then((res) => {
//                                      if (res.code === 200) {
//                                          store.commit("SET_TOKEN", "");
//                                          store.commit("SET_ROLES", []);
//                                          store.commit("SET_PERMISSIONS", []);
//                                          removeToken();
//                                          sessionStorage.clear();
//                                          localStorage.clear();
//                                          location.href = projectUrl;

//                                      } else {
//                                          Message.error(res);
//                                      }
//                                  })
//                                  .catch((err) => {
//                                      Message.error(err);
//                                      store.commit("SET_TOKEN", "");
//                                      store.commit("SET_ROLES", []);
//                                      store.commit("SET_PERMISSIONS", []);
//                                      removeToken();
//                                      sessionStorage.clear();
//                                      localStorage.clear();
//                                      location.href = projectUrl;
//                                  });

//                          })
//                      } else {
//                          MessageBox.confirm(
//                              '登录状态已过期，是否重新登录？',
//                              '系统提示', {
//                                  confirmButtonText: '确定',
//                                  cancelButtonText: '取消',
//                                  closeOnClickModal: false,
//                                  type: 'warning'
//                              }
//                          ).then(() => {
//                              store.dispatch('LogOut').then(() => {
//                                  location.reload() // 为了重新实例化vue-router对象 避免bug
//                                  router.push("/login");
//                                  sessionStorage.clear();
//                                  localStorage.clear();
//                              })
//                          })
//                      }

//                      break;
//                  case '401': //无权限code
//                      router.push({
//                          path: "/401",
//                      });
//                      break;
//                  case 13:
//                      break
//                  case 14:
//                      break
//                  default:
//                      if (data.data == 1118) {
//                          if (window.location.origin == "https://okr.sk.com") {
//                              MessageBox.confirm(
//                                  '登录状态已过期，是否重新登录？',
//                                  '系统提示', {
//                                      confirmButtonText: '确定',
//                                      cancelButtonText: '取消',
//                                      closeOnClickModal: false,
//                                      type: 'warning'
//                                  }
//                              ).then(() => {
//                                  ssoLogOut(getToken())
//                                      .then((res) => {
//                                          if (res.code === 200) {
//                                              store.commit("SET_TOKEN", "");
//                                              store.commit("SET_ROLES", []);
//                                              store.commit("SET_PERMISSIONS", []);
//                                              removeToken();
//                                              sessionStorage.clear();
//                                              localStorage.clear();
//                                              location.href = projectUrl;

//                                          } else {
//                                              Message.error(res);
//                                          }
//                                      })
//                                      .catch((err) => {
//                                          Message.error(err);
//                                          store.commit("SET_TOKEN", "");
//                                          store.commit("SET_ROLES", []);
//                                          store.commit("SET_PERMISSIONS", []);
//                                          removeToken();
//                                          sessionStorage.clear();
//                                          localStorage.clear();
//                                          location.href = projectUrl;
//                                      });

//                              })
//                          } else {
//                              MessageBox.confirm(
//                                  '登录状态已过期，是否重新登录？',
//                                  '系统提示', {
//                                      confirmButtonText: '确定',
//                                      cancelButtonText: '取消',
//                                      closeOnClickModal: false,
//                                      type: 'warning'
//                                  }
//                              ).then(() => {
//                                  store.dispatch('LogOut').then(() => {
//                                      location.reload() // 为了重新实例化vue-router对象 避免bug
//                                      router.push("/login");
//                                      sessionStorage.clear();
//                                      localStorage.clear();
//                                  })
//                              })
//                          }

//                      } else {
//                          errorMsg(data.msg || `后端接口${data.code}异常`);
//                      }

//                      break;
//              }

//              return Promise.reject(
//                  "okr请求异常拦截:" +
//                  JSON.stringify({
//                      url: config.url,
//                      code: data.code,
//                      data: data.data,
//                      msg: data.msg,
//                  }) || "Error"
//              );
//          } else {
//              return data;
//          }
//      } else {
//          return data;
//      }
//  }, error => {
//      console.log(error)
//      if (error && error.response) {
//          // 1.公共错误处理
//          // 2.根据响应码具体处理
//          switch (error.response.status) {
//              case 400:
//                  error.message = '错误请求'
//                  break;
//              case 401:
//                  error.message = '未授权，请重新登录'
//                  break;
//              case 403:
//                  error.message = '拒绝访问'
//                  break;
//              case 404:
//                  error.message = '请求错误,未找到该资源'
//                  break;
//              case 405:
//                  error.message = '请求方法未允许'
//                  break;
//              case 408:
//                  error.message = '请求超时'
//                  break;
//              case 500:
//                  error.message = '服务器端出错'
//                  break;
//              case 501:
//                  error.message = '网络未实现'
//                  break;
//              case 502:
//                  error.message = '网络错误'
//                  break;
//              case 503:
//                  error.message = '服务不可用'
//                  break;
//              case 504:
//                  error.message = '网络超时'
//                  break;
//              case 505:
//                  error.message = 'http版本不支持该请求'
//                  break;
//              default:
//                  error.message = `连接错误${error.response.status}`
//                  break;
//          }
//      } else {
//          // 超时处理
//          if (JSON.stringify(error).includes('timeout')) {
//              Message.error('服务器响应超时，请刷新当前页')
//          }
//          Message.error('连接服务器失败')
//      }

//      Message.error(error.message);
//      return Promise.reject(error);
//  })

//4.导出文件
// export default service
