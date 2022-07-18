import { insRequest } from '@/serves/index'
import { ILoginResult } from './types'
import { Result } from '/#/axios'
import { useUserStoreWithOut } from '@/store/modules/user'
import Cache from '@/utils/cache'
import { PageEnum } from '@/enums/PageEnum'
import { TOKEN_KEY } from '@/enums/cache'
import { router } from '@/router/index'

export function LoginSystem(params: any) {
  return insRequest.post<Result<ILoginResult>>({
    url: '/sys/login',
    data: params,
  })
}

/**
 * @description: getUserInfo
 */
export function getSysUserInfo() {
  return insRequest.get({ url: '/sys/user/getUserInfo' }).catch((e) => {
    // update-begin--author:zyf---date:20220425---for:【VUEN-76】捕获接口超时异常,跳转到登录界面
    if (e && (e.message.includes('timeout') || e.message.includes('401'))) {
      //接口不通时跳转到登录界面h
      const userStore = useUserStoreWithOut()
      userStore.setToken('')
      Cache.setCache(TOKEN_KEY, null)
      router.push(PageEnum.BASE_LOGIN)
    }
    // update-end--author:zyf---date:20220425---for:【VUEN-76】捕获接口超时异常,跳转到登录界面
  })
}
/**
 * / 获取系统权限
  // 1、查询用户拥有的按钮/表单访问权限
  // 2、所有权限
  // 3、系统安全模式
 */
export function getPermCode() {
  return insRequest.get({ url: '/sys/permission/getPermCode' })
}
