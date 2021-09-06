<template>
  <div>
    <breadComponents :pathArr="breadList"/>
    <tablePlus :config="table_config" @sizeChange="fsizeChange"
    @btnClick="fbtnClick"
    @currentChange="fcurrentSize" @statte="changeState"/>
    <myDialog :dialogCfg="dialog_config" :aVisible.sync="isAVisible" @dialogClose="hasClose"/>
  </div>
</template>

<script>
import breadComponents from '../breadComponents.vue'
import tablePlus from '../tablePlus.vue'
import myDialog from '../Dialog.vue'
export default {
  name: 'userInfo',
  components:{breadComponents,tablePlus,myDialog},
  data() {
    return {
      breadList:['信息管理','用户信息'],
      table_config:{
        tableTh:[
          {prop:"index",label:"序号",type:'index',callback:index=>index+1},
          {prop:"date",label:"表头1"},
          {prop:"name",label:"表头2"},
          {prop:"age",label:"表头3"},
          {prop:"status",label:"状态",type:'status'},
          {prop:"solt",label:"操作",type:'solt'}
        ],
        tableData:[
          {id:20210903001,date:'dddd-dd-dd',name:'ddd',age:18,status: '0'},
          {id:20210903002,date:'dddd-dd-dd',name:'ddd',age:18,status: '1'},
          {id:20210903003,date:'dddd-dd-dd',name:'ddd',age:18,status: '0'}
        ],
        url:'',//接口请求地址
        data:{
          currentPage:1,
          pageSize: 10,
          pageConfig:[10, 20, 30, 40],
          total: 100
        },
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
        type:null,
        title:null,
        data:null
      }
    }
  },
  methods:{
    fsizeChange(val) {
      console.log(val)
    },
    fcurrentSize(val) {
      console.log(val)
    },
    changeState(val) {
      console.log(val)
    },
    fbtnClick(val,val2) {
      this.isAVisible = true
      // console.log(val,val2)
      this.dialog_config.type = val2
      this.dialog_config.title = val2 || '弹窗标题'
      this.dialog_config.data = val
    },
    hasClose() {
      this.isAVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
