/* 主体封装 */

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ICA } from './axiosType'
import { ElLoading } from 'element-plus'
import { AxiosCanceler } from './axiosCancel'

/* 默认是否使用loading */
const DEFAULT_LOADING = true

class packAxios {
  // 这个instance是实例的意思，也就是说每次new出来的是一个新实例
  instance: AxiosInstance
  /* 存储以服务的方式来调用的serveLoding  之后直接this.loading.close就可以关闭了 */
  loading?: any
  /* 前面请求的时候传过来的参数 */
  showLoading?: boolean

  constructor(config: ICA) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    const axiosCancel = new AxiosCanceler()

    // 给请求拦截器设置,里面不是接收两个参数吗，一个是成功请求一个是失败请求的
    this.instance.interceptors.request.use(
      config.interceptor?.requestInterceptor,
      config.interceptor?.requestInterceptorCatch
    )
    // 给响应拦截器设置，里面同样接收两个参数，一个是成功响应，一个是失败响应的
    this.instance.interceptors.response.use(
      config.interceptor?.responseInterceptor,
      config.interceptor?.responseInterceptorCatch
    )

    /* 给所有实例设置请求拦截器 */
    this.instance.interceptors.request.use(
      (config) => {
        // 添加url到缓存数组中，防止重复多次请求
        const {
          headers: { ignoreCancelToken = true, SetShortTimeNoReq = false },
        } = config as any
        !ignoreCancelToken && axiosCancel.addPending(config)

        // 添加url到缓存数组中，短时间内不可重复请求
        // const { time = 3000 } = SetShortTimeNoReq || {}
        // SetShortTimeNoReq && axiosShortTimeCancel.removePendingUrl(config, time)

        // 设置loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: '正在请求中.....',
            background: 'rgba(0,0,0,0.5)',
          })
        }

        // console.log('所有实例请求拦截成功')
        return config
      },
      (err) => {
        return err
      }
    )

    /* 给所有实例设置响应拦截器 */
    this.instance.interceptors.response.use(
      (config) => {
        // config && axiosCancel.removePending(config)
        config && axiosCancel.delayDetail(config)

        // config && axiosShortTimeCancel.realDeleteUrl(config)
        this.loading?.close()

        // console.log('所有实例响应拦截成功')
        // const { data } = config.data || {}
        // if (config.data?.code != 0) {
        //   ElMessage.error(data)
        // }

        // if (config.data?.returnCode === '-1001') {
        //   console.log('请求失败，错误信息~~~')
        // }
        /* 因为我们只需要里里面的data，所以将它的data return出去就可以了 */

        return config ? config.data : ''
      },
      (err) => {
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }
  request<T = any>(parms: ICA<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断单独请求拦截器是否存在
      if (parms?.interceptor?.requestInterceptor) {
        parms = parms?.interceptor?.requestInterceptor(parms)
      }
      this.showLoading = parms.showLoading === false ? false : DEFAULT_LOADING
      // 响应成功后就会自动走到这个实例的then里面了
      this.instance
        .request<any, T>(parms)
        .then((res) => {
          // 暂时不考虑请求成功，但是是错误信息
          // console.log('🤡 ~~ res', res)

          // 1. 单个请求对数据处理
          if (parms?.interceptor?.responseInterceptor) {
            res = parms.interceptor.responseInterceptor(res)
          }
          // 2. 每次请求后重置loading设置
          this.showLoading = DEFAULT_LOADING

          return resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  /* 这里的泛型是指promise返回的类型由请求的时候传入的类型决定 */
  get<T = any>(parms: ICA<T>): Promise<T> {
    // 应用ts的字面量推理
    const obj = { method: 'GET' } as const
    return this.request({ ...parms, ...obj })
  }
  post<T = any>(parms: ICA<T>): Promise<T> {
    return this.request({ ...parms, method: 'POST' })
  }
  delete<T = any>(parms: ICA<T>): Promise<T> {
    const obj = { method: 'DELETE' } as const
    return this.request({ ...parms, ...obj })
  }
  patch<T = any>(parms: ICA<T>): Promise<T> {
    const obj = { method: 'PATCH' } as const
    return this.request({ ...parms, ...obj })
  }
}

export default packAxios
