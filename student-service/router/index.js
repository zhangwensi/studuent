const Router = require('koa-router')
const login = require('./login')
const timetable = require('./timetable')
const router = new Router({
    prefix:'/api'
})

router.use('/login',login.routes(),login.allowedMethods())
router.use('/timetable',timetable.routes(),timetable.allowedMethods())

module.exports = router