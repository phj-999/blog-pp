import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      name: '注册页',
      path: '/userregister',
      component: './UserRegister',
    },
    {
      path: '/',
      component: '@/layouts/LayoutSide/index',
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
    },
  ],
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: false,
  },
});
