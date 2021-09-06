/***
 * 路由守卫
 * 202010901 后期要增加vuex中的getToken来验证是否有正常登录
 */

import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

// 设置白名单
const whiteList = ['/login', '/register']

router.beforeEach((to,from,next)=>{
  next()
  NProgress.start()
  if (to.path === '/login') {
    next({ path: '/' })
    NProgress.done()
  } else {
    // 先动态拉取用户信息并，后再动态添加路由 本版本暂不添加
  }
  if(whiteList.indexOf(to.path) !== -1){
    next()
  } else {
    next('/login') // 否则全部重定向到登录页
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
