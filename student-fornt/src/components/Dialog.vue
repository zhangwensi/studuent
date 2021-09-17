<template>
  <div>
    <el-dialog
      :title="initCfg.type ==='editor'?'【编辑】(请完善信息后再提交，不要留空！)':'【删除】学生信息'"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @open="open"
      :before-close="handleClose">
      <template v-if="initCfg.type ==='editor'? true: false">
        <el-form v-model="ruleForm" ref="ruleFormRef" label-width="80px" class="demo-form-inline">
          <el-form-item v-for="item in keys" :key="item.keyType" :label="item.label">
            <el-input v-model="ruleForm[item.keyType]" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-if="initCfg.type ==='delete'? true: false">
        <div>是否要删除【{{ruleForm.username}}】的个人信息？</div>
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
        data:null,
        formItem:[]
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
      this.initCfg.type = this.dialogCfg.type
      this.ruleForm = this.dialogCfg.data
      this.keys = this.dialogCfg.formItem
    },
    // 关闭弹窗
    handleClose() {
      this.$emit('dialogClose')
    },
    // 打开弹窗并初始化弹窗数据
    open() {
      this.initDilog()
    },
    submit(){
      // 等后台接口返回成功后关闭 后面要加上操作类型
      let editorData = {
        data: this.ruleForm,
        submitType: this.initCfg.type
      }
      this.$emit('submit', editorData)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
