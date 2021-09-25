<template>
  <div class="border-wrapper">
    <breadComponents :pathArr="breadList"/>
    <!-- 图标区域 -->
    <div class="score-box">
      <div class="left-top">
        <leftTop/>
      </div>
      <div class="left-bottom">
        <leftButtom/>
      </div>
      <div class="right-top">
        <rightTop />
      </div>
      <div class="right-bottom">
        <rightButtom />
      </div>
    </div>
  </div>
</template>

<script>
import breadComponents from '../breadComponents.vue'
import leftTop from './components/leftTop.vue'
import rightTop from './components/rightTop.vue'
import leftButtom from './components/leftButtom.vue'
import rightButtom from './components/rightButtom.vue'
export default {
  components:{breadComponents,leftTop,rightTop,leftButtom,rightButtom},
  name: "typeScore",
  data() {
    return {
      breadList:['成绩展板','成绩看板']
    }
  }
}
</script>

<style lang="scss" scoped>
.border-wrapper {
  height: 100%;
}
.score-box {
  width: 100%;
  height: 93%;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2px;
  > div {
    height: 50%;
    width: 50%;
  }
}
</style>
