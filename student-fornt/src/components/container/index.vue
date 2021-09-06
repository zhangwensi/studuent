<template>
  <div>
    <breadComponents :pathArr="breadList"/>
    <!--课程表 -->
    <div class="container">
      <div class="time-table">
        <timeTable/>
      </div>
      <div class="right-side">
        <div class="right-top">
          <h4>班委信息&课代表</h4>
          <el-button type="warning" size="mini" class="fr">添加成员</el-button>
          <tablePlus :config="table_config"/>
        </div>
        <div class="right-buttom">
          <h5>班级事件纪要</h5>
          <p>sdasdsadsadasdsadsadsadsadsadsadsa</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadComponents from '../breadComponents.vue'
import timeTable from '../timeTable.vue'
import tablePlus from '../tablePlus.vue'
export default {
  name: "dashbord",
  components:{breadComponents,timeTable,tablePlus},
  data() {
    return {
      breadList:['控制台','子选项'],
      //表格配置
      table_config:{
        tableTh:[
          {prop:"index",label:"序号",type:'index',callback:index=>index+1},
          {prop:"role",label:"角色"},
          {prop:"class",label:"班级"},
          {prop:"name",label:"姓名"},
          {prop:"solt",label:"操作",type:'solt'}
        ],
        tableData:[
          {id:20210903001,role:'班长',class:'1-2',name:'小芳'},
          {id:20210903001,role:'副班长',class:'1-2',name:'小芳'},
          {id:20210903001,role:'学习委员',class:'1-2',name:'小芳'},
          {id:20210903001,role:'班长',class:'1-2',name:'小芳'},
          {id:20210903001,role:'副班长',class:'1-2',name:'小芳'}
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
h4,h5 {
  margin: 0px;
  text-align: center;
}
p {
  margin: 0px;
}
</style>
