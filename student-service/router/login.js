const Router = require('koa-router')
const koaBody =require('koa-body')
const db = require('../db')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = 'STUDENT'
const login = new Router()

login.post('/',koaBody(), async (ctx) => {
    let userName = ctx.request.body.username
    let password = ctx.request.body.password
    let sql = `SELECT * FROM userList WHERE username='${userName}' and password='${password}'`
    let result = await new Promise((resolve,reject)=>{
        try {
            return db.query(sql,(err,data)=>{
                if(err) throw err
                if(data.length>0) {
                    resolve(data)
                } else {
                    resolve(false)
                }
            })
        }catch {
            ctx.body = {
                msg:'数据库内部错误'
            }
        }
    })
    // 如果有账号
    if(result) {
        if(result[0].password === password) {
            // 签发token
            let userToken = jsonwebtoken.sign({
                name: result[0].username, id:result[0].id},
                SECRET,
                { expiresIn: '0.5h' }
            )
            ctx.body ={
                code: 200,
                data: {
                    username: result[0].username,
                    role: result[0].role,
                    realname: result[0].realname,
                    token:userToken
                },
                msg:"登录成功"
            }
        } else {
            ctx.body = {
                username: username,
                msg: "密码错误"
            }
        }
    } else {
        ctx.body= {
            msg: "用户不存在，请联系管理员添加！"
        }
    }
})

module.exports = login