import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

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
    path: '/index',
    component: () => import('../views/main/index.vue')
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
