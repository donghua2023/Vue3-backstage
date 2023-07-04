<template>
  <div class="main">
    <div class="fold">
      <el-icon v-if="isFold" size="25" @click="foldClick" style="cursor: pointer"><Fold /></el-icon>
      <el-icon v-if="!isFold" size="25" @click="foldClick" style="cursor: pointer"><Expand /></el-icon>
      <HeaderCrumb />
    </div>
    <HeaderInfo />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderCrumb from './cpns/header-crumb.vue'
import HeaderInfo from './cpns/header-info.vue'

const isFold = ref(true)
const emit = defineEmits(['foldChange'])
const foldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(rgb(126, 124, 124), green, blue);
}
.fold {
  display: flex;
  .el-icon {
    margin-right: 8px;
  }
}
</style>
