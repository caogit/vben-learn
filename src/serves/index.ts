/*
 * @Description: 😎
 * @Version: 2.0
 * @Autor: 曹老板
 * @Date: 2021-11-23 10:16:50
 * @LastEditors: caoao chou45169@163.com
 * @LastEditTime: 2022-07-21 10:02:48
 */
// server统一出口

import packAxios from '@/serves/request'
import { BASE_URL, TIME_OUT } from './request/config'
import Cache from '@/utils/cache'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { TOKEN_KEY } from '@/enums/cache'
import { RequestHeaderEnum } from '@/enums/httpEnum'

const insRequest = new packAxios({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    // 请求成功拦截
    requestInterceptor: (config) => {
      console.log('单个实例请求成功拦截')
      const token = Cache.getCache(TOKEN_KEY)
      if (token) {
        config.headers![RequestHeaderEnum.ASSESS_TOKEN] = token
      }
      return config
    },
    // 请求失败拦截
    requestInterceptorCatch: (err) => {
      return err
    },
    // 响应成功拦截
    responseInterceptor: (config) => {
      // console.log('🤡 ~~ config', config)
      // console.log('单个实例响应成功拦截')
      return config
    },
    // 响应失败拦截
    responseInterceptorCatch: (error) => {
      // ElMessage.error('网络请求异常，请稍后重试!')
      // 请求是否被取消
      const isCancel = axios.isCancel(error)
      // 没有被取消
      if (!isCancel) {
        const { code, message } = error.response.data
        ElMessage.error(message)
        if (code === 401) {
        }
      } else {
        ElMessage.error(
          '重复请求被取消,设置loading或者用axios.CancelToken取消请求'
        )
        console.warn(error, '请求被取消！')
      }
    },
  },
})

export { insRequest }
