// service统一出口
import DHRequest from './request'
import { BASE_URL, TIME_OUT} from './request/config'

const dhRequest = new DHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = '2'
      if(token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})


export default dhRequest

