<template>
  <div class="siderBar">
    <!-- 左侧菜单栏 -->
    <el-menu class="el-menu-vertical-demo"
    :collapse="isCollapse" background-color="transparent"
    unique-opened router>
      <template v-for="(item,index) in routes">
        <el-submenu v-if="!item.hidden" :key="index" :index="index+''">
          <template  slot="title">
            <i class="el-icon-location"></i>
            <span slot="title" class="mnue-title">{{item.meta.name}}</span>
          </template>
          <template v-for="(subItem,index) in item.children">
            <el-menu-item v-if="!subItem.hidden" :key="index" :index="subItem.path">
              <i class="el-icon-setting"></i>
              <span slot="title">{{ subItem.meta.name }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name:"layoutLeft",
  data() {
    return {
      routes:[],
      activeIndex: ''
    }
  },
  computed:{
    ...mapGetters({
      isCollapse: 'app/GET_COLLAPSE_STATUS'
    })
  },
  created(){
    this.getRoutes()
  },
  mounted(){
  },
  methods: {
    getRoutes(){
      this.routes = this.$router.options.routes
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/config.scss';
.siderBar {
  width: $maxWidth;
  background: #545c64;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  transition: all 0.3s ease 0ms;
  padding-top: 60px;
  .mnue-title {
    color: #fff;
  }
}
.open {
  .siderBar {
    width: $maxWidth;
  }
}
.close {
  .siderBar {
    width: $minWidth;
  }
}
</style>
