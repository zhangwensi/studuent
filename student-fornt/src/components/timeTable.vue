<template>
  <div>
    <el-row class="table-title">
      <el-row :span="12"><span class="title">{{title}}</span></el-row>
      <div id="coursesTable"></div>
    </el-row>
    <el-row>
      <el-button size="mini" type="primary" disabled @click.prevent="onlyLook">只看我</el-button>
      <el-button size="mini" type="wraning" disabled @click.prevent="reset">重置</el-button>
    </el-row>
  </div>
</template>

<script>
import Timetables from 'timetables'
import {timeTable} from '../api/class/timetable'
export default {
  name:"timeTable",
  data() {
    return {
      timeList:'',//课程表实例
      title:'2021年至2022年度第一学期课程表',
      courList: [
        ["语文", "数学", "英语", "物理", "语文", "数学", "英语", "物理", "物理", "数学"],
        ["数学", "语文", "物理", "物理", "语文", "语文", "语文", "物理", "数学", "语文"],
        ["语文", "数学", "英语", "物理", "语文", "数学", "英语", "物理", "语文", "数学"],
        ["数学", "语文", "物理", "物理", "语文", "语文", "语文", "英语", "数学", "语文"],
        ["语文", "数学", "英语", "物理", "语文", "数学", "英语", "物理", "语文", "数学"]
      ],
    }
  },
  mounted(){
    this.onlyLook()
  },
  methods:{
    // 获取课程表函数封装
    getTable() {
      let data = {
        username:'admin',
        class: 1,
        grade: 1,
        isCharge: 1
      }
      timeTable(data).then(res=>{
        this.courList = res.data
        this.timeList = this.initTimeTables()
      })
    },
    //初始化课程表
    initTimeTables() {
      let initDom = '#coursesTable'
      let tableCfg = {
        el:initDom,
        timetables: this.courList,
        highlightWeek: new Date().getDay(),
        week:['一', '二', '三', '四', '五'],
        timetableType: [
          [{index: '1'}, 1],
          [{index: '2'}, 1],
          [{index: '3'}, 1],
          [{index: '4'}, 1],
          [{index: '5'}, 1],
          [{index: '6'}, 1],
          [{index: '7'}, 1],
          [{index: '8'}, 1],
          [{index: '9'}, 1],
          [{index: '10'}, 1]
        ],
        gridOnClick: function (e) {
          alert(e.name + '  ' + e.week +', 第' + e.index + '节课, 课长' + e.length +'节')
          console.log(e)
        },
        styles: {
            Gheight: 50,
            leftHandWidth: 50,
            palette: ['#ff6633', '#eeeeee']
        }
      }
      return new Timetables(tableCfg)
    },
    onlyLook() {
      // 根据sessionStorage中的登录角色 调用接口 进行传值 获取后台数据后重新渲染
      this.getTable()
    },
    reset() {
      // 直接调用指定班级课程表接口
      this.onChange()
    },
    // 数据变化重新渲染课程表
    onChange(){
      this.timeList.setOption({
        timetables: this.courList,
        styles:{
          palette: ['#dedcda', '#ff4081']
        },
          gridOnClick: function (e) {
            console.log(e)}
        })
    }
  }
}
</script>


<style lang="scss" scoped>
.table-title {
  text-align: center;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
#coursesTable{
  margin-bottom: 10px;
  .Courses-content {
    color: #000 !important;
  }
}
</style>
