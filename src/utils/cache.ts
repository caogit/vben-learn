/*
 * @Description:
 * @Version: 2.0
 * @Autor: 曹老板
 * @Date: 2021-11-30 11:11:17
 * @LastEditors: caoao chou45169@163.com
 * @LastEditTime: 2022-07-13 19:10:27
 */
/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 */

import { cacheType } from '@/enums/cache'

type fooType = string | null

class localCache {
  // 设置本地存储
  setCache(key: string, value: any, cacheMode = cacheType.local) {
    window[cacheMode].setItem(key, JSON.stringify(value))
  }
  // 获取本地存储
  getCache(key: string, cacheMode = cacheType.local) {
    const foo: fooType = window[cacheMode].getItem(key)
    if (foo && foo != 'undefined') {
      return JSON.parse(foo)
    }
  }
  // 删除本地存储
  deleteCache(key: string, cacheMode = cacheType.local) {
    window[cacheMode].removeItem(key)
  }
  // 清空本地存储
  clearCache(cache = cacheType.local) {
    if (cache === cacheType.local) {
      window.localStorage.clear()
    }
  }
}

export default new localCache()
