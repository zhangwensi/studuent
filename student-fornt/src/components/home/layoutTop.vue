<template>
  <div class="uese-top">
    <div>
      <div class="user-logo fl" @click="changeSidler">
        <svg-icon class="logo" iconClass="logo"></svg-icon>
      </div>
      <div class="fr">
        <div class="user-box">
          <div><svg-icon class="user-info" iconClass="users"></svg-icon></div>
          <div class="user-name">{{username}}</div>
          <div>
            <el-dropdown @command="handleCommand" trigger="click">
              <div class="btn"><svg-icon class="logout" iconClass="logout"></svg-icon></div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logOut">退出</el-dropdown-item>
                <!-- <el-dropdown-item>注销</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name: "layoutTop",
  data() {
    return {
      // username: 'admin'
    }
  },
  computed:mapState({
    username: () => {
      return sessionStorage.getItem('username')
    }
  }),
  methods: {
    ...mapMutations({
      changeSidler: 'app/SET_COLLAPSE_STATUS',
    }),
    handleCommand(command) {
      this.$router.push('/login')
      sessionStorage.removeItem('isCollapse')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('grader')
      sessionStorage.removeItem('sclass')
      this.$message('退出系统')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/config.scss';
.uese-top {
  position: fixed;
  line-height: 60px;
  height: 60px;
  z-index: 999;
  background: #545c64;
  left: $maxWidth;
  transition: all 0.3s ease 0ms;
  right: 0px;
  .logo {
    font-size: 60px;
  }
  .user-logo {
    height: 100%;
  }
  .user-logo:hover {
    cursor: pointer;
    color: cornsilk;
  }
  .user-info {
    font-size: 20px;
  }
  .user-box {
    display: flex;
    height: 100%;
    > div {
      padding: 0px 10px;
    }
    div:nth-child(3):hover {
      cursor: pointer;
    }
    .el-dropdown {
      color: #fff;
    }
  }
}
.open {
  .uese-top {
    left: $maxWidth;
  }
}
.close {
  .uese-top {
    left: $minWidth;
  }
}
.btn {
  cursor: pointer;
}
.user-name {
  font-size: 32px;
  color: #ccc;
}
</style>
