<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <template v-for="(item,index) in tableType">
        <el-table-column
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width">
      </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name:"tableComponent",
  props:{
    tableData:{
      type: Array,
      require: true
    },
    tableType:{
      type:Array,
      require: true
    }
  },
  data() {
    return {
      tableType:[],
      tableData: []
    }
  },
  mounted(){
    // 初始化表格
    this.getTableData()
  },
  methods:{
    getTableData() {
      this.tableType = this.$props.tableType,
      this.tableData = this.$props.tableData
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
