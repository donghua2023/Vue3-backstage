<template>
  <div class="container">
    <div class="leftBtnGroup">
      <el-button type="primary" icon="Plus" plain @click="$emit('commonBtnClick', 'add')">添加</el-button>
      <el-button type="success" icon="Edit" plain @click="$emit('commonBtnClick', 'edit')">修改</el-button>
      <el-button type="danger" icon="Delete" plain @click="$emit('commonBtnClick', 'delete')">删除</el-button>
      <el-button type="info" icon="Upload" plain @click="$emit('commonBtnClick', 'into')">导入</el-button>
      <el-button type="warning" icon="Download" plain @click="$emit('commonBtnClick', 'out')">导出</el-button>
    </div>
    <div class="rightBtnGroup">
      <el-tooltip class="box-item" effect="dark" content="隐藏搜索" placement="top">
        <el-button icon="Search" circle @click="hideSearch" />
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="top">
        <el-button icon="Refresh" circle @click="$emit('refresh')" />
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="显隐列" placement="top">
        <el-button icon="Menu" circle />
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, inject } from 'vue'
const isSearchHide = inject<Ref<Boolean>>('isSearchHide')
const hideSearch = () => {
  isSearchHide!.value = !isSearchHide!.value
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 10px;
}
</style>
