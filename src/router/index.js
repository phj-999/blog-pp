import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/',
    redirect: '/homepage'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
