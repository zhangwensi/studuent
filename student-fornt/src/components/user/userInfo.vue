<template>
  <div>
    <breadComponents :pathArr="breadList"/>
    <tablePlus :config="table_config" @sizeChange="fsizeChange"
    @btnClick="fbtnClick"
    @currentChange="fcurrentSize" @statte="changeState"/>
    <myDialog :dialogCfg="dialog_config" :aVisible.sync="isAVisible" @dialogClose="hasClose" @submit="userSubmit"/>
  </div>
</template>

<script>
import {getStudentData} from '../../api/studentInfo/studentInfo'
import breadComponents from '../breadComponents.vue'
import tablePlus from '../tablePlus.vue'
import myDialog from '../Dialog.vue'
export default {
  name: 'userInfo',
  components:{breadComponents,tablePlus,myDialog},
  data() {
    return {
      breadList:['信息管理','学生信息'],
      table_config:{
        tableTh:[
          {prop:"id",label:"序号",type:'index',callback:id=>id+1},
          {prop:"username",label:"学生姓名"},
          {prop:"sclass",label:"年级"},
          {prop:"grader",label:"班级"},
          {prop:"phone",label:"联系电话"},
          {prop:"birth",label:"出生日期"},
          {prop:"patriarch",label:"家长姓名"},
          {prop:"address",label:"家庭地址"},
          {prop:"solt",label:"操作",type:'solt'}
        ],
        tableList:[],
        url:'',//接口请求地址
        data:{
          currentPage:1,
          pageSize: 10,
          pageConfig:[10, 20, 30, 40],
          total: 100
        },
        tableHeight: '580',
        // 按钮类型
        btn:[
          {type:'delete',color:'danger',size:'mini',name:'删除'},
          {type:'editor',color:'primary',size:'mini',name:'编辑'}
        ],
        pagination: true,
        size:'',
      },
      // 弹窗配置
      isAVisible: false,
      dialog_config:{
        type:null, //删除或者编辑
        data:null, // 弹窗数据
        formItem:[
          {keyType:"username",label:"学生姓名"},
          {keyType:"sclass",label:"年级"},
          {keyType:"grader",label:"班级"},
          {keyType:"phone",label:"联系电话"},
          {keyType:"birth",label:"出生日期"},
          {keyType:"patriarch",label:"家长姓名"},
          {keyType:"address",label:"家庭地址"},
        ]
      }
    }
  },
  created(){
    this.initTable()
  },
  methods:{
    // 初始化表格
    initTable(){
      let reqData = {
        sclass : 1, //根据登录者的角色进行定义
        grader : 2, //根据登录者的角色进行定义
        pageSize: this.table_config.data.pageSize,
        currentSize: this.table_config.data.currentPage
      }
      getStudentData(reqData).then(res=>{
        if(res.code === 200) {
          this.table_config.tableList = res.data
          this.table_config.data.total = res.total
        }
      })
    },
    fsizeChange(val) {
      this.table_config.data.pageSize = val
      this.initTable()
      console.log(val)
    },
    fcurrentSize(val) {
      this.table_config.data.currentPage = val
      this.initTable()
    },
    changeState(val) {
      console.log(val)
    },
    fbtnClick(val,val2) {
      this.isAVisible = true
      this.dialog_config.type = val2
      this.dialog_config.data = val
    },
    hasClose() {
      this.isAVisible = false
    },
    userSubmit(val){
      // 提交操作
      console.log(val)
      if(val.submitType === 'editor') {
        // 执行编辑操作后 需要传入当前页码后再获取信息
      } else {
        // 执行删除操作后 需要传入当前页码后再获取信息
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
