<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside width="210px">
        <MainAside />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainAside from '@/components/main-aside/main-aside.vue'
import MainHeader from '@/components/main-header/main-header.vue'
</script>

<style scoped lang="less">
.main-container {
  height: 100vh;
  .el-aside {
    background-color: #001529;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.el-main {
  background-color: rgb(247, 245, 245);
  padding: 10px;
}
</style>
