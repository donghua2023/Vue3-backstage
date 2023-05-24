import { createRouter, createWebHashHistory, useRoute } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menu'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'main'
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/not-found/NotFound.vue')
  }
]


const router = createRouter({
  routes,
  history: createWebHashHistory(location.pathname + location.search),
  strict: true
})
// 路由重定向
router.beforeEach((to) => {
  console.log(to.path, 'to,path')
  const token = localCache.getCache('token')
  if (!token && to.path !== '/login') {
    return { path: '/login' }
  }
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
