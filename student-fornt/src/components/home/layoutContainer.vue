<template>
  <div class="main-container">
    <div class="main-inner">
      <router-view />
    </div>
  </div>
</template>


<script>
export default {
  name:"layoutContainer"
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/config.scss';
.main-container {
  position: fixed;
  left: $maxWidth;
  top: 60px;
  right: 0px;
  transition: all 0.3s ease 0ms;
  padding: 20px;
  height: 100%;
  overflow: auto;
  .main-inner {
    height: 100%;
  }
}
.close {
  .main-container {
    left: $minWidth;
  }
}
.open {
  .main-container {
    left: $maxWidth;
  }
}
</style>
