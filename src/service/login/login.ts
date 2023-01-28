import hyRequest from '../index'

import { IAccount } from './type'

enum LoginApi {
  accountLogin = '/login',
  menu = 'role/1/menu'
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: LoginApi.accountLogin,
    data: account
  })
}
export function menuList() {
  return hyRequest.get({
    url: LoginApi.menu
  })
}
