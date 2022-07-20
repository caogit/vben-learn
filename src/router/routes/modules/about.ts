import type { AppRouteModule } from '@/router/type'
import { LAYOUT } from '@/router/constand'

const dashboard: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:grid-outline',
    title: '关于',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('/@/views/about/index.vue'),
      meta: {
        // affix: true,
        title: '关于',
        hideMenu: true,
      },
    },
  ],
}

export default dashboard
