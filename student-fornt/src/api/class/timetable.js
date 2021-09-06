import service from "../../utils/request"

export function timeTable(data) {
  return service.request({
    method: 'POST',
    url:'/timetable',
    data
  })
}
