// service统一出口
import { localCache } from '@/utils/cache'
import DHRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import { LOGIN_TOKEN } from '@/types'

const dhRequest = new DHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default dhRequest
