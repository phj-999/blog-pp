import { defineConfig } from 'umi';
import routes from './routes';

import defaultSettings from './defaultSettings'
import proxy from './proxy';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // hash:true,//默认是false 加上后umi build打包后的dist文件里样式文件会有hash后缀
  //再次修改样式后文件名不一样了 浏览器就不会走这个缓存
  // base:'/a',//指定 react-router 的 base，部署到非根目录时需要配置。
  // publicPath:'/', //配置 webpack 的 publicPath，指向静态资源文件所在的路径。打包时候webpack会在静态文件路径前面加上publicPath的值
  //比如静态资源在cdn上，可以publicPath:'/http://xxx.com/cdn/' 这样的话打包后代码里的静态资源都会加上这个前缀，
  //还适用于静态资源不在根目录，我们把它变成根目录
  // outputPath:'a', //打包后默认是dist文件夹  这样配置会outputpath到a文件夹
  // history:{ //配置是hash路由还是history路由
  //   type:'hash'
  // },
  title: defaultSettings.title, //配置标题 也可写在每个路由后面 { path: '/umiv3', component: '@/pages/index' title='umiv3' },
  targets: {
    //配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换。
    //比如要兼容 ie11，需配置：
    ie: 11,
  },
  proxy: proxy['dev'],
    //代码中所有请求的api，凡是带/api的就走代理服务器
    //转发请求到target的目标地址
    //pathRewite会把/api替换成空
    //比如代码中实际请求/api/student 配置后会去掉/api
    //转发请求到到'http://xxx.xxx.com'
    

  theme:{ 
      '@primary-color':defaultSettings.primaryColor
   },//配置antd主题颜色，实际上是配 less 变量。
  
  routes: routes,

  fastRefresh: {},
  dva: {
    hmr: true, //表示是否启用 dva model 的热更新。
    immer: true, //表示是否启用 immer 以方便修改 reducer
  },
});
//umi里面没必要使用axios  有内置的请求方法
