import service from "../../utils/request"

export function getStudentData(data) {
  return service.request({
    method: 'POST',
    url:'/getData',
    data
  })
}
