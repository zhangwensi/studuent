/***
 * 设置存储登录用户的token
 */

import Cookies from "js-cookie"

const TokenKey = "admin"

export function getToken() {
  return Cookies.get(TokenKey)
}


export function setToken(token) {
  return Cookies.set(TokenKey,token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
