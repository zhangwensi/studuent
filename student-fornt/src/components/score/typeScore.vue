<template>
  <div>
    <breadComponents :pathArr="breadList"/>
  </div>
</template>

<script>
import breadComponents from '../breadComponents.vue'
export default {
  components:{breadComponents},
  name: "typeScore",
  data() {
    return {
      breadList:['成绩展板','成绩看板'],
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
