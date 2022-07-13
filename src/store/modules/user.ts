import { defineStore } from 'pinia'
import { store } from '/@/store'

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
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
