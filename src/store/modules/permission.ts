import type { AppRouteRecordRaw, Menu } from '/@/router/type'

import { defineStore } from 'pinia'
import { store } from '/@/store'
import { useUserStore } from './user'
import { toRaw } from 'vue'
import {
  transformObjToRoute,
  flatMultiLevelRoutes,
  addSlashToRouteComponent,
} from '/@/router/helper/routeHelper'
import { transformRouteToMenu } from '/@/router/helper/menuHelper'

import {
  ERROR_LOG_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  routeModuleList,
} from '/@/router/routes/index'

import { filter } from '/@/utils/helper/treeHelper'

import { getMenuList } from '@/api/Menu/menu'
import { getPermCode } from '/@/api/Login/login'

import { PageEnum } from '/@/enums/PageEnum'

interface PermissionState {
  // Permission code list
  permCodeList: string[] | number[]
  // 是否是动态路由
  isDynamicAddedRoute: boolean
  // To trigger a menu update
  lastBuildMenuTime: number
  // Backstage menu list
  backMenuList: Menu[]
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    // 按钮权限code
    permCodeList: [],
    // 是否是动态路由
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // 菜单list
    backMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },

    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.permCodeList = []
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    async changePermissionCode() {
      const codeList = await getPermCode()
      this.setPermCodeList(codeList)
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore()

      let routes: AppRouteRecordRaw[] = []

      // const routeFilter = (route: AppRouteRecordRaw) => {
      //   const { meta } = route
      //   const { roles } = meta || {}
      //   if (!roles) return true
      //   return roleList.some((role) => roles.includes(role))
      // }

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return
        let homePath: string =
          userStore.getUserInfo.homePath || PageEnum.BASE_HOME
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }
        try {
          patcher(routes)
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return
      }

      // 从后台获取权限码，
      // 这个函数可能只需要执行一次，并且实际的项目可以在正确的时间被放置
      let routeList: AppRouteRecordRaw[] = []
      try {
        this.changePermissionCode()
        routeList = (await getMenuList()) as AppRouteRecordRaw[]
      } catch (error) {
        console.error(error)
      }

      /**
       *下面设置routeList采用单一职责，分的很细，保证一个函数干一个事
       *
       */

      // 组件地址前加斜杠处理  author: lsq date:2021-09-08
      routeList = addSlashToRouteComponent(routeList)

      // 动态引入组件
      routeList = transformObjToRoute(routeList)

      //  Background routing to menu structure
      const backMenuList = transformRouteToMenu(routeList)
      console.log('🤡 ~~ backMenuList', backMenuList)

      this.setBackMenuList(backMenuList)

      // remove meta.ignoreRoute item
      routeList = filter(routeList, routeRemoveIgnoreFilter)
      routeList = routeList.filter(routeRemoveIgnoreFilter)

      // 将多级路由都处理成二级路由
      routeList = flatMultiLevelRoutes(routeList)
      routes = [...routeList]

      routes.push(ERROR_LOG_ROUTE)
      patchHomeAffix(routes)
      return routes
    },
  },
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
