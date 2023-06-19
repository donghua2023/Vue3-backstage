<template>
  <div>
    <page-search
      :searchData="searchConfig"
      @queryClick="handleQueryClick"
    ></page-search>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import { searchConfig } from './config/search.config.ts'

const handleQueryClick = () => {
  console.log('父组件查询')
}
</script>

<style scoped></style>
