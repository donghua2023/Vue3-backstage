import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('../views/main/index.vue')
  },
]


const router = createRouter({
  routes,
  history: createWebHashHistory()
})
// 路由重定向
router.beforeEach((to)=> {
  const token = localCache.getCache('token')
  if(!token && to.path !== '/login') {
    return {path: '/login'}
  }
})

export default router
