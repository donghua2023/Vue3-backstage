import dhRequest from '../index'
import type {IAccount} from '@/types'

export function accountLoginRequest(account: IAccount) {
  return dhRequest.post({
    url: 'login',
    data: account
  })
}
// 通过用户ID查询用户信息
export function getUserInfoById(id: number) {
  return dhRequest.get({
    url: `users/${id}`
  })
}
// 通过角色id查询用户权限
export function getUserRoleById(id: number) {
  return dhRequest.get({
    url: `role/${id}/menu`
  })
}
