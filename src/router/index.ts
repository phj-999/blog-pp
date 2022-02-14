import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    //动态添加children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/notfound/notfound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  //不是登陆页面 拿缓存处token 看是否有值
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
