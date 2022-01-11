export default [
    //umi 的路由基于 react-router@5 实现，配置和 react-router 基本一致，
    {
      path: '/',
      component: '@/layouts/index',

      routes: [
        { path: '/', component: '@/pages/Index/index' },
        {
          path: '/user',
          routes: [
            {
              path: '/user/one',
              component: '@/pages/user1',
              title: '用户页面一',
            },
            {
              path: '/user/two',
              component: '@/pages/user2',
              title: '用户页面二',
            },
          ],
        },
        {
          path: '/dva',
          component: '@/pages/dva',
        },
      ],
      wrappers: [
        // 配置路由的高阶组件封装。比如，可以用于路由级别的权限校验：
        //渲染此index会先经过@/wrappers/auth里面的内容再渲染这个index页面
        //类似于中间件拦截器
        '@/wrappers/auth',
      ],
      //title :'页面一' 也可写在此处
      // {path:'/404', component:'@/pages/404'}  //上面都找不到渲染此页面
    },

    // match，当前路由和 url match 后的对象，包含 params、path、url 和 isExact 属性
    // location，表示应用当前处于哪个位置，包含 pathname、search、query 等属性
    // history，同 api#history 接口
    // route，当前路由配置，包含 path、exact、component、routes 等
    // routes，全部路由信息
    { path: '/404', component: '@/pages/404' }, //也可放于此处 上面都找不到渲染此页面
  ]