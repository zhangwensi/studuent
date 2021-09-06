<template>
  <div>
    <el-dialog
      :title="initCfg.title"
      :visible.sync="dialogVisible"
      width="30%"
      :modal="false"
      :show-close="false"
      :close-on-click-modal="false"
      @open="open"
      :before-close="handleClose">
      <template v-if="initCfg.type ==='editor'">
        <el-form v-model="ruleForm" :rules="rules" ref="ruleFormRef" class="demo-ruleForm">
          <el-form-item v-for="item in keys" :key="item.id" :label="item" :prop="item">
            <el-input :type="item" v-model="ruleForm.item" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:"Dialog",
  props:{
    aVisible:{
      type: Boolean,
      default: false
    },
    dialogCfg:{
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      initCfg:{
        type:'',
        title:'',
        data:null
      },
      keys:[],//编辑时的关键字
      ruleForm:{},
      rules:[]
    }
  },
  watch:{
    aVisible: {
      handler(newValue) {
        this.dialogVisible = newValue
      }
    }
  },
  methods: {
    // 初始化弹窗配置
    initDilog(){
      for(let key in this.dialogCfg) {
        if(Object.keys(this.initCfg).includes(key)) {
          this.initCfg[key] = this.dialogCfg[key]
        }
      }
    },
    // 关闭弹窗
    handleClose() {
      this.$emit('dialogClose')
    },
    // 打开弹窗并初始化弹窗数据
    open() {
      this.initDilog()
      this.keys = Object.keys(this.initCfg.data)
      // 增加判断弹窗类型 如是编辑模式则需要 将ruleForm和rules赋值
      if(this.initCfg.type ==='editor') {
        for(let key in this.initCfg.data) {
          this.ruleForm[key] = this.initCfg.data[key]
        }
        console.log(this.ruleForm)
      }
      //增加规则校验
      for(let i=0;i<this.keys.length;i++) {
        this.rules.push(`${this.keys[i]}:{ required: true, trigger: "blur", message: "不能为空" }`)
        console.log(this.rules)
      }
    },
    submit(){
      // 等后台接口返回成功后关闭
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
