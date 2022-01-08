export default [
  {
    path: '/user',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/LoginLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes:[
      {
        path:'/',
        component:'../layouts/BasicLayout.jsx',
        routes:[
          {
            path:'/'
          },
          {
            component:"./404"
          }
        ]
      }
    ]
  },
  {
    component: './404',
  },
];
