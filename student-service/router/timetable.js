const Router = require('koa-router')
const koaBody =require('koa-body')
const db = require('../db')

const timetable = new Router()

timetable.post('/',koaBody(),async (ctx) => {
    let userName = ctx.request.body.username
    let classNo = ctx.request.body.class
    let gradeNo = ctx.request.body.grade
    let isCharge = ctx.request.body.isCharge
    let sql = `select monday,tuesday,wednesday,thursday,friday from timetable where username='${userName}' and class='${classNo}' and greade='${gradeNo}' and ischargefor='${isCharge}'`
    let result = await new Promise((resolve,reject) => {
        return db.query(sql,(err,data)=>{
            if (err) throw err
            if(data.length>0) {
                resolve(data)
            } else {
                resolve(false)
            }
        })
    })
    // 根据result返回值进行区分
    let arr = []
    
    // 前端插件需要格式化
    arr[0] = result[0].monday.split(',')
    arr[1] = result[0].tuesday.split(',')
    arr[2] = result[0].wednesday.split(',')
    arr[3] = result[0].thursday.split(',')
    arr[4] = result[0].friday.split(',')
    ctx.body = {
        code: 200,
        data: arr,
        msg: '数据获得成功'
    }
})

module.exports = timetable