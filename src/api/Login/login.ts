import { insRequest } from '@/serves/index'

export function LoginSystem(params: any) {
  return insRequest.post({
    url: 'prod-api/login',
    data: params,
  })
}
