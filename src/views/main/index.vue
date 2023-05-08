<template>
  <div>
    <el-button type="primary" @click="outLoginClick">退出登录</el-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { localCache } from '@/utils/cache'
import { CACHE_NAME, CACHE_PASSWORD, LOGIN_TOKEN } from '@/types'

const outLoginClick = () => {
  if (!localCache.getCache('isRemPwd')) {
    localCache.removeCache(CACHE_NAME)
    localCache.removeCache(CACHE_PASSWORD)
  }
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped></style>
