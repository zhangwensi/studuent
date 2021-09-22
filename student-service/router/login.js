const Router = require('koa-router')
const koaBody =require('koa-body')
const db = require('../db')
const moment = require('moment')
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
        }catch(e) {
            ctx.body = {
                msg:'数据库内部错误'+e
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
                { expiresIn: '4h' }
            )
            ctx.body ={
                code: 200,
                data: {
                    username: result[0].username,
                    role: result[0].role,
                    realname: result[0].realname,
                    sclass: result[0].sclass,
                    grader: result[0].grader,
                    token:userToken
                },
                msg:"登录成功"
            }
            // 记录登录信息 导入数据库
            let host = ctx.request.host
            let time = moment().format('YYYY-MM-DD HH:mm:ss')
            let logSql = `INSERT INTO Loginlog (username,host,date) values ('${userName}','${host}','${time}')`
            await new Promise((resolve,reject) => {
                db.query(logSql,(err,data)=>{
                    if(err) throw err
                    try {
                        if(data.length>0) {
                            resolve(data)
                        } else {
                            resolve(false)
                        }
                    } catch(e) {
                        console.log('入库失败'+e)
                    }
                })
            })
        } else {
            ctx.body = {
                code: 202,
                username: userName,
                msg: "密码错误"
            }
        }
    } else {
        ctx.body= {
            code: 201,
            msg: "用户不存在，请联系管理员添加！"
        }
    }
})

module.exports = login