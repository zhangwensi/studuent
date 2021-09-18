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
