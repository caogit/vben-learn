import { defineStore } from 'pinia'
import { store } from '/@/store'

interface IMenuStatus {
  sidebarDefault: string
}

export const useMenuStatusStore = defineStore({
  id: 'menu-state',
  state: (): IMenuStatus => ({
    sidebarDefault: '',
  }),
  getters: {
    getSideBarDefault(): string {
      return this.sidebarDefault
    },
  },
  actions: {
    setSidebarDefault(val: string) {
      console.log('🤡 ~~ val', val)
      this.sidebarDefault = val
    },
  },
})

export function useMenuStatusStoreWithOut() {
  return useMenuStatusStore(store)
}
