<template>
  <div>
    <breadComponent :pathArr="breadList"></breadComponent>
    <!--课程表 -->
    <div class="container">
      <div class="time-table">
        <timeTables></timeTables>
      </div>
      <div class="right-side">
        <div class="right-top">
          <span class="title">班委信息&课代表</span>
          <el-button type="warning" size="mini" class="fr" @click="addStudent">添加成员</el-button>
          <tableComponent :config="table_config" @btnClick="fbtnClick"></tableComponent>
        </div>
        <div class="right-buttom">
          <span class="title">班级事件纪要</span>
          <p>新学期第一课</p>
        </div>
      </div>
    </div>
    <addDialog :aVisible.sync="isAvaliable" :dialogCfg="dialog_config"  @dialogClose="hasClose" @submit="userSubmit"/>
  </div>
</template>

<script>
import breadComponent from '@/components/breadComponents.vue'
import timeTables from '@/components/timeTable.vue'
import tableComponent from '@/components/tablePlus.vue'
import addDialog from '../Dialog.vue'
export default {
  name: "dashbord",
  components:{breadComponent,timeTables,tableComponent,addDialog},
  data() {
    return {
      breadList:['控制台','子选项'],
      isAvaliable: false,
      // 增加成员配置
      dialog_config:{
        type: 'add', //删除或者编辑
        title: '',
        data:{}, // 弹窗数据
        formItem:[
          {keyType:"username",label:"学生姓名"},
          {keyType:"role",label:"角色"},
          {keyType:"grader",label:"班级"}
        ]
      },
      //表格配置
      table_config:{
        tableTh:[
          {prop:"index",label:"序号",type:'index',callback:index=>index+1},
          {prop:"role",label:"角色"},
          {prop:"grader",label:"班级"},
          {prop:"username",label:"姓名"},
          {prop:"solt",label:"操作",type:'solt'}
        ],
        tableList:[
          {id:20210903001,role:'班长',grader:'1-2',username:'小芳'},
          {id:20210903001,role:'副班长',grader:'1-2',username:'小芳'},
          {id:20210903001,role:'学习委员',grader:'1-2',username:'小芳'},
          {id:20210903001,role:'班长',grader:'1-2',username:'小芳'},
          {id:20210903001,role:'副班长',grader:'1-2',username:'小芳'}
        ],
        btn:[
          {type:'editor',color:'primary',size:'mini',name:'修改'}
        ],
        pagination: false,
        size:'mini',
        checkbox: false
      }
    }
  },
  mounted(){

  },
  methods: {
    // 增加成员
    addStudent(){
      this.isAvaliable = true
      this.dialog_config.title = '【增加成员】(需填写完整,不留空!)'
      this.dialog_config.data = {}
    },
    hasClose() {
      this.isAvaliable = false
      this.dialog_config.data = {}
    },
    userSubmit(val){
      // 提交操作
      console.log(val)
      if(val.submitType === 'editor') {
        // 执行编辑操作后 需要传入当前页码后再获取信息 再关闭弹窗
      } else {
        // 执行删除操作后 需要传入当前页码后再获取信息 再关闭弹窗
      }
    },
    fbtnClick(val,val2) {
      console.log(val,val2)
      this.isAvaliable = true
      this.dialog_config.type = val2
      this.dialog_config.title = '【编辑成员】(需填写完整,不留空!)'
      this.dialog_config.data = val
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
}
.time-table {
  width: 50%;
}
.right-side {
  width: 50%;
  height: 100%;
  padding: 0px 10px;
  &.right-top {
    height: 60vh;
    overflow: auto;
  }
}
.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
p {
  margin: 0px;
}
</style>
