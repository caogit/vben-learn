/*
 * @Description: 😎
 * @Version: 2.0
 * @Autor: 曹老板
 * @Date: 2022-03-10 15:34:01
 * @LastEditors: caoao chou45169@163.com
 * @LastEditTime: 2022-07-13 17:11:30
 */
import axios, { AxiosRequestConfig, Canceler } from 'axios'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, any>()

// export const getPendingUrl = (config: AxiosRequestConfig) =>
//   [
//     config.method,
//     config.url,
//     qs.stringify(config.data),
//     qs.stringify(config.params)
//   ].join('&')

export class AxiosCanceler {
  /**
   * 添加请求，
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    // const url = getPendingUrl(config)
    const url = config.url ?? ''
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果 pending 中不存在当前请求，则添加进去
          pendingMap.set(url, cancel)
        }
      })
  }

  /**
   * @description: 清空所有pending
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && cancel()
    })
    pendingMap.clear()
  }

  /**
   * 移除请求
   * @param {Object} config
   */
  removePending(config: any) {
    const date = new Date().getTime()
    const urls = config.url ?? config.config.url

    if (date < pendingMap.get(urls + 's')?.time ?? 0) {
      // 这里throw将错误抛出会别响应失败拦截捕获到
      throw '2s中内不可再次请求'
    }

    // const url = getPendingUrl(config)
    const url = config?.url ?? config.config.url

    if (pendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = pendingMap.get(url)
      // 这里的请求一取消，就去到响应失败拦截器中，所以在那里判断就可以了
      cancel && cancel('121')
      pendingMap.delete(url)
    }
  }

  delayDetail(config: any) {
    const { SetShortTimeNoReq } = config.config.headers ?? false
    const { url } = config.config

    if (SetShortTimeNoReq) {
      const date = new Date().getTime()
      pendingMap.set(url + 's', { time: date + 2000 })
    }
  }

  /**
   * @description: 重置
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
