import { insRequest } from '@/serves/index'
import { ILoginResult } from './types'
import { Result } from '/#/axios'

export function LoginSystem(params: any) {
  return insRequest.post<Result<ILoginResult>>({
    url: '/sys/login',
    data: params,
  })
}
