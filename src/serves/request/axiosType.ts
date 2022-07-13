/* 规定axios中的类型 */

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 写一个接口，规定请求拦截器和响应拦截器的类型
export interface IRR<T> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}
// 这里就是相当于拓展了AxiosRequestConfig这个接口，不仅可以传入基本的类型，还可以传入拦截器
// 也是为了前面创建实例的时候可以传入interceptor这个参数
export interface ICA<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: IRR<T>
  showLoading?: boolean
  token?: string
}
