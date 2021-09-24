/**
 * 设置请求拦截与响应拦截
 */
import axios from 'axios'
import { getToken } from './auth'
import { Notification, MessageBox, Message } from 'element-ui'
import errCode from './errCode'

// 设置默认请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例

const service = axios.create({
  // 配置的后端地址
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://139.196.178.250:3017/api' || 'http://localhost:3000/api',
  // 超时时间
  timeout: 10000
})

service.interceptors.request.use(config => {
  // 是否设置token
  const isToken = (config.headers || {}).isToken === false
  if( getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken()  //可配置
  }
  // get请求映射params参数
  if(config.method === 'get' && config.params) {
    let url = config.url + '?'
    //使用字符串作为 URI 组件进行编码
    for(const propName of Object.keys(config.params)) {
      const value = config.params[propName]
      let port = encodeURIComponent(value) + "="
      if(value !== null && typeof(value) !== "undefined") {
        if( typeof value === 'Object') {
          for(const key of Object.keys(value)) {
            let subParmas = propName + '[' + key + ']'
            let subPart = encodeURIComponent(subParmas) + '='
            url += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        url += port + encodeURIComponent(value) + '&'
      }
    }
    url += url.slice(0,-1)
    config.params = {}
    config.url = url
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})


// 拦截请求
service.interceptors.response.use(res => {
  // 如未返回code则默认成功
  const code = res.data.code || 200
  // 获取错误信息
  const msg = errCode[code] || res.data.msg || errCode['default']
  // 分类型的错误码定义
  if(code === 401) {
    MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      // 设置退出系统非前端退出系统

    }).catch(()=>{})
  } else if (code === 500) {
    Message({
      message: msg,
      type: 'error'
    })
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    Notification.error({
      title: msg
    })
    return Promise.reject('error')
  } else {
    return res.data
  }
},error => {
  let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
})


export default service
