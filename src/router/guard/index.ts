import type { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'

export function setRouterGuard(router: Router) {
  createPermissionGuard(router)
}
