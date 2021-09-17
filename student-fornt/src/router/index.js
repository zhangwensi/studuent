import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 公共路由

const publicRoutes = [
  // 重定向
  {
    path:"/",
    redirect:'login',
    hidden: true
  },
  {
    // 登录界面
    path:"/login",
    component: () => import('@/views/login'),
    name:'login',
    hidden: true
  },
  {
    path:"/home",
    component: ()=> import('@/views/home'),
    name: "home",
    meta:{
      icon:'',
      name:"班级控制台"
    },
    redirect:'/index',
    children:[
      {
        path:'/index',
        component: () => import('@/components/container/index'),
        name: "index",
        meta:{
          icon:"",
          name:"班级信息"
        }
      }
    ]
  },
  {
    path:"/infoChange",
    component: ()=> import('@/views/home'),
    name:"infoChange",
    meta: {
      icon:'',
      name:"信息管理"
    },
    children:[
      {
        path:'/infoList',
        component: () => import('@/components/user/infoList'),
        name:'infoList',
        meta:{
          icon:'',
          name:"用户信息列表",
        }
      },
      {
        path:'/userInfo',
        component: () => import('@/components/user/userInfo'),
        name:'userInfo',
        meta:{
          icon:'',
          name:"学生信息",
        }
      }
    ]
  },
  {
    path:"/score",
    component: ()=> import('@/views/home'),
    name:"infoChange",
    meta: {
      icon:'',
      name:"成绩展板"
    },
    children:[
      {
        path:"/recordScore",
        component: ()=> import('@/components/score/recordScore'),
        name:"recordScore",
        meta: {
          icon:'',
          name:"成绩录入"
        }
      },
      {
        path:"/typeScore",
        component: ()=> import('@/components/score/typeScore'),
        name:"typeScore",
        meta: {
          icon:'',
          name:"成绩看板"
        }
      }
    ]
  }
]

export default new Router({
  mode:'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes:publicRoutes
})
