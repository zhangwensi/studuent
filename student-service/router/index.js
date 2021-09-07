const Router = require('koa-router')
const login = require('./login')
const timetable = require('./timetable')
const studentInfo = require('./studentsInfo')
const router = new Router({
    prefix:'/api'
})

router.use('/login',login.routes(),login.allowedMethods())
router.use('/timetable',timetable.routes(),timetable.allowedMethods())
router.use('/studentInfo',studentInfo.routes(),studentInfo.allowedMethods())

module.exports = router