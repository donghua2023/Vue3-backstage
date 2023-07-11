<template>
  <div class="main">
    <div class="icon">
      <el-icon size="20"><Message /></el-icon>
      <el-icon size="20">
        <div class="dot"></div>
        <ChatDotRound />
      </el-icon>
      <el-icon size="20"><Search /></el-icon>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="userInfo">
          <el-avatar :size="30" src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg" />
          <span class="userName">coder</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitSystem">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/types'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleExitSystem = () => {
  router.push('/login')
  localCache.removeCache(LOGIN_TOKEN)
  // localCache.removeCache('userInfo')
  // localCache.removeCache('roleList')
}
</script>

<style scoped lang="less">
.main {
  height: 50px;
  width: 200px;
  .info {
    display: inline-block;
    cursor: pointer;
  }
}
.el-dropdown-link:focus {
  outline: none;
}
.icon {
  width: 80px;
  display: flex;
  justify-content: space-between;
}
.dot {
  position: absolute;
  top: -1px;
  right: -3px;
  z-index: 10;
  width: 6px;
  height: 6px;
  background: red;
  border-radius: 100%;
}
.userInfo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100px;
  .userName {
    line-height: 100%;
  }
}
</style>
