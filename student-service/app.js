const Koa = require('koa')
const cors = require('koa2-cors')
const router = require('./router/index')
const koajwt = require('koa-jwt')
const SECRET = 'STUDENT' // 前后端定义私钥
const app = new Koa()

app.use(cors())
app.use(koajwt({ secret: SECRET }).unless({
    // 登录接口不需要验证
    path: [/^\/api\/login/]
  }))

app.use(router.routes(),router.allowedMethods())

app.listen(3000,()=>{
    console.log('服务已开启')
})