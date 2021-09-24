<template>
  <div>
    <breadComponents :pathArr="breadList"/>
    <!-- 添加学生信息 -->
    <div class="fl"><el-button  type="danger" size="mini" @click.prevent="addInfo">新增</el-button></div>
    <tablePlus :config="table_config" @sizeChange="fsizeChange"
    @btnClick="fbtnClick"
    @currentChange="fcurrentSize" @status="changeState" @downSource="outExcel"/>
    <myDialog :dialogCfg="dialog_config" :aVisible.sync="isAVisible" @dialogClose="hasClose" @submit="userSubmit"/>
    <myDialog :dialogCfg="addDialog" :aVisible.sync="isAddAVisible" @dialogClose="hasAddClose" @submit="addUserSubmit"/>
  </div>
</template>

<script>
import {getStudentData,exportExcel,addStudent,deletStudent} from '../../api/studentInfo/studentInfo'
import breadComponents from '../breadComponents.vue'
import tablePlus from '../tablePlus.vue'
import myDialog from '../Dialog.vue'
import 'moment'
// import { export2Excel } from '@/utils/export'
export default {
  name: 'userInfo',
  components:{breadComponents,tablePlus,myDialog},
  data() {
    return {
      breadList:['信息管理','学生信息'],
      table_config:{
        loading: false,
        downShow: true,
        checkbox: false,
        tableTh:[
          {prop:"id",label:"序号",type:'index',callback:id=>id+1},
          {prop:"username",label:"学生姓名"},
          {prop:"sex",label:"性别"},
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
        excelData: [] //导出表格的数据
      },
      // 弹窗配置
      isAVisible: false,
      isAddAVisible: false,
      dialog_config:{
        title:'',
        type:null, //删除或者编辑
        data:null, // 弹窗数据
        formItem:[
          {keyType:"username",label:"学生姓名"},
          {keyType:"sex",label:"性别"},
          // {keyType:"sclass",label:"年级"},
          // {keyType:"grader",label:"班级"},
          {keyType:"phone",label:"联系电话"},
          {keyType:"birth",label:"出生日期"},
          {keyType:"patriarch",label:"家长姓名"},
          {keyType:"address",label:"家庭地址"},
        ],
        btnLoading: false
      },
      // 新增学生弹窗
      addDialog: {
        title: '【新增】新增学生信息(请完善信息后再提交，不要留空！)',
        type: 'add',
        data: {},
        formItem:[
          {keyType:"username",label:"学生姓名"},
          {keyType:"sex",label:"性别"},
          {keyType:"phone",label:"联系电话"},
          {keyType:"birth",label:"出生日期"},
          {keyType:"patriarch",label:"家长姓名"},
          {keyType:"address",label:"家庭地址"},
        ],
        btnLoading: false
      }
    }
  },
  created(){
    this.initTable()
  },
  methods:{
    // 初始化表格
    initTable(){
      this.table_config.loading = true
      let reqData = {
        sclass : sessionStorage.getItem('sclass'), //根据登录者的角色进行定义
        grader : sessionStorage.getItem('grader'), //根据登录者的角色进行定义
        pageSize: this.table_config.data.pageSize,
        currentSize: this.table_config.data.currentPage
      }
      getStudentData(reqData).then(res=>{
        if(res.code === 200) {
          this.table_config.tableList = res.data
          this.table_config.data.total = res.total
        }
      }).finally(()=>{
        this.table_config.loading = false
      })
    },
    fsizeChange(val) {
      this.table_config.data.pageSize = val
      this.initTable()
    },
    fcurrentSize(val) {
      this.table_config.data.currentPage = val
      this.initTable()
    },
    changeState(val) {
      // 本模块不需要变更用户状态
      console.log(val)
    },
    fbtnClick(val,val2) {
      this.isAVisible = true
      if(val2 === 'editor') {
        this.dialog_config.title="【编辑】(请完善信息后再提交，不要留空！)"
        this.dialog_config.type = val2
      } else {
        this.dialog_config.title="【删除】学生信息"
        this.dialog_config.type = val2
      }
      this.dialog_config.data = val
    },
    hasClose() {
      this.isAVisible = false
    },
    hasAddClose() {
      this.isAddAVisible = false
    },
    userSubmit(val){
      // 提交操作
      console.log(val)
      if(val.submitType === 'editor') {
        // 执行编辑操作后 需要传入当前页码后再获取信息 再关闭弹窗
        let reqData = {
          username: val.data.username,
          sclass: val.data.sclass,
          grader: val.data.grader,
          birth: val.data.birth,
          phone: val.data.phone,
          address: val.data.address,
          patriarch: val.data.patriarch,
          sex: val.data.sex
        }
        addStudent(reqData).then(res=>{
          if(res.code === 200) {
            this.$message.success(res.msg)
            this.initTable()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        // 执行删除操作后 需要传入当前页码后再获取信息 再关闭弹窗
        let reqData = {
          type : 'delete',
          id: val.data.id,
          username: val.data.username,
          sclass: val.data.sclass
        }
        deletStudent(reqData).then(res=>{
          if(res.code === 200) {
            this.$message.success(res.msg)
            this.initTable()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
      this.isAVisible = false
    },
    addUserSubmit(val) {
      // 执行添加操作 需要传入当前页码后再获取信息 再关闭弹窗
      let reqData = {
        username: val.data.username,
        sclass: sessionStorage.getItem('sclass'),
        grader: sessionStorage.getItem('grader'),
        birth: val.data.birth,
        phone: val.data.phone,
        address: val.data.address,
        patriarch: val.data.patriarch,
        sex: val.data.sex
      }
      addStudent(reqData).then(res=>{
        if(res.code === 200) {
          this.$message.success(res.msg)
          this.initTable()
        } else {
          this.$message.error(res.msg)
        }
      })
      this.isAddAVisible = false
    },
    addInfo(){
      this.isAddAVisible = true
    },

    outExcel() {
      let info = {
        sclass : sessionStorage.getItem('sclass'), //根据登录者的角色进行定义
        grader : sessionStorage.getItem('grader'), //根据登录者的角色进行定义
      }
      exportExcel(info).then(res =>{
        if(res.code === 200){
          this.excelData = res.data
          this.export2Excel()
        }
        else if (res.code !== 200 ){
          this.$Message.info('数据太多无法导出，请联系客服！')
        }
      }).finally(()=>{
        this.excelData = []
      })
    },
    export2Excel() {
      var that = this;
      require.ensure([], () => {
          const { export_json_to_excel } = require('../../excel/Export2Excel'); //这里必须使用绝对路径
          const tHeader = ['编号','学生姓名','性别','年级', '班级','联系电话','出生日期','家庭地址','家长姓名']; // 导出的表头名
          const filterVal = ['id','username','sex', 'sclass', 'grader','phone','birth','address','patriarch']; // 导出的表头字段名
          const list = that.excelData;
          const data = that.formatJson(filterVal, list);
          let sclass = sessionStorage.getItem('sclass')
          let grader = sessionStorage.getItem('grader')
          export_json_to_excel(tHeader, data, `${sclass}年级(${grader})班学生信息明细`);// 导出的表格名称，根据需要自己命名
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
