<template>
  <div class="breadBox">
    <el-breadcrumb separator=">>">
      <template v-for="(item,index) in pathList" >
        <el-breadcrumb-item :key="index">{{item}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name:"breadComponents",
  props:{
    pathArr:{
      type: Array,
      require: true
    }
  },
  data() {
    return {
      pathList:[]
    }
  },
  mounted(){
    this.pathList = this.$props.pathArr
  }
}
</script>

<style lang="scss" scoped>
.breadBox {
  margin-bottom: 10px;
}
</style>
