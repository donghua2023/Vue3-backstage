import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { accountLoginRequest, getUserInfoById, getUserRoleById } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/types'
import { mapMenusToRoutes } from '@/utils/map-menu'
import router from '@/router'

interface ILoginState {
  token: string
  userInfo: any
  roleList: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: [],
    roleList: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const { data } = await accountLoginRequest(account)
      const userId = data.id
      this.token = data.token

      // 将获得的token存到本地
      localCache.setCache(LOGIN_TOKEN, data.token)

      // 获取用户信息
      const res = await getUserInfoById(userId)
      this.userInfo = res.data

      // 获取用户的权限
      const resRole = await getUserRoleById(this.userInfo.role.id)
      this.roleList = resRole.data

      // 存储本地
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('roleList', this.roleList)

      // 动态匹配路由
      const routes = mapMenusToRoutes(this.roleList)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      router.push('/main')
    },

    /**
     * @用户进行刷新默认加载数据
     */
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const roleList = localCache.getCache('roleList')
      if (token && userInfo && roleList) {
        this.token = token
        this.userInfo = userInfo
        this.roleList = roleList
        // 初始化路由
        const routes = mapMenusToRoutes(roleList)
        routes.forEach((route) => {
          router.addRoute('main', route)
        })
        // router.push(router.currentRoute.value.path)
        // router.push('/main')
        // console.log(router.currentRoute, 'routerrouter(())')
        // const route = userRoute()
        //空白页的问题解决了，main.ts中，use（store）要在路由的前面，不然匹配动态路由会没有初始化，从而匹配到404
        // 解决router4刷新变成空白页（我们需要手动调用 router.replace() 来改变当前的位置，并覆盖我们原来的位置）
        // router.replace(router.currentRoute.value.fullPath)
      }
    }
  }
})
export default useLoginStore
