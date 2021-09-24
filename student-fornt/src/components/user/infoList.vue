<template>
  <div>
    <breadComponents :pathArr="breadList"/>
    <div class="fl"><el-button  type="danger" size="mini" @click.prevent="addInfo">新增用户</el-button></div>
    <tableComponent :config="table_config" @sizeChange="fsizeChange"
    @btnClick="fbtnClick" @currentChange="fcurrentSize" @status="changeState"/>
    <myDialog :dialogCfg="dialog_config" :aVisible.sync="isAVisible" @dialogClose="hasClose" @submit="userSubmit"/>
    <myDialog :dialogCfg="addDialog" :aVisible.sync="isAddAVisible" @dialogClose="hasAddClose" @submit="addUserSubmit"/>
  </div>
</template>

<script>
import breadComponents from '../breadComponents.vue'
import tableComponent from '../tablePlus.vue'
import myDialog from '../Dialog.vue'
import {teacherRole} from '../../api/userInfo/userInfo'
export default {
  name: 'infoList',
  components:{breadComponents,tableComponent,myDialog},
  data() {
    return {
      role: sessionStorage.getItem('role'),
      breadList:['信息管理','账号管理'],
      isAddAVisible: false,
      isAVisible: false,
      table_config:{
        loading: false,
        downShow: false,
        checkbox: false,
        tableTh:[
          {prop:"id",label:"序号",type:'index',callback:id=>id+1},
          {prop:"username",label:"登录账号"},
          {prop:"realname",label:"教师姓名"},
          {prop:"sclass",label:"年级"},
          {prop:"grader",label:"班级"},
          {prop:"role",label:"角色级别"},
          {prop:"tag",label:"禁用状态",type:'tag'},
          {prop:"solt",label:"操作",type:'solt'}
        ],
        tableList:[],
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
      dialog_config:{
        title:'',
        type:null, //删除或者编辑
        data:null, // 弹窗数据
        formItem:[
          {keyType:"username",label:"登录账号"},
          {keyType:"realname",label:"教师姓名"},
          {keyType:"role",label:"角色等级"},
          {keyType:"tag",label:"是否启用"},
          {keyType:"sclass",label:"年级"},
          {keyType:"grader",label:"班级"},
        ],
        btnLoading: false
      },
      addDialog: {
        title: '【新增】新增管理员信息(请完善信息后再提交，不要留空！)',
        type: 'add',
        data: {},
        formItem:[
          {keyType:"username",label:"登录账号"},
          {keyType:"role",label:"角色等级"},
          {keyType:"tag",label:"是否启用"},
          {keyType:"sclass",label:"年级"},
          {keyType:"grader",label:"班级"},
          {keyType:"realname",label:"教师姓名"},
          {keyType:"password",label:"登录密码"},
        ],
        btnLoading: false
      }
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    // 初始化表格数据
    initTable() {
      this.table_config.loading = true
      let reqData = {
        type: 'get',
        sclass: sessionStorage.getItem('sclass'),
        grader: sessionStorage.getItem('grader'),
        pageSize: this.table_config.data.pageSize,
        currentSize: this.table_config.data.currentPage
      }
      teacherRole(reqData).then(res => {
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
    fbtnClick(val,val2) {
      if(this.role === '99') {
        this.isAVisible = true
        if(val2 === 'editor') {
          this.dialog_config.title="【编辑】(请完善信息后再提交，不要留空！)"
          this.dialog_config.type = val2
        } else {
          this.dialog_config.title="【删除】管理员信息"
          this.dialog_config.type = val2
        }
        this.dialog_config.data = val
      } else {
        this.$message.error('您的权限不足，请联系管理员进行操作！')
      }
    },
    fcurrentSize(val) {
      this.table_config.data.currentPage = val
      this.initTable()
    },
    changeState(val) {
      if(this.role === '99') {
        console.log(val)
      } else {
        this.$message.error('您的权限不足，请联系管理员进行操作！')
      }
    },
    addInfo(){
      if(this.role === '99') {
        this.isAddAVisible = true
      } else {
        this.$message.error('您的权限不足，请联系管理员进行操作！')
      }
    },
    hasClose() {
      this.isAVisible = false
    },
    hasAddClose() {
      this.isAddAVisible = false
    },
    userSubmit(val){
      // 提交操作
      if(val.submitType === 'editor') {
        // 执行编辑操作后 需要传入当前页码后再获取信息 再关闭弹窗
        let reqData = {
          id: val.data.id,
          username: val.data.username,
          sclass: sessionStorage.getItem('sclass'),
          grader: sessionStorage.getItem('grader'),
          role: val.data.role,
          realname: val.data.realname,
        }
        teacherRole(reqData).then(res =>{
          if(res.code === 200) {
            this.$message.success(res.msg)
            this.initTable()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else{
        // 执行删除操作后 需要传入当前页码后再获取信息 再关闭弹窗
        let reqData = {
          id: val.data.id,
          username: val.data.username,
          sclass: sessionStorage.getItem('sclass'),
        }
        teacherRole(reqData).then(res =>{
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
      let reqData = {
        username: val.data.username,
        sclass: sessionStorage.getItem('sclass'),
        grader: sessionStorage.getItem('grader'),
        password: val.data.password,
        role: val.data.role,
        realname: val.data.realname,
      }
      teacherRole(reqData).then(res => {
        if(res.code === 200) {
          this.$message.success(res.msg)
          this.initTable()
        } else {
          this.$message.error(res.msg)
        }
      })
      this.isAddAVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
