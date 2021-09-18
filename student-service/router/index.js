const Router = require('koa-router')
const login = require('./login')
const timetable = require('./timetable')
const studentInfo = require('./studentsInfo')
const sigin = require('./siginComponent')
const getSiginInfo = require('./getSiginInfo')
const getData = require('./getData')
const excelData = require('./exportData')
const router = new Router({
    prefix:'/api'
})

router.use('/login',login.routes(),login.allowedMethods())
router.use('/timetable',timetable.routes(),timetable.allowedMethods())
router.use('/studentInfo',studentInfo.routes(),studentInfo.allowedMethods())
router.use('/sigin',sigin.routes(),sigin.allowedMethods())
router.use('/getSiginInfo',getSiginInfo.routes(),getSiginInfo.allowedMethods())
router.use('/getData',getData.routes(),getData.allowedMethods())
router.use('/excelData',excelData.routes(),excelData.allowedMethods())


module.exports = router