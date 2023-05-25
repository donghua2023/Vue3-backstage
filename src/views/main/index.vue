<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '75px' : '210px'">
        <MainAside :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @fold-change="handleFoldchange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainAside from '@/components/main-aside/main-aside.vue'
import MainHeader from '@/components/main-header/main-header.vue'

const isFold = ref(false)
const handleFoldchange = () => {
  isFold.value = !isFold.value
}
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
    transition: width 0.4s ease;
  }
}
.el-main {
  background-color: rgb(247, 245, 245);
  padding: 10px;
}
</style>
