<template>
  <div class="login-box">
    <div class="box-wrapper">
      <span class="title">学生管理系统</span>
      <el-form :model="ruleForm" status-icon :rules="loginRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="usename">
          <el-input type="text" v-model="ruleForm.usename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm()">登录</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </div>
  </div>
</template>

<script>
import {login} from '../api/login.js'
export default {
  name: 'login',
  data() {
    return {
      ruleForm:{
        usename:'',
        password:''
      },
      loginRules: {
        usename: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        // code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
    }
  },
  methods: {
    submitForm(){
      //提交登录请求时要根据后端返回的resCode再跳转 版本后期需补充
      let data ={
        username: this.ruleForm.usename,
        password: this.ruleForm.password
      }
      if(data.username !== null && data.password !== null) {
        login(data).then(res=>{
          if(res.code === 200) {
            // 设置token
            let token = res.data.token
            let grader = res.data.grader
            let sclass = res.data.sclass
            let username = res.data.username
            this.$store.commit('app/SET_COLLAPSE_STATUS')
            this.$store.commit('app/SET_USER_TOKEN',token)
            this.$store.commit('app/SET_USER_USERNAME',username)
            this.$store.commit('app/SET_USER_GRADER',grader)
            this.$store.commit('app/SET_USER_SCLASS',sclass)
            this.$router.push('/home')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  background: url('../assets/image/loginbg.jpg') no-repeat fixed;
  background-size: 100% 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  .box-wrapper {
    width: 400px;
    height: 300px;
    padding: 20px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    text-align: center;
  }
  .title {
    text-align: center;
    color: cornsilk;
  }
  .demo-ruleForm {
    margin-top: 20px;
  }
}
</style>
