import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      name: '空白页面',
      path: '/user',
      component: './User',
    },
    {
      path: '/',
      component: '@/pages/index',
    },
  ],
  fastRefresh: {},
});
