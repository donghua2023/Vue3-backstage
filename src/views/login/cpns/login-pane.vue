<template>
  <div class="login-pane">
    <!--顶部的标题-->
    <h1 class="title">后台管理系统</h1>
    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane name="account">
          <!-- 账号登录的pane -->
          <template #label>
            <div class="label">
              <el-icon></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <!-- 手机登录的pane -->
          <template #label>
            <div class="label">
              <el-icon></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnclick"> 立即登录 </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache.ts'
const ISREMPWD = 'isRemPwd'

const isRemPwd = ref<boolean>(localCache.getCache(ISREMPWD) ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache(ISREMPWD, newValue)
  // localstorage不支持存false，所以这边做一个移除处理
  if (!newValue) {
    localCache.removeCache(ISREMPWD)
  }
})

const activeName = ref('account')
const accountRef = ref<InstanceType<typeof PaneAccount>>()

function handleLoginBtnclick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('进行了手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-pane {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
:deep(.el-tabs__nav) {
  width: 100% !important;
}
:deep(.el-tabs__item) {
  width: 50% !important;
}
</style>
