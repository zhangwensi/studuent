/**
 * 此模块为新生录入系统专用接口
 * 注册时如有记录则进行update 如无则进行insert操作
 */

 const Router = require('koa-router')
 const koaBody =require('koa-body')
 const db = require('../db')
 const sigin = new Router()

 sigin.post('/',koaBody(), async(ctx) => {
    let username = ctx.request.body.username
    let sclass = ctx.request.body.sclass
    let grader = ctx.request.body.grader
    let phone = ctx.request.body.phone
    let birth = ctx.request.body.birth
    let address = ctx.request.body.address
    let patriarch = ctx.request.body.patriarch
    let sql = `select * from sginList where username='${username}' and sclass= '${sclass}' and birth = '${birth}'`
    let findResulet = await new Promise((resolve,reject)=>{
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
    if(!findResulet.length>0) {
        let sqlInsert = `insert into sginList (username,sclass,grader,phone,birth,address,patriarch) values ('${username}',
        '${sclass}','${grader}','${phone}','${birth}','${address}','${patriarch}')`
        let insertResulet = await new Promise((resolve,reject)=>{
            try {
                return db.query(sqlInsert,(err,data)=>{
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
                data: {
                    username: username,
                    sclass: sclass,
                    grader: grader,
                    phone: phone,
                    patriarch: patriarch
                },
                msg:'提交成功'
            }
        } else {
            ctx.body = {
                code: 201,
                data: insertResulet,
                msg:'提交失败'
            }
        }
    } else {
        let updateSql = `update sginList set  sclass= '${sclass}',birth = '${birth}',grader = '${grader}',phone = '${phone}',
        address = '${address}', patriarch = '${patriarch}' where username='${username}'`
        let updateResulet = await new Promise((resolve,reject)=>{
            try {
                return db.query(updateSql,(err,data)=>{
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
        if(!updateResulet) {
            ctx.body = {
                code: 200,
                data: {
                    username: username,
                    sclass: sclass,
                    grader: grader,
                    phone: phone
                },
                msg:'修改成功'
            }
        } else {
            ctx.body = {
                code: 201,
                data: updateResulet,
                msg:'修改失败'
            }
        }
    }
 })


 module.exports = sigin