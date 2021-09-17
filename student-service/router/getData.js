const Router = require('koa-router')
const koaBody =require('koa-body')
const db = require('../db')
const getDate = new Router()


getDate.post('/',koaBody(), async(ctx) => {
    let sclass = ctx.request.body.sclass
    let grader = ctx.request.body.grader
    let pageSize = ctx.request.body.pageSize || 10
    let currentSize = ctx.request.body.currentSize || 1
    // let sql = `select * from sginList where sclass= '${sclass}' and grader = '${grader}'`
    let sql = `select * from sginList where sclass= '${sclass}' and grader = '${grader}' limit ${pageSize*(currentSize-1)},${pageSize}`
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
    let total = await new Promise((resolve,reject)=>{
        return db.query(`select count(*) as total from sginList where sclass= '${sclass}' and grader = '${grader}'`,(err,data) => {
            if (err) throw err
            if(data.length>0) {
                resolve(data)
            } else {
                resolve(false)
            }
        })
    })
    ctx.body = {
        code: 200,
        data: result,
        total: total[0].total,
        msg:"请求成功"
    }
})

module.exports = getDate