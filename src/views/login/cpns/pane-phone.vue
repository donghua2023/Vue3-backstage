<template>
  <div class="pane-account">
    <el-form :model="account" label-width="60px" size="large" ref="formRef">
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="account.phoneNum"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="varify-code">
          <el-input v-model="account.code"></el-input>
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
// 1. 定义accent数据
const account = reactive({
  phoneNum: '',
  code: ''
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
.varify-code {
  display: flex;
  .get-btn {
    margin-left: 8px;
  }
}
</style>
