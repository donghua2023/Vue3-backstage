import dhRequest from '../index'
import type {IAccount} from '@/types'

export function accountLoginRequest(account: IAccount) {
  return dhRequest.post({
    url: 'login',
    data: account
  })
}
