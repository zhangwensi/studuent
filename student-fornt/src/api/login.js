import service from '../utils/request'

export function login(data) {
  return service.request({
    method:'post',
    url:'/login',
    data
  })
}

// 登出
export function loginOut(data) {
  return service.request({
    method:"post",
    url:'/loginOut',
    data
  })
}
