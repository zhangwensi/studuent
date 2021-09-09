/**
 * 此模块为新生录入系统专用接口
 * 用于获取用户信息
 */
const Router = require('koa-router')
const koaBody =require('koa-body')
const db = require('../db')
const getSiginInfo = new Router()

getSiginInfo.post('/',koaBody(),async (ctx) => {
    let username = ctx.request.body.username
    let sclass = ctx.request.body.sclass
    let grader = ctx.request.body.grader
    let phone = ctx.request.body.phone
    let sql = `select * from sginList where username='${username}' and sclass= '${sclass}' and grader = '${grader}' and phone = '${phone}'`
    let infoResult = await new Promise((resolve,reject)=>{
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
    if(infoResult.length>0) {
        ctx.body = {
            code: 200,
            data: infoResult[0],
            msg:'请求数据成功'
        }
    } else {
        ctx.body = {
            code: 201,
            msg:'请求数据失败'
        }
    }
})

module.exports = getSiginInfo