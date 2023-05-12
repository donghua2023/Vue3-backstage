<template>
  <div class="main">
    <div class="fold">折叠</div>
    <div class="crumb">
      <el-breadcrumb separator-icon="ArrowRight">
        <template v-for="item in breadCrumbData" :index="index">
          <el-breadcrumb-item :to="item.url">{{
            item.name
          }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { mapMenusToCrumbs } from '@/utils/map-menu'
import useLoginStore from '@/stores/login/login'
import { computed } from 'vue'
const route = useRoute()
const loginStore = useLoginStore()
const breadCrumbData = computed(() => {
  return mapMenusToCrumbs(route.path, loginStore.roleList)
})
</script>

<style scoped lang="less">
.fold {
  margin-right: 10px;
}
</style>
