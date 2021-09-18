const Router = require('koa-router')
const koaBody =require('koa-body')
const db = require('../db')
const exportData = new Router()

exportData.post('/',koaBody(),async (ctx) => {
    let sclass = ctx.request.body.sclass
    let grader = ctx.request.body.grader
    let sql = `select * from sginList where sclass= '${sclass}' and grader = '${grader}'`
    let result = await new Promise((resolve,reject) => {
        return db.query(sql,(err,data)=>{
            if(err) throw err
            if(data.length>0) {
                resolve(data)
            } else {
                resolve(false)
            }
        })
    })
    if(result.length>0) {
        ctx.body = {
            code: 200,
            data: result,
            msg:"请求成功"
        }
    } else {
        ctx.body = {
            code: 201,
            msg:'请求数据失败'
        }
    }
})

module.exports = exportData
