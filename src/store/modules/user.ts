import { defineStore } from 'pinia'
import { store } from '/@/store'
import { LoginSystem, getSysUserInfo } from '@/api/Login/login'
import { Result } from '/#/axios'
import Cache from '@/utils/cache'
import { TOKEN_KEY, USER_INFO } from '@/enums/cache'
import { PageEnum } from '@/enums/PageEnum'
import { usePermissionStore } from '@/store/modules/permission'
import { router } from '@/router/index'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/index'
import type { RouteRecordRaw } from 'vue-router'
interface ILoginParms {
  username: string
  password: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    token: '',
    userInfo: {},
    sessionTimeout: false,
  }),
  getters: {
    getToken(): string {
      return this.token || Cache.getCache(TOKEN_KEY)
    },
    getUserInfo(): any {
      return this.userInfo || Cache.getCache(USER_INFO)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
  },
  actions: {
    setUserInfo(val: any) {
      this.userInfo = val
      Cache.setCache(USER_INFO, val)
    },
    setToken(val: string) {
      this.token = val
      Cache.setCache(TOKEN_KEY, val)
    },
    login(
      parms: ILoginParms & {
        goHome?: boolean
      }
    ): Promise<Result> {
      return new Promise((resolve, reject) => {
        const { goHome = true } = parms
        LoginSystem(parms)
          .then((res) => {
            console.log('🤡 ~~ res', res)
            if (res.code !== 200) return
            const { token, userInfo } = res.result
            this.setToken(token)
            this.afterLoginAction(goHome, res.result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async afterLoginAction(goHome: Boolean, data?: any): Promise<any | null> {
      const { code, result } = await getSysUserInfo()
      if (!result?.userInfo) return
      this.setUserInfo(result.userInfo)
      const permissionStore = usePermissionStore()
      if (!permissionStore.isDynamicAddedRoute) {
        const routes = await permissionStore.buildRoutesAction()
        console.log('🤡 ~~ routes', routes)
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw)
        })
        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
        permissionStore.setDynamicAddedRoute(true)

        goHome &&
          (await router.replace(
            (result && result.homePath) || PageEnum.BASE_HOME
          ))
      }
      return data
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
