<template>
  <div class="main">
    <HeaderCrumb />
    <HeaderInfo />
  </div>
</template>

<script setup lang="ts">
import HeaderCrumb from './cpns/header-crumb.vue'
import HeaderInfo from './cpns/header-info.vue'
</script>

<style scoped lang="less">
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(rgb(126, 124, 124), green, blue);
}
</style>
