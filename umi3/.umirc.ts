import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true, //配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存
  outputPath: 'build', //输出路径
  title: 'UMiJS3',//title
  history: {
    //history 类型和配置项
    //type:'hash'
    type: 'browser',
  },
  // proxy: {
  //   //配置代理能力
  //   '/api': {
  //     target: '',
  //   },
  // },
  theme: {
    //antd配置主题，实际上是配 less 变量
  },
  routes: [{ path: '/', component: '@/pages/index',title:'首页'}],
  fastRefresh: {},
});
