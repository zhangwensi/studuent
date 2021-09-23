const Router = require('koa-router')
const koaBody =require('koa-body')
const db = require('../db')
const studentRole = new Router()

studentRole.post('/',koaBody(), async (ctx) => {
    let id = ctx.request.body.id
    let name = ctx.request.body.name
    let grader = ctx.request.body.grader
    let sclass = ctx.request.body.sclass
    let interclass = ctx.request.body.interclass
    let role = ctx.request.body.role
    let type = ctx.request.body.type
    // 根据type的类型判断是获取数据还是新增或者修改数据
    if(type ==='update') {
        let sql=`update studentRole set name='${name}', grader='${grader}',interclass='${interclass}',role='${role}' where id = '${id}'`
        let upResulet = await new Promise((resolve,reject)=>{
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
        if(!upResulet) {
            ctx.body = {
                code: 200,
                msg: '修改成功'
            }
        } else {
            ctx.body = {
                code: 201,
                data: upResulet,
                msg:'修改失败'
            }
        }
    } else if(type ==='add') {
        let sql=`insert into studentRole (name,grader,interclass,sclass,role) values ('${name}','${grader}','${interclass}','${sclass}','${role}')`
        let insertResulet = await new Promise((resolve,reject)=>{
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
        if(!insertResulet) {
            ctx.body = {
                code: 200,
                msg: '添加成功'
            }
        } else {
            ctx.body = {
                code: 201,
                data: insertResulet,
                msg:'添加失败'
            }
        }
    } else {
        let sql=`select * from studentRole where sclass='${sclass}' and grader='${grader}'`
        let result =  await new Promise((resolve,reject)=>{
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
        if(result.length>0) {
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: result
            }
        } else {
            ctx.body = {
                code: 201,
                data: insertResulet,
                msg:'请求失败'
            }
        }
    }
})

module.exports = studentRole