<template>
  <div
  v-loading="loading"
  :element-loading-text="loadingText"
  class="table-default"
  >
  <!-- 封装表格 -->
  <!-- 插槽表格 -->
   <el-table
   :data="initConfig.tableList" border :size="initConfig.size" :height="initConfig.tableHeight">
    <!-- 表头 -->
    <el-table-column fixed v-if="initConfig.checkbox" type="selection" width="55"></el-table-column>
    <template v-for="(item,index) in initConfig.tableTh">
      <el-table-column v-if="item.type ==='index'" :type="item.type" :prop="item.prop" :label="item.label" :key="index" :index="item.callback(index)" width=60 align="center"></el-table-column>
      <el-table-column v-else-if="item.type ==='solt'" :prop="item.prop" :label="item.label" :key="item.label" align="center">
        <template slot-scope="scope">
          <template  v-for="item in initConfig.btn">
            <el-button :key="item.type" :type="item.color" :size="item.size" @click="handler(scope.row,item.type)">{{item.name}}</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column v-else-if="item.type === 'status'" :prop="item.prop" :label="item.label" :key="item.label" align="center">
        <template slot-scope="scope" >
          <!-- 该作用域插槽传值为string类型 -->
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="scope.row.status"
            inactive-value="1"
            active-value="0"
            @change="switchChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column v-else-if="item.type !=='function'" :prop="item.prop" :label="item.label" :key="item.label" align="center"></el-table-column>
    </template>
   </el-table>
   <!-- 分页 -->
   <template v-if="initConfig.pagination ? true : false">
     <el-row class="pagination" :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="tablePg">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="initConfig.data.currentPage"
              :page-sizes="initConfig.data.pageConfig"
              :page-size="initConfig.data.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="initConfig.data.total">
            </el-pagination>
        </div>
      </el-col>
   </el-row>
   </template>
  </div>
</template>

<script>
export default {
  name:'tablePlus',
  props:{
    config:{
      type: Object,
      default: () => {}
    }
  },
  data(){
    return{
      // 表格配置
      loading:false,
      loadingText:'数据正在疯狂赶来',
      initConfig:{
        // 表头
        tableTh:[],
        tableList:[],
        checkbox: true,
        data:{},
        btn:[],
        size:'medium',
        pagination: true,
        tableHeight: '',
      }
    }
  },
  // 使用watch观测父组件传过来的数据
  watch:{
    config:{
      handler(newValue) {
        // 初始化表格配置
        this.initTableData()
      },
      deep: true,
      immediate:true
    }
  },
  created(){

  },
  methods:{
    // 将父组件传值的数据 重新绑定至组件内，避免直接使用prop时 受干扰
    initTableData(){
      this.loading = true
      for(let key in this.config) {
        if(Object.keys(this.initConfig).includes(key)) {
          this.initConfig[key] = this.config[key]
          this.loading = false
        }
      }
    },
    // 通知父级组件对于目标数据是否变更已改变
    handler(val,type) {
      this.$emit('btnClick',val,type)
    },
    // 通知父级组件对于目标数据状态已改变
    switchChange(val){
      this.$emit('statte',val)
    },
    // 通知父组件显示页数变化 重新请求后台数据
    handleSizeChange(val) {
      this.$emit('sizeChange',val)
    },
    // 通知父组件当前页数变化 重新请求后台数据
    handleCurrentChange(val) {
      this.$emit('currentChange',val)
    }
  }
}
</script>

<style lang="scss" scoped>
.tablePg {
  margin-top: 20px;
}
</style>
