import service from "../../utils/request"

export function getStudentData(data) {
  return service.request({
    method: 'POST',
    url:'/getData',
    data
  })
}

//导出数据接口

export function exportExcel(data) {
  return service.request({
    method: 'POST',
    url:'/excelData',
    data
  })
}

//新增或编辑用户接口
export function addStudent(data) {
  return service.request({
    method: 'POST',
    url: '/sigin',
    data
  })
}

//删除学生信息接口
export function deletStudent(data) {
  return service.request({
    method: 'POST',
    url: '/sigin',
    data
  })
}
