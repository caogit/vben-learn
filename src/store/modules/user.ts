import { defineStore } from 'pinia'
import { store } from '/@/store'
import { LoginSystem } from '@/api/Login/login'
import { Result } from '/#/axios'

interface ILoginParms {
  username: string
  password: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    token: '',
    roleList: [],
    userInfo: {},
    sessionTimeout: false,
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getRoleList(): any[] {
      return this.roleList
    },
    getUserInfo(): any {
      return this.userInfo
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
  },
  actions: {
    afterLoginAction() {
      return true
    },
    login(parms: ILoginParms): Promise<Result> {
      return new Promise((resolve, reject) => {
        LoginSystem(parms)
          .then((res) => {
            if (res.code !== 200) return
            const { token, userInfo } = res.result
            console.log('🤡 ~~ token, userInfo ', token, userInfo)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
