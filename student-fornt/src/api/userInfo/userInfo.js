import service from '../../utils/request'

//用户管理界面接口
export function teacherRole(data) {
  return service.request({
    method:'POST',
    url:'/teacherRole',
    data
  })
}
