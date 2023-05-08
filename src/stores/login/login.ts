import {defineStore} from 'pinia'
import type { IAccount } from '@/types'
import {accountLoginRequest} from '@/service/login/login'
import {localCache} from '@/utils/cache'
import {LOGIN_TOKEN} from '@/types'

export const useLoginStore = defineStore('login', {
  state: ()=> ({
    name: '',
    id: '',
    token: localCache.getCache(LOGIN_TOKEN)
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const {data} = await accountLoginRequest(account)
      this.name = data.name
      this.id = data.id
      this.token = data.token
      // 将获得的token存到本地
      localCache.setCache(LOGIN_TOKEN, data.token)
    }
  }
})
