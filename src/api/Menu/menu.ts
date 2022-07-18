import { insRequest } from '@/serves/index'

export function getMenuList() {
  return insRequest
    .get({ url: '/sys/permission/getUserPermissionByToken' })
    .then((res) => {
      if (res) return res.result.menu
    })
}
