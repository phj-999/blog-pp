//抽离代理  然后根据环境配置

export default {
    dev: {
            //代码中所有请求的api，凡是带/api的就走代理服务器
            //转发请求到target的目标地址
            //pathRewite会把/api替换成空
            //比如代码中实际请求/api/student 配置后会去掉/api
            //转发请求到到'http://xxx.xxx.com'
            '/api': {
              target: 'http://xxx.xxx.com',
              changeOrigin: true,
              pathRewite: {'^/api':''},
            },
    },

}