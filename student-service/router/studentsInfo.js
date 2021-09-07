/**
 * 本后台接口功能：
 * 获取学生信息
 * 添加或修改学生信息
 */

const Router = require('koa-router')
const koaBody =require('koa-body')
const db = require('../db')
const studentInfo = new Router()

// 查询学生信息
studentInfo.post('/',koaBody(), async (ctx)=> {
    // let userName = ctx.request.body.username
    let className = ctx.request.body.class
    let grade = ctx.request.body.grade
    let pageSize = ctx.request.body.pageSize || 10
    let currentSize = ctx.request.body.currentSize || 1
    let sql = `select * from studentInfo where class = '${className}' and grade = '${grade}' limit ${pageSize*(currentSize-1)},${currentSize*pageSize}`
    let result = await new Promise((resolve,reject) => {
        try {
            return db.query(sql,(err,data)=>{
                if (err) throw err
                if(data.length>0) {
                    resolve(data)
                } else {
                    resolve(false)
                }
            })
        } catch (e) {
            ctx.body={
                code: 202,
                msg: '数据库内部错误' + e
            } 
        }
    })
    let total = await new Promise((resolve,reject)=>{
        return db.query(`select count(*) as total from studentInfo`,(err,data) => {
            if (err) throw err
            if(data.length>0) {
                resolve(data)
            } else {
                resolve(false)
            }
        })
    })
    if(result && total) {
        ctx.body = {
            code: 200,
            data: result[0],
            totla: total[0].total,
            msg: '请求成功'
        }
    } else {
        ctx.body={
            code: 202,
            msg: '暂无您所需要的查询结果，如有疑问请与管理员联系核实'
        }
    }
    
})

// 修改&&新增学生信息
studentInfo.put('/put',koaBody(),async (ctx) => {
    let uuid = ctx.request.body.uuid || ''
    let name = ctx.request.body.studentname || ''
    let old = ctx.request.body.old || ''
    let sex = ctx.request.body.sex || ''
    let className = ctx.request.body.class || ''
    let address = ctx.request.body.address || ''
    let grade = ctx.request.body.grade || ''
    let phone = ctx.request.body.phone || ''
    let sql = `update studentInfo set uuid = '${uuid}' ,name = '${name}',old='${old}',
    sex='${sex}',class='${className}',address = '${address}',grade='${grade}',phone='${phone}'`
    let result = await new Promise((resolve,reject)=>{
        try {
            return db.query(sql,(err,data) => {
                if (err) throw err
                if(data.length>0) {
                    resolve(data)
                } else {
                    resolve(false)
                }
            })
        } catch(e) {
            ctx.body={
                code: 202,
                msg: '数据库内部错误' + e
            }
        }
    })
    if(result) {
        ctx.body={
            code: 200,
            msg: '修改成功'
        }
    } else {
        ctx.body={
            code: 202,
            msg: '修改失败'
        }
    }
})

//删除学生信息
studentInfo.delete('/delete',koaBody(),async (ctx) => {
    let uuid = ctx.request.body.uuid || ''
    let name = ctx.request.body.studentname || ''
    let sql = `delete from studentInfo where uuid = '${uuid}' and name = '${name}'`
    let result = await new Promise((resolve,reject)=>{
        try {
            return db.query(sql,(err,data) => {
                if (err) throw err
                if(data.length>0) {
                    resolve(data)
                } else {
                    resolve(false)
                }
            })
        } catch(e) {
            ctx.body={
                code: 202,
                msg: '数据库内部错误' + e
            }
        }
    })
    if(result) {
        ctx.body={
            code: 200,
            msg: '删除成功'
        }
    } else {
        ctx.body={
            code: 202,
            msg: '删除失败'
        }
    }
})

module.exports = studentInfo