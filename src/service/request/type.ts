import { AxiosResponse, AxiosRequestConfig } from 'axios'
// 拦截器接口
export interface DHRequestInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig, // 请求成功的拦截器
  requestFailureFn?: (err: any) => any,                             // 请求失败的拦截器
  responseSuccessFn?: (res: T) => T,             // 响应成功的拦截器
  responseFailureFn?: (err: any) => any                             // 响应失败的拦截器
}

export interface DHRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: DHRequestInterceptors<T>
  showLoading?: boolean
}
