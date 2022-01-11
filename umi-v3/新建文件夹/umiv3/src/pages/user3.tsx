import { history } from 'umi';

let extraRoutes;

//动态添加路由
export function patchRoutes ({routes}) {
   routes.unshift({
       path:'/foo',
       component: require('@/pages/user3').default
   })

   extraRoutes.map(item=>{//便利下面extraRoutes的路由
       routes.unshift({
           path:item.path, 
           component: require('@/pages/${item.component}').default
       })
   })
}


export function render(oldRender) {
    //模拟从服务端来的数据
    //  fetch('/api/routes').then(res=>res.json()).then((res) => { 
    //   extraRoutes = res.routes;
    //   oldRender();
    // })
    extraRoutes = [
        {// /server路径加载user2
            path:'/server',component:'/user2'
        }
    ]
    
    //渲染之前做一些权限的校验  比如登陆了就访问  欸有就跳转
    const isLogin = false;
    if (isLogin) {
        history.push('/login')
    }
    
    oldRender();
  }

//   onRouteChange({ routes, matchedRoutes, location, action })
// 在初始加载和路由切换时做一些事情。
export default function onRouteChange({ routes, matchedRoutes, location, action }) {
    //埋点统计
    console.log(location.pathname,'被访问了');
    //设置标题
    if (matchedRoutes.length) {
        document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
    }
}
