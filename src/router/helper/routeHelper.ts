import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/type'
import type { Router, RouteRecordNormalized } from 'vue-router'

import {
  getParentLayout,
  LAYOUT,
  EXCEPTION_COMPONENT,
} from '/@/router/routes/index'
import { cloneDeep, omit } from 'lodash-es'
import { warn } from '/@/utils/log'
import { createRouter, createWebHashHistory } from 'vue-router'
const IFRAME = () => import('/@/views/sys/iframe/FrameBlank.vue')

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()

const modules = import.meta.glob('../../views/**/*.{vue,tsx}')

LayoutMap.set('LAYOUT', LAYOUT)
LayoutMap.set('IFRAME', IFRAME)

// Turn background objects into routing objects
export function transformObjToRoute<T = AppRouteModule>(
  routeList: AppRouteModule[]
): T[] {
  const list = initMenu(routeList)
  return list
}

export const initMenu = (menu: any) => {
  menu.forEach((el: any) => {
    if (el.component?.includes('index')) {
      el.component = el.component.replace('/index', '')
    }
    const comModule =
      modules[`../../views${el.component}/index.vue`] ||
      modules[`../../views${el.component}/index.tsx`]
    if (el.component === '/layouts/default') {
      el.component = LAYOUT
    } else {
      el.component = comModule
    }
    if (el.children != null && el.children.length) {
      initMenu(el.children)
    }
  })
  return menu
}

/**
 * Convert multi-level routing to level 2 routing
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules)
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    if (!isMultipleRoute(routeModule)) {
      continue
    }
    promoteRouteLevel(routeModule)
  }
  return modules
}

// Routing level upgrade
function promoteRouteLevel(routeModule: AppRouteModule) {
  // Use vue-router to splice menus
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  })

  const routes = router.getRoutes()
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null

  routeModule.children = routeModule.children?.map((item) =>
    omit(item, 'children')
  )
}

// Add all sub-routes to the secondary route
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteModule
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteModule)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

// Determine whether the level exceeds 2 levels
function isMultipleRoute(routeModule: AppRouteModule) {
  if (
    !routeModule ||
    !Reflect.has(routeModule, 'children') ||
    !routeModule.children?.length
  ) {
    return false
  }

  const children = routeModule.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}
/**
 * 组件地址前加斜杠处理
 * @updateBy:lsq
 * @updateDate:2021-09-08
 */
export function addSlashToRouteComponent(routeList: AppRouteRecordRaw[]) {
  routeList.forEach((route) => {
    const component = route.component as string
    if (component) {
      const layoutFound = LayoutMap.get(component)
      if (!layoutFound) {
        route.component = component.startsWith('/')
          ? component
          : `/${component}`
      }
    }
    route.children && addSlashToRouteComponent(route.children)
  })
  return routeList as unknown as T[]
}
