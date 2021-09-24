const Router = require('koa-router')
const koaBody =require('koa-body')
const db = require('../db')
const teacherRole = new Router()

teacherRole.post('/',koaBody(), async (ctx) => {
    let username = ctx.request.body.username || ''
    let sclass = ctx.request.body.sclass || ''
    let grader = ctx.request.body.grader || ''
    let realname = ctx.request.body.realname || ''
    let role = ctx.request.body.role || '1'
    let tag = ctx.request.body.tag || '0'
    let id = ctx.request.body.id || ''
    let password = ctx.request.body.password || '123456'
    let type = ctx.request.body.type || ''
    let currentSize = ctx.request.body.currentSize || 1
    let pageSize = ctx.request.body.pageSize || 10
    if(type === 'delete') {
        let sql = `delete from userList where username='${username}' and sclass= '${sclass}' and id = ${id}`
        let deletResult = await new Promise((resolve,reject)=>{
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
        if(!deletResult) {
            ctx.body = {
                code: 200,
                msg:'删除成功'
            }
        } else {
            ctx.body = {
                code: 201,
                data: deletResult,
                msg:'删除失败'
            }
        }
    } else if(type === 'get') {
        let sql = `select id,username,role,tag,realname,sclass,grader from userList where role <> '99' limit ${pageSize*(currentSize-1)},${pageSize}`
        let getResult = await new Promise((resolve,reject) => {
            try {
                return db.query(sql,(err,data)=>{
                    if(err) throw err
                    if(data.length>0) {
                        resolve(data)
                    } else {
                        resolve(false)
                    }
                })
            } catch(e) {
                ctx.body = {
                    msg:'数据库内部错误'+e
                }
            }
        })
        let total = await new Promise((resolve,reject)=>{
            return db.query(`select count(*) as total from userList where role <> '99'`,(err,data) => {
                if (err) throw err
                if(data.length>0) {
                    resolve(data)
                } else {
                    resolve(false)
                }
            })
        })
        if(getResult) {
            ctx.body = {
                code: 200,
                data: getResult,
                total: total[0].total,
                msg:'请求成功'
            }
        } else {
            ctx.body = {
                code: 201,
                msg:'请求失败'
            }
        }
    } else {
        let sql = `select * from userList where username='${username}' and sclass= '${sclass}' and id = ${id}`
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
            let sqlInsert = `insert into userList (username,sclass,grader,role,password,realname) values ('${username}',
            '${sclass}','${grader}','${role}','${password}','${realname}')`
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
                        role: role,
                        tag: tag
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
            let updateSql = `update userList set  sclass= '${sclass}',username = '${username}',grader = '${grader}',role = '${role}',tag = '${tag}',
            realname = '${realname}' where id=${id}`
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
                        tag: tag
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
    }
})

module.exports = teacherRole