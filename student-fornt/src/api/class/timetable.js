import service from "../../utils/request"

export function timeTable(data) {
  return service.request({
    method: 'POST',
    url:'/timetable',
    data
  })
}

// 获取班委信息
export function stuRole(data) {
  return service.request({
    method: 'POST',
    url:'/studentRole',
    data
  })
}
