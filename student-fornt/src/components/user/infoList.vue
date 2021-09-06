<template>
  <div>
    <breadComponents :pathArr="breadList"/>
    <tableComponent :tableData="tableData" :tableType="tableConfig"/>
  </div>
</template>

<script>
import breadComponents from '../breadComponents.vue'
import tableComponent from '../tableComponent.vue'
export default {
  name: 'infoList',
  components:{breadComponents,tableComponent},
  data() {
    return {
      breadList:['信息管理','用户信息列表'],
      tableData:[{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      tableConfig:[
        { prop:'date',label:'日期',width: 180},
        { prop:'name',label:'姓名',width: 180},
        { prop:'address',label:'地址',width: 180}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
