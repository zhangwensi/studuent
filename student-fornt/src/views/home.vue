<template>
  <div :class="[navStatus ? 'close' : 'open']">
    <!-- 左部组件 -->
    <layoutLeft/>
    <!-- 右半部分 -->
    <layoutTop/>
    <layoutContainer/>
  </div>
</template>

<script>
import layoutTop from '@/components/home/layoutTop'
import layoutLeft from '@/components/home/layoutLeft'
import layoutContainer from '@/components/home/layoutContainer'
import {mapGetters} from 'vuex'
export default {
  name:"home",
  components:{layoutTop,layoutLeft,layoutContainer},
  data() {
    return {

    }
  },
  computed:{
    ...mapGetters({
      navStatus: 'app/GET_COLLAPSE_STATUS'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
