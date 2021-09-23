<template>
  <div>
    <breadComponents :pathArr="breadList"/>
  </div>
</template>

<script>
import breadComponents from '../breadComponents.vue'
export default {
  components:{breadComponents},
  name:"recordScore",
  data() {
    return {
      breadList:['成绩展板','成绩录入'],
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
