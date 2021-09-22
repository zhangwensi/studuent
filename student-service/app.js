const Koa = require('koa')
const cors = require('koa2-cors')
const router = require('./router/index')
const jwt = require('jsonwebtoken')
const koaBody =require('koa-body')
const koajwt = require('koa-jwt')
const SECRET = 'STUDENT' // 前后端定义私钥
const app = new Koa()


app.use(cors())

// 中间件对token进行验证
app.use(async (ctx,next) => {
  return next().catch((err) => {
      if (err.status === 401) {
          ctx.status = 401;
          ctx.body = {
              code: 401,
              msg: err.message
          }
      } else {
          throw err;
      }
  })
})

app.use(koajwt({ secret: SECRET }).unless({
    // 登录接口不需要验证
    path: [/^\/api\/login/,/^\/api\/sigin/]
  }))



app.use(router.routes(),router.allowedMethods())

app.listen(3017,()=>{
    console.log('服务已开启')
})