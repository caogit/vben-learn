import type { AppRouteModule } from '/@/router/type'

import { LAYOUT } from '@/router/constand'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '首页',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/Analysis/index.vue'),
      meta: {
        // affix: true,
        title: '分析页',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作区',
      },
    },
  ],
}

export default dashboard
